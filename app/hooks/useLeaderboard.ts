import { useEffect, useState } from "react";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import type { Leaderboard } from "@/types/leaderboard";

export function useLeaderboard() {
  const { message } = App.useApp();
  const apiService = useApi();

  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    apiService
      .get<Leaderboard[]>("/leaderboard")
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
  }, [apiService, message]);

  return { leaderboard, loading };
}
