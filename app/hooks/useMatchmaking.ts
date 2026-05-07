"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // oder useNavigate bei neueren Versionen
import { WebSocketService } from '@/api/websocketService'; // Deine Instanz
import useLocalStorage from '@/hooks/useLocalStorage';
import { ApplicationError } from '@/types/error';
import { App } from 'antd';
import { useApi } from '@/hooks/useApi';

export const useMatchmaking = () => {
  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userId } = useLocalStorage<string>("userId", "");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  const ws= new WebSocketService(token);
  const { message } = App.useApp();
  const apiService = useApi(token);

  const startMatchmaking = async () => {
    setIsSearching(true);

    try {
      // 1. Verbindung zum Server herstellen (Die Brücke bauen)
      await ws.connectBasic();

      // 2. Das "Ohr" am persönlichen Kanal registrieren
      // Wir definieren HIER, was passieren soll, wenn die Nachricht kommt
      ws.subscribeToMatchmaking(Number(userId), (gameCode) => {
        console.log("Match gefunden! Code:", gameCode);
        setIsSearching(false);
        
        // Navigation zum Spiel
        router.push(`/games/${gameCode}/wizards`);
      });

      // 3. Dem Backend sagen: "Ich bin jetzt bereit für die Suche"
      // Erst wenn wir zuhören (Step 2), schicken wir die Anfrage ab
      await apiService.post("/matchmaking/join", {});

    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to start matchmaking");
    } finally {
      setIsSearching(false);
    }
  };

  return {
    startMatchmaking,
    isSearching
  };
};