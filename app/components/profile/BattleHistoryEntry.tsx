"use client";

import type { GameHistoryEntry, GameResult } from "@/types/history";
import {
  formatGameDate,
  formatWeather,
  formatWizardClass,
} from "@/utils/formatHistory";

import styles from "./BattleHistoryEntry.module.css";

interface BattleHistoryEntryProps {
  entry: GameHistoryEntry;
}

const RESULT_LABEL: Record<GameResult, string> = {
  WIN: "Victory",
  LOSS: "Defeat",
  DRAW: "Draw",
};

const RESULT_CLASS: Record<GameResult, string> = {
  WIN: styles.resultWin,
  LOSS: styles.resultLoss,
  DRAW: styles.resultDraw,
};

export default function BattleHistoryEntry({ entry }: BattleHistoryEntryProps) {
  return (
    <article className={styles.card}>
      <div className={styles.headerRow}>
        <span className={`${styles.resultBadge} ${RESULT_CLASS[entry.result]}`}>
          {RESULT_LABEL[entry.result]}
        </span>
        <span className={styles.date}>{formatGameDate(entry.gameDate)}</span>
      </div>

      <div>
        <div className={styles.location}>{entry.location ?? "Unknown location"}</div>
        <div className={styles.weather}>
          {formatWeather(entry.temperature, entry.rain)}
        </div>
      </div>

      <div className={styles.matchup}>
        <span className={styles.side}>
          <span className={styles.sideLabel}>You</span>
          <span className={styles.sideValue}>
            {formatWizardClass(entry.myWizardClass)}
          </span>
        </span>
        <span className={styles.vs}>VS</span>
        <span className={styles.side}>
          <span className={styles.sideLabel}>Opponent</span>
          <span className={styles.sideValue}>
            {formatWizardClass(entry.opponentWizardClass)}
          </span>
        </span>
      </div>
    </article>
  );
}
