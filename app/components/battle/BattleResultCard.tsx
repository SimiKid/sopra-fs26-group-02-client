"use client";

import { Button, Spin } from "antd";

import { BattleStateDTO } from "@/types/battle";
import { BattleResult } from "@/types/battleResult";
import { Attack } from "@/types/attack";
import { ATTACK_GRADIENTS, ATTACK_IMAGES } from "@/constants/attacks.constants";
import { formatWizardClass } from "@/utils/formatHistory";
import type { WizardClass } from "@/types/history";

import styles from "./BattleResultCard.module.css";

interface BattleResultCardProps {
  battleState: BattleStateDTO;
  myUserId: number | null;
  resultStats: BattleResult | null;
  myAttacks: Attack[];
  rematchWaiting: boolean;
  rematchTimeLeft: number;
  onRematch: () => void;
  onLeaveLobby: () => void;
}

export default function BattleResultCard({
  battleState,
  myUserId,
  resultStats,
  myAttacks,
  rematchWaiting,
  rematchTimeLeft,
  onRematch,
  onLeaveLobby,
}: BattleResultCardProps) {
  const isDraw = battleState.winnerId === null;
  const youWon = !isDraw && battleState.winnerId === myUserId;
  const amIPlayer1 = battleState.player1UserId === myUserId;

  const myUsername = amIPlayer1 ? battleState.player1Username : battleState.player2Username;
  const opponentUsername = amIPlayer1 ? battleState.player2Username : battleState.player1Username;
  const myWizardClass = amIPlayer1 ? battleState.player1WizardClass : battleState.player2WizardClass;
  const opponentWizardClass = amIPlayer1 ? battleState.player2WizardClass : battleState.player1WizardClass;

  const myMaxHp = amIPlayer1 ? battleState.player1MaxHp : battleState.player2MaxHp;
  const myFinalHp = amIPlayer1 ? battleState.player1Hp : battleState.player2Hp;
  const opponentMaxHp = amIPlayer1 ? battleState.player2MaxHp : battleState.player1MaxHp;
  const opponentFinalHp = amIPlayer1 ? battleState.player2Hp : battleState.player1Hp;

  const myDamage = opponentMaxHp - opponentFinalHp;
  const opponentDamage = myMaxHp - myFinalHp;

  const outcomeLabel = isDraw ? "DRAW" : youWon ? "VICTORY" : "DEFEAT";
  const outcomeCss = isDraw ? styles.draw : youWon ? styles.victory : styles.defeat;

  return (
    <div className={styles.card}>
      {/* Outcome title */}
      <h1 className={`${styles.outcomeTitle} ${outcomeCss}`}>{outcomeLabel}</h1>

      {/* Matchup row */}
      <div className={styles.matchup}>
        <div className={styles.side}>
          <span className={styles.sideLabel}>You</span>
          <span className={styles.sideUsername}>{myUsername}</span>
          <span className={styles.sideClass}>{formatWizardClass(myWizardClass as WizardClass)}</span>
          <span className={styles.sideDamage}>{myDamage} dmg dealt</span>
        </div>

        <span className={styles.vs}>VS</span>

        <div className={styles.side}>
          <span className={styles.sideLabel}>Opponent</span>
          <span className={styles.sideUsername}>{opponentUsername}</span>
          <span className={styles.sideClass}>{formatWizardClass(opponentWizardClass as WizardClass)}</span>
          <span className={styles.sideDamage}>{opponentDamage} dmg dealt</span>
        </div>
      </div>

      {/* Stats strip */}
      {resultStats ? (
        <div className={styles.statsStrip}>
          {battleState.location && (
            <div className={styles.statChip}>
              <span className={styles.chipValue}>{battleState.location}</span>
              <span className={styles.chipLabel}>Location</span>
            </div>
          )}
          <div className={styles.statChip}>
            <span className={styles.chipValue}>{resultStats.turnsPlayed}</span>
            <span className={styles.chipLabel}>Turns</span>
          </div>
          <div className={styles.statChip}>
            <span className={styles.chipValue}>{resultStats.weather.temperatureCategory.toLowerCase()}</span>
            <span className={styles.chipLabel}>Temperature</span>
          </div>
          <div className={styles.statChip}>
            <span className={styles.chipValue}>{resultStats.weather.rainCategory.toLowerCase()}</span>
            <span className={styles.chipLabel}>Rain</span>
          </div>
        </div>
      ) : (
        <Spin style={{ alignSelf: "center" }} />
      )}

      {/* Attacks used */}
      {myAttacks.length > 0 && (
        <div className={styles.attacksSection}>
          <span className={styles.attacksSectionLabel}>Your attacks</span>
          <div className={styles.attackChips}>
            {myAttacks.map((attack) => (
              <span
                key={attack.id}
                className={styles.attackChip}
                style={{ background: ATTACK_GRADIENTS[attack.id] }}
              >
                <img src={ATTACK_IMAGES[attack.id]} alt={attack.name} />
                {attack.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className={styles.buttonStack}>
        {rematchWaiting ? (
          <Button type="primary" block disabled>
            <Spin size="small" /> Waiting for opponent… {rematchTimeLeft}s
          </Button>
        ) : (
          <Button type="primary" block onClick={onRematch}>
            Play Again
          </Button>
        )}
        <Button block onClick={onLeaveLobby}>Back to lobby</Button>
      </div>
    </div>
  );
}
