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

export const useMatchmaking = () => {
  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userId } = useLocalStorage<string>("userId", "");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const ws = useMemo(() => new WebSocketService(token), [token]);  const { message } = App.useApp();
  const apiService = useApi(token);
  const [matchFoundMessage, setMatchFoundMessage] = useState<string | null>(null);
  const [matchmakingTimeLeft, setMatchmakingTimeLeft] = useState(60000); // 60 seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null); 
  

  const startCountdown = () => {

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

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  };

  const startMatchmaking = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    try {
      await ws.connectBasic();

      // Subscribe to matchmaking channel
      ws.subscribeToMatchmaking(Number(userId), (gameCode) => {
        console.log("Match found! Code:", gameCode);
        setIsSearching(false);
        
        setMatchFoundMessage("Game found! Redirecting to wizard selection screen...");
        // Navigate to game selection screen
        router.push(`/games/${gameCode}/wizards`);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      });

      // Send request to backend to join matchmaking
      await apiService.post("/matchmaking/join", {});
      setIsSearching(true);
      startCountdown();



    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to start matchmaking");  

    } 
  };

  const stopMatchmaking = async () => {
    ws.disconnect();
    setIsSearching(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setMatchFoundMessage(null);
    setMatchmakingTimeLeft(60000);
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