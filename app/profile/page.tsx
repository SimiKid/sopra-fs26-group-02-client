"use client";

import { Spin } from "antd";

import BattleHistoryList from "@/components/profile/BattleHistoryList";
import { useGameHistory } from "@/hooks/useGameHistory";
import { useRequireAuth } from "@/hooks/useRequireAuth";

import styles from "./page.module.css";

export default function Profile() {
  const { ready } = useRequireAuth();
  const { games, loading } = useGameHistory();

  if (!ready) {
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
        <h1 className={styles.title}>Battle History</h1>
        <p className={styles.subtitle}>
          Your completed battles, most recent first.
        </p>
      </header>

      {loading ? (
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      ) : (
        <BattleHistoryList games={games} />
      )}
    </main>
  );
}
