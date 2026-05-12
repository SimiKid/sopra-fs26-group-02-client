import { useEffect, useState } from "react";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import type { Leaderboard } from "@/types/leaderboard";

export function useLeaderboard(limit: 5 | 50 = 50) {
  const { message } = App.useApp();
  const apiService = useApi();

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const endpoint = limit === 5 ? "/leaderboard5" : "/leaderboard";

    apiService
      .get<Leaderboard[]>(endpoint)
      .then((response) => {
        if (cancelled) return;
        setLeaderboard(response);
      })
      .catch(() => {
        if (cancelled) return;
        message.error("Failed to load leaderboard.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [apiService, message, limit]);

  return { leaderboard, loading };
}
