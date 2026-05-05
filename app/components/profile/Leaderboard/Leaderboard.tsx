"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import styles from "./Leaderboard.module.css";
import type { Leaderboard } from "@/types/leaderboard";
import LeaderboardEntry from "./LeaderboardEntry";



interface LeaderboardProps {
  leaderboard: Leaderboard[];
}

export default function Leaderboard() {
  const { leaderboard, loading } = useLeaderboard();

  if (loading) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>Loading Leaderboard ...</h2>
        <p className={styles.emptyHint}>Please wait, the top players are loading.</p>
      </div>
    );
  }

  if (leaderboard.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>No leaderboard yet</h2>
        <p className={styles.emptyHint}>
          Play a few exciting matches to fill the leaderboard!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      <div className={styles.headerRow}>
        <span>#</span> <span>Username</span> <span>Games</span> <span>Wins</span> <span>Losses</span> <span>Win Rate</span>
      </div>
      {leaderboard.map((entry, index) => (
        <LeaderboardEntry key={`${entry.username}-${index}`} entry={entry} rank={index + 1} />
        
      ))}
    </div>
  );
}
