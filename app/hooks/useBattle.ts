import { useCallback, useEffect, useRef, useState } from "react";
import { App } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { WebSocketService } from "@/api/websocketService";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";

export function useBattle(gameCode: string) {
  const { value: token, hydrated } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);
  const { message } = App.useApp();

  const [battleState, setBattleState] = useState<BattleStateDTO | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    if (error) message.error(error);
  }, [error, message]);

  useEffect(() => {
    if (!hydrated || !token || !gameCode) return;

    let cancelled = false;
    const service = new WebSocketService(token);
    serviceRef.current = service;

    const init = async () => {
      service
        .connect(
          gameCode,
          (state) => {
            if (!cancelled) setBattleState(state);
          },
          (message) => {
            if (!cancelled) setError(message);
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

  return { battleState, isConnected, sendAttack };
}