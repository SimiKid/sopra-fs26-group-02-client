import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameSession } from "@/types/game";
import { ApplicationError } from "@/types/error";
import { formatTime } from "@/utils/formatTime";

export function useLobby() {
  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const [gameCode, setGameCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [gameFullMessage, setGameFullMessage] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToConfirmationScreen = (text: string, code: string) => {
    setGameFullMessage(text);
    redirectTimeoutRef.current = setTimeout(() => {
      router.push(`/games/${code}/wizards`);
    }, 1500);
  };

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const response = await apiService.post<GameSession>("/games", {});
      setGameCode(response.gameCode);
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to create game");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelWaiting = () => {
    if (gameCode) {
      apiService.delete(`/games/${gameCode}`).catch(() => {});
    }
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    setGameCode(null);
    setTimeLeft(600);
    message.info("Game creation cancelled.");
  };

  const handleCopyCode = async () => {
    if (!gameCode) return;
    try {
      await navigator.clipboard.writeText(gameCode);
      message.success("Game code copied!");
    } catch {
      message.error("Failed to copy code.");
    }
  };

  const handleJoinGame = async () => {
    if (joinCode.length !== 6) {
      message.error("Please enter a valid 6-character game code.");
      return;
    }

    setJoinLoading(true);
    try {
      await apiService.post<GameSession>(`/games/${joinCode}/join`, {});
      goToConfirmationScreen("Successfully joined game! Both players are connected.", joinCode);
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to join game. Please try again.");
    } finally {
      setJoinLoading(false);
    }
  };

  // Poll for opponent joining
  useEffect(() => {
    if (!gameCode) return;

    const poll = async () => {
      try {
        const game = await apiService.get<GameSession>(`/games/${gameCode}`);
        if (game.gameStatus !== "CONFIGURING") return;
        if (intervalRef.current) clearInterval(intervalRef.current);
        goToConfirmationScreen("Your opponent has joined!", gameCode);
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    intervalRef.current = setInterval(poll, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameCode, apiService]);

  // Countdown timer
  useEffect(() => {
    if (!gameCode) return;

    if (timeLeft === 0) {
      apiService.delete(`/games/${gameCode}`).catch(() => {});
      message.error("Game code expired!");
      setGameCode(null);
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [gameCode, timeLeft]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (redirectTimeoutRef.current) clearTimeout(redirectTimeoutRef.current);
    };
  }, []);

  return {
    gameCode,
    loading,
    joinCode,
    setJoinCode,
    joinLoading,
    timeLeft,
    gameFullMessage,
    handleCreateGame,
    handleCancelWaiting,
    handleCopyCode,
    handleJoinGame,
    formatTime,
  };
}