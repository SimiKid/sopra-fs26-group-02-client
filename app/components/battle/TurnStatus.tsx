"use client";

import styles from "./TurnStatus.module.css";

interface TurnStatusProps {
  isMyTurn: boolean;
  timeLeft: number | null;
  location: string;
  rain: "CLEAR" | "RAINING" | null;
  temperature: "HOT" | "NEUTRAL" | "COLD" | null;
}

function formatValue(value: string | null) {
  if (!value) return "Unknown";

  return value
    .toLowerCase()
    .replaceAll("_", " ");
}

export default function TurnStatus({
  isMyTurn,
  timeLeft,
  location,
  rain,
  temperature,
}: TurnStatusProps) {
  const timerText = timeLeft !== null ? ` — ${timeLeft}s left` : "";
  const statusLine = isMyTurn
    ? `Your turn${timerText}`
    : "Waiting for opponent…";

  return (
    <div className={styles.statusCenter}>
      <div className={styles.weatherCard}>
        <span>{formatValue(location)}</span>
        <span className={styles.weatherInfo}>
          {formatValue(rain)} · {formatValue(temperature)}
        </span>
      </div>
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
