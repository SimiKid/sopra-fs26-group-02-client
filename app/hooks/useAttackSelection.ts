import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Attack } from "@/types/attack";
import { AttackId } from "@/constants/attacks.constants";
import { GameSession } from "@/types/game";

export function useAttackSelection(gameCode: string) {
  const router = useRouter();
  const { message } = App.useApp();
  const { value: token, hydrated } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const [selectedAttacks, setSelectedAttacks] = useState<AttackId[]>([]);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [waitingForOpponent, setWaitingForOpponent] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!hydrated || !token) return;
    let cancelled = false;
    const fetchAttacks = async () => {
      try {
        const response = await apiService.get<Attack[]>("/attacks");
        if (cancelled) return;
        setAttacks(response);
      } catch {
        if (cancelled) return;
        message.error("Failed to load attacks.");
      }
    };

    fetchAttacks();

    return () => {
      cancelled = true;
    };
  }, [apiService, hydrated, token, message]);

  const handleChooseAttacks = async () => {
    if (selectedAttacks.length !== 3) {
      message.error("Please select exactly 3 attacks.");
      return;
    }

    try {
      await apiService.put(`/games/${gameCode}/attacks`, selectedAttacks);
      message.success("You have chosen your attacks!");
      setWaitingForOpponent(true);
    } catch {
      message.error("Failed to choose attacks.");
    }
  };

  const handleAttackSelect = (attackId: AttackId) => {
    const isSelected = selectedAttacks.includes(attackId);

    if (isSelected) {
      setSelectedAttacks(selectedAttacks.filter((id) => id !== attackId));
      return;
    }

    if (selectedAttacks.length >= 3) {
      return;
    }

    setSelectedAttacks([...selectedAttacks, attackId]);
  };

  // Poll for opponent finishing attack selection
  useEffect(() => {
    if (!waitingForOpponent) return;

    const poll = async () => {
      try {
        const game = await apiService.get<GameSession>(`/games/${gameCode}`);
        if (game.gameStatus !== "BATTLE") return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        router.push(`/games/${gameCode}/battles`);
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [waitingForOpponent, gameCode, apiService, router]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatElement = (element: string) => {
    return element.charAt(0) + element.slice(1).toLowerCase();
  };

  return {
    selectedAttacks,
    attacks,
    waitingForOpponent,
    handleChooseAttacks,
    handleAttackSelect,
    formatElement,
  };
}