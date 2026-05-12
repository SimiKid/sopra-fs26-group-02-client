"use client";

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { WebSocketService } from '@/api/websocketService';
import useLocalStorage from '@/hooks/useLocalStorage';
import { ApplicationError } from '@/types/error';
import { App } from 'antd';
import { useApi } from '@/hooks/useApi';

const MATCHMAKING_TIMEOUT_MS = 60_000;
const MATCHMAKING_TIMEOUT_SECONDS = MATCHMAKING_TIMEOUT_MS / 1000;

export const useMatchmaking = () => {
  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userId } = useLocalStorage<string>("userId", "");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const ws = new WebSocketService(token);
  const { message } = App.useApp();
  const apiService = useApi(token);
  const [matchFoundMessage, setMatchFoundMessage] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(MATCHMAKING_TIMEOUT_SECONDS);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearMatchmakingTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const clearMatchmakingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const resetMatchmakingState = () => {
    clearMatchmakingTimeout();
    clearMatchmakingInterval();
    setTimeLeft(MATCHMAKING_TIMEOUT_SECONDS);
  };

  useEffect(() => {
    return () => {
      clearMatchmakingTimeout();
      clearMatchmakingInterval();
    };
  }, []);

  const startMatchmaking = async () => {
    setIsSearching(true);
    setMatchFoundMessage(null);
    setTimeLeft(MATCHMAKING_TIMEOUT_SECONDS);

    try {
      await ws.connectBasic();

      resetMatchmakingState();
      intervalRef.current = setInterval(() => {
        setTimeLeft((previousTime) => Math.max(previousTime - 1, 0));
      }, 1000);

      timeoutRef.current = setTimeout(async () => {
        try {
          await apiService.delete("/matchmaking/leave");
        } catch {
          // If leaving fails, we still reset UI state.
        } finally {
          resetMatchmakingState();
          setIsSearching(false);
          message.warning("No opponent found, returned to lobby. Try again.");
          router.push("/lobby");
        }
      }, MATCHMAKING_TIMEOUT_MS);

      ws.subscribeToMatchmaking(Number(userId), (gameCode) => {
        console.log("Match gefunden! Code:", gameCode);
        resetMatchmakingState();
        setIsSearching(false);
        setMatchFoundMessage("Game found! Redirecting to wizard selection screen...");
        router.push(`/games/${gameCode}/wizards`);
      });

      await apiService.post("/matchmaking/join", {});
    } catch (error) {
      resetMatchmakingState();
      setIsSearching(false);
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to start matchmaking");
    }
  };

  const stopMatchmaking = async () => {
    try {
      resetMatchmakingState();
      await apiService.delete("/matchmaking/leave");
      setIsSearching(false);
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to stop matchmaking");
    }
  };
  return {
    startMatchmaking,
    stopMatchmaking,
    matchFoundMessage,
    isSearching,
    timeLeft,
  };
};