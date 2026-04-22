"use client";

import type { GameHistoryEntry } from "@/types/history";
import BattleHistoryEntry from "./BattleHistoryEntry";
import styles from "./BattleHistoryList.module.css";

interface BattleHistoryListProps {
  games: GameHistoryEntry[];
}

export default function BattleHistoryList({ games }: BattleHistoryListProps) {
  if (games.length === 0) {
    return (
      <div className={styles.empty}>
        <h2 className={styles.emptyTitle}>No battles yet</h2>
        <p className={styles.emptyHint}>
          Finish your first battle to start tracking your performance.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {games.map((entry, index) => (
        <BattleHistoryEntry key={`${entry.gameDate}-${index}`} entry={entry} />
      ))}
    </div>
  );
}
