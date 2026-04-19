import { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { WebSocketService } from "@/api/websocketService";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";

export function useBattle(gameCode: string) {
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const [battleState, setBattleState] = useState<BattleStateDTO | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    if (!token || !gameCode) return;

    let cancelled = false;
    const service = new WebSocketService(token);
    serviceRef.current = service;

    const init = async () => {
      try {
        const initialState = await apiService.get<BattleStateDTO>(`/games/${gameCode}/battle`);
        if (!cancelled) {
          setBattleState(initialState);
        }
      } catch (e) {
        console.error("Failed to load initial battle state:", e);
      }

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
    };

    init();

    return () => {
      cancelled = true;
      service.disconnect();
      serviceRef.current = null;
      setIsConnected(false);
    };
  }, [apiService, gameCode, token]);

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

  return { battleState, isConnected, error, sendAttack };
}