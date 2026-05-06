import React from "react";
import styles from "./LeaderboardEntry.module.css";
import type { Leaderboard } from "@/types/leaderboard";

type LeaderboardEntryProps = {
    entry: Leaderboard;
    rank: number;
    compact?: boolean;
};

function getRankClass(rank: number) {
  if (rank === 1) return styles.gold;
  if (rank === 2) return styles.silver;
  if (rank === 3) return styles.bronze;
  return styles.defaultRank;
}

function formatWinRate(winRate: number) {
  const percentage = winRate <= 1 ? winRate * 100 : winRate;
  return `${Math.round(percentage)}%`;
}

export default function LeaderboardEntry({entry, rank, compact = false}:LeaderboardEntryProps){
    return (
      <article className={`${styles.card} ${compact ? styles.compact : ""}`}>
        <span className={`${styles.rankBadge} ${getRankClass(rank)}`}>#{rank}</span>
        <span className={styles.user}>{entry.username}</span>
        <span className={styles.gamesplayed}>{entry.totalGames}</span>
        <span className={styles.wins}>{entry.wins}</span>
        {!compact && <span className={styles.losses}>{entry.losses}</span>}
        {!compact && <span className={styles.winrate}>{formatWinRate(entry.winRate)}</span>}
      </article>
    );
  }