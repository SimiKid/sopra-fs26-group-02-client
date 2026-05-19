"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { WebSocketService } from '@/api/websocketService'; 
import useLocalStorage from '@/hooks/useLocalStorage';
import { ApplicationError } from '@/types/error';
import { App } from 'antd';
import { useApi } from '@/hooks/useApi';
import { useRef } from 'react';
import { useLobby } from './useLobby';
import { useMemo } from 'react';
import { useEffect } from 'react';

export const useMatchmaking = () => {
  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userId } = useLocalStorage<string>("userId", "");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const ws = useMemo(() => new WebSocketService(token), [token]);  const { message } = App.useApp();
  const apiService = useApi(token);
  const [matchFoundMessage, setMatchFoundMessage] = useState<string | null>(null);
  const [matchmakingTimeLeft, setMatchmakingTimeLeft] = useState(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null); 
  
  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
      ws.disconnect();
    };
  }, [ws]);

  const startCountdown = () => {
    clearTimer();
    setMatchmakingTimeLeft(60);
    let remaining = 60;

    timerRef.current = setInterval(() => {
      remaining -= 1;
      setMatchmakingTimeLeft(remaining);

      if (remaining <= 0) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        setIsSearching(false);
        stopMatchmaking();
        message.info("Matchmaking ended after 60 seconds.");
        ws.disconnect();
      }
    }, 1000);
  };

  const startMatchmaking = async () => {
    clearTimer();
    try {
      await ws.connectBasic();

      // Subscribe to matchmaking channel
      ws.subscribeToMatchmaking(Number(userId), (gameCode) => {
        console.log("Match found! Code:", gameCode);
        setIsSearching(false);
        
        setMatchFoundMessage("Game found! Redirecting to wizard selection screen...");
        clearTimer();
        ws.disconnect();
        // Navigate to game selection screen
        router.push(`/games/${gameCode}/wizards`);
      });

      // Send request to backend to join matchmaking
      await apiService.post("/matchmaking/join", {});
      setIsSearching(true);
      startCountdown();



    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to start matchmaking");  
      clearTimer();
      setIsSearching(false);
    } 
  };

  const stopMatchmaking = async () => {
    clearTimer();
    ws.disconnect();
    setIsSearching(false);
    setMatchFoundMessage(null);
    setMatchmakingTimeLeft(60);
    try {

      await apiService.delete("/matchmaking/leave");
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to stop matchmaking");
    }
    router.push("/lobby");
  };

  return {
    startMatchmaking,
    stopMatchmaking,
    timeLeft: matchmakingTimeLeft,
    matchFoundMessage,
    isSearching
  };
};