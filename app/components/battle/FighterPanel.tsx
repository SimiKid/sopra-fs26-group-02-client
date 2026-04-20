"use client";

import styles from "./FighterPanel.module.css";

interface FighterPanelProps {
  username: string;
  wizardClass: string;
  currentHp: number;
  maxHp: number;
  damageText?: string;
}

export default function FighterPanel({
  username,
  wizardClass,
  currentHp,
  maxHp,
  damageText = "",
}: FighterPanelProps) {
  const safeMaxHp = Math.max(maxHp, 1);
  const hpPercent = Math.max(0, Math.min(100, (currentHp / safeMaxHp) * 100));

  return (
    <section className={styles.card}>
      <div className={styles.topRow}>
        <span className={styles.name}>{username}</span>
        <span className={styles.className}>{wizardClass}</span>
      </div>

      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{ width: `${hpPercent}%` }}
        />
      </div>

      <div className={styles.hpText}>
        {currentHp} / {safeMaxHp} HP
      </div>

      <div className={styles.damage}>
        {damageText || "\u00A0"}
      </div>
    </section>
  );
}