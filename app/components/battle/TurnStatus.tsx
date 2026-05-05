"use client";

import styles from "./TurnStatus.module.css";

interface TurnStatusProps {
  isMyTurn: boolean;
  timeLeft: number | null;
}

export default function TurnStatus({ isMyTurn, timeLeft }: TurnStatusProps) {
  const timerText = timeLeft !== null ? ` — ${timeLeft}s left` : "";
  const statusLine = isMyTurn
    ? `Your turn${timerText}`
    : "Waiting for opponent…";

  return (
    <div className={styles.statusCenter}>
      <span
        className={`${styles.turnBadge} ${
          isMyTurn ? styles.turnMine : styles.turnTheirs
        }`}
      >
        {isMyTurn ? "Your turn" : "Opponent's turn"}
      </span>
      <span className={styles.statusLine}>{statusLine}</span>
    </div>
  );
}
