import { useCallback, useEffect, useRef, useState } from "react";
import { App } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { WebSocketService } from "@/api/websocketService";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";
import type { EmoteKey, ReceivedEmote } from "@/types/emote";
import {
  SELECTION_EXPIRED_EVENT,
  selectionExpiredKey,
  useRemainingSelectionTime,
} from "@/hooks/useRemainingSelectionTime";
import { useRouter } from "next/navigation";



export function useBattle(gameCode: string) {
  const { value: token, hydrated } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);
  const { message } = App.useApp();
  const { stopTimer } = useRemainingSelectionTime(gameCode);
  const router = useRouter();
  const [battleState, setBattleState] = useState<BattleStateDTO | null>(null);
  const [latestEmote, setLatestEmote] = useState<ReceivedEmote | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpponentGone, setIsOpponentGone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const serviceRef = useRef<WebSocketService | null>(null);
  const leftVoluntarilyRef = useRef(false);

  const handleSelectionExpired = useCallback(async () => {
    if (leftVoluntarilyRef.current) return;

    const alreadyHandled = sessionStorage.getItem(selectionExpiredKey(gameCode));
    stopTimer(true);
    if (alreadyHandled) return;

    try {
      const playersStatus = await apiService.get<boolean>(`/games/${gameCode}/status`);
      if (!playersStatus) {
        message.error("Time's up! You didn't select a wizard and attacks in time.");
      } else {
        message.error("Time's up! Your opponent didn't select a wizard and attacks in time.");
      }
    } catch (err) {
      console.error("Error fetching players status:", err);
      message.error("Selection time expired.");
    }
    router.push("/lobby");
  }, [apiService, gameCode, message, router, stopTimer]);

  useEffect(() => {
    const onExpired = (event: Event) => {
      const { gameCode: expiredGameCode } = (event as CustomEvent<{ gameCode: string }>).detail;
      if (expiredGameCode === gameCode) {
        handleSelectionExpired();
      }
    };
    window.addEventListener(SELECTION_EXPIRED_EVENT, onExpired);
    return () => window.removeEventListener(SELECTION_EXPIRED_EVENT, onExpired);
  }, [gameCode, handleSelectionExpired]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error, message]);

  useEffect(() => {
    if (!hydrated || !token || !gameCode) return;

    let cancelled = false;
    const service = new WebSocketService(token);
    serviceRef.current = service;

    const init = async () => {
      setIsOpponentGone(false);
      leftVoluntarilyRef.current = false;
      service
        .connect(
          gameCode,
          (state) => {
            if (!cancelled) setBattleState(state);
          },
          (message) => {
            if (!cancelled) setError(message);
          },
          (emoteKey) => {
            if (!cancelled) {
              setLatestEmote({
                key: emoteKey,
                id: Date.now(),
              });
            }
          },
          (reason) => {
            if (!cancelled && !leftVoluntarilyRef.current && reason.replaceAll('"', '') === "PLAYER_LEFT_IN_BATTLE") {
              setOpponentLeft(true);
            }
          },
          () => {
            if (!cancelled && !leftVoluntarilyRef.current) {
              setIsOpponentGone(true);
            }
          },
          (status) => {
            if (!cancelled && !leftVoluntarilyRef.current && status === "TIME_EXPIRED") {
              handleSelectionExpired();
            }
          },
        )
        .then(() => {
          if (!cancelled) setIsConnected(true);
        })
        .catch((e) => {
          if (!cancelled) setError(e instanceof Error ? e.message : String(e));
        });

      try {
        const state = await apiService.get<BattleStateDTO>(
          `/games/${gameCode}/battles`,
        );

        if (!cancelled) {
          setBattleState(state);
        }
      } catch {
        // ignore if not ready yet
      }
    };

    init();

    return () => {
      cancelled = true;
      service.disconnect();
      serviceRef.current = null;
      setIsConnected(false);
      setBattleState(null);
      setLatestEmote(null);
      setOpponentLeft(false);
    };
  }, [apiService, gameCode, handleSelectionExpired, hydrated, token]);


  const sendAttack = useCallback(
    (attackName: AttackId) => {
      try {
        serviceRef.current?.sendAttack(gameCode, attackName);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [gameCode],
  );

  const sendEmote = useCallback(
    (emoteKey: EmoteKey) => {
      try {
        serviceRef.current?.sendEmote(gameCode, emoteKey);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    },
    [gameCode],
  );


  const handleLeave = async () => {
    leftVoluntarilyRef.current = true;
    stopTimer();
    try {
      await apiService.delete(`/games/${gameCode}/leave`);
      router.push("/lobby");
    } catch (err) {
      console.error("Error leaving game:", err);
      router.push("/lobby");
    }
  };

  const markLeftVoluntarily = useCallback(() => {
    leftVoluntarilyRef.current = true;
  }, []);

  return { battleState, isConnected, sendAttack, sendEmote, latestEmote, handleLeave, isOpponentGone, opponentLeft, markLeftVoluntarily };
}