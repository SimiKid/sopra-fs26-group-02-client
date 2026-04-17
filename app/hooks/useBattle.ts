import { useCallback, useEffect, useRef, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { WebSocketService } from "@/api/websocketService";
import type { AttackId } from "@/constants/attacks.constants";
import type { BattleStateDTO } from "@/types/battle";

export function useBattle(gameCode: string) {
  const { value: token } = useLocalStorage<string>("token", "");
  const [battleState, setBattleState] = useState<BattleStateDTO | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const serviceRef = useRef<WebSocketService | null>(null);

  useEffect(() => {
    if (!token || !gameCode) return;
    const service = new WebSocketService(token);
    serviceRef.current = service;

    service
      .connect(gameCode, setBattleState, setError)
      .then(() => setIsConnected(true))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));

    return () => {
      service.disconnect();
      serviceRef.current = null;
      setIsConnected(false);
    };
  }, [gameCode, token]);

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
