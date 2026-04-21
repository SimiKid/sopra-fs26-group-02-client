import { useEffect, useState } from "react";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { GameHistoryEntry } from "@/types/history";

export function useGameHistory() {
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const [games, setGames] = useState<GameHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    apiService
      .get<GameHistoryEntry[]>("/users/me/games")
      .then((response) => {
        if (cancelled) return;
        setGames(response);
      })
      .catch(() => {
        if (cancelled) return;
        message.error("Failed to load your battle history.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiService, token, message]);

  return { games, loading };
}
