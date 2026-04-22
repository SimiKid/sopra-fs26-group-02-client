"use client";

import styles from "./TurnStatus.module.css";

interface TurnStatusProps {
  isMyTurn: boolean;
  timeLeft: number;
}

export default function TurnStatus({ isMyTurn, timeLeft }: TurnStatusProps) {
  const statusLine = isMyTurn
    ? `Your turn — ${timeLeft}s left`
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
