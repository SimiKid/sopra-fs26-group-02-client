import { useCallback, useEffect, useRef, useState } from "react";
import { App } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { WebSocketService } from "@/api/websocketService";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";
import type { EmoteKey, ReceivedEmote } from "@/types/emote";
import { useRemainingSelectionTime } from "@/hooks/useRemainingSelectionTime";
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
  const serviceRef = useRef<WebSocketService | null>(null);
  const leftVoluntarilyRef = useRef(false);

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
            () => { 
              if (!cancelled && !leftVoluntarilyRef.current) {
                setIsOpponentGone(true); 
              }
            }
          
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
    };
  }, [apiService, gameCode, hydrated, token]);


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
    sessionStorage.removeItem(`targetTime_${gameCode}`);
    try {
      await apiService.post(`/games/${gameCode}/leave`, {});
      router.push("/lobby");
    } catch (err) {
      console.error("Error leaving game:", err);
      router.push("/lobby");
    }
  };

  return { battleState, isConnected, sendAttack, sendEmote, latestEmote, handleLeave, isOpponentGone };
}