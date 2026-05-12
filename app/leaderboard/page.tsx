"use client";

import { Spin } from "antd";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import Leaderboard from "@/components/profile/Leaderboard/Leaderboard";
import styles from "./page.module.css";

export default function LeaderboardPage() {
  const { loading } = useLeaderboard();

  if (loading) {
    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          <Spin size="large" />
        </div>  
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Leaderboard</h1>
        <p className={styles.subtitle}>
          The best players by their battle successes.
        </p>
      </header>

      {loading ? (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      ) : (
        <Leaderboard />
      )}
    </main>
  );
}