import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";

export function useBattleCounter() {
  const apiService = useApi();
  const [battleCount, setBattleCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchBattleCount() {
      try {
        const count = await apiService.get<number>("/battles/count");
        setBattleCount(count);
      } catch (error) {
        console.error("Failed to fetch battle count:", error);
      }
    }

    fetchBattleCount();
  }, [apiService]);

  return battleCount;
}