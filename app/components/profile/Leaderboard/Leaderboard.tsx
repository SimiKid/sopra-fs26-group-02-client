"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import styles from "./Leaderboard.module.css";
import LeaderboardEntry from "./LeaderboardEntry";



interface LeaderboardProps {
  compact?: boolean;
  limit?: 5 | 50;
}

export default function Leaderboard({ compact = false, limit = 50 }: LeaderboardProps) {
  const { leaderboard, loading } = useLeaderboard(limit);

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
  <section className={`${styles.container} ${compact ? styles.compact : ""}`}>
    <div className={styles.headerRow}> <span>Rank</span> <span>Username</span> <span>Games</span> <span>Wins</span> {!compact && <span>Losses</span>} {!compact && <span>Win Rate</span>}
    </div>
    <div className={styles.list}>
      {leaderboard.map((entry, index) => (
        <LeaderboardEntry key={`${entry.username}-${index}`} entry={entry} rank={index + 1} compact={compact} />
        
      ))}
    </div>
  </section>
  );
}
