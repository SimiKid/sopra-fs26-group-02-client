import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameSession } from "@/types/game";
import { ApplicationError } from "@/types/error";
import { formatTime } from "@/utils/formatTime";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getApiDomain } from "@/utils/domain";

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

  const redirectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stompClientRef = useRef<Client | null>(null);

  const goToConfirmationScreen = useCallback((text: string, code: string) => {
    setGameFullMessage(text);
    redirectTimeoutRef.current = setTimeout(() => {
      router.push(`/games/${code}/wizards`);
    }, 1500);
  }, [router]);

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

  const handleLogout = async () => {
    try { 
      await apiService.post<void>("/logout", {});
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to logout");
    } finally {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  const handleCancelWaiting = () => {
    if (gameCode) {
      apiService.delete(`/games/${gameCode}`).catch(() => {});
    }
    stompClientRef.current?.deactivate();
    stompClientRef.current = null;
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

// WebSocket subscription for opponent joining
  useEffect(() => {
    if (!gameCode || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${getApiDomain()}/ws`),
      connectHeaders: { Authorization: token },
      reconnectDelay: 0,
      onConnect: () => {
        client.subscribe(`/topic/game/${gameCode}/lobby`, () => {
          goToConfirmationScreen("Your opponent has joined!", gameCode);
        });
      },
    });

    stompClientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
      stompClientRef.current = null;
    };
}, [gameCode, token, goToConfirmationScreen]);

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
    handleLogout,
    handleCancelWaiting,
    handleCopyCode,
    handleJoinGame,
    formatTime,
  };
}