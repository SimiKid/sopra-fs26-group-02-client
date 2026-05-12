"use client";

import { useEffect, useState } from "react";
import { Attack } from "@/types/attack";
import {
  AttackId,
  ATTACK_IMAGES,
  ATTACK_GRADIENTS,
} from "@/constants/attacks.constants";

import {
  getElementModifier,
  type BattleRain,
  type BattleTemperature,
  type BattleElement,
} from "@/utils/weatherModifiers";

import styles from "./AttackInterface.module.css";

interface AttackInterfaceProps {
  attacks: Attack[];
  isMyTurn: boolean;
  disabled?: boolean;
  onAttackSelected: (attackId: AttackId) => void;
  rain: BattleRain;
  temperature: BattleTemperature;
  wizardClass: string;
}

function getModifierSymbol(modifier: number) {
  if (modifier <= 0.65) return "- -";
  if (modifier <= 0.85) return "-";
  if (modifier <= 1.0) return "=";
  if (modifier <= 1.3) return "+";
  return "+ +";
}

function getModifierClass(symbol: string) {
  if (symbol === "- -") return styles.minusMinus;
  if (symbol === "-") return styles.minus;
  if (symbol === "=") return styles.neutralModifier;
  if (symbol === "+") return styles.plus;
  return styles.plusPlus;
}

export default function AttackInterface({
  attacks,
  isMyTurn,
  disabled = false,
  onAttackSelected,
  rain,
  temperature,
  wizardClass,
}: AttackInterfaceProps) {
  const [pendingId, setPendingId] = useState<AttackId | null>(null);
  const locked = !isMyTurn || disabled;
  const isGambleWizard = wizardClass === "GAMBLERWIZARD";

  useEffect(() => {
    if (!isMyTurn) setPendingId(null);
  }, [isMyTurn]);

  const handleClick = (id: AttackId) => {
    if (locked || pendingId) return;
    setPendingId(id);
    onAttackSelected(id);
  };

  return (
    <section className={styles.container} aria-label="Attack interface">
      <div className={styles.spellList}>
        {attacks.map((attack) => {
          const isPending = pendingId === attack.id;

          const modifier = getElementModifier(
            attack.element as BattleElement,
            temperature,
            rain,
          );

          const symbol = getModifierSymbol(modifier);
          const elementClass = styles[attack.element.toLowerCase()];

          return (
            <button
              key={attack.id}
              type="button"
              className={`${styles.spellButton} ${elementClass} ${
                isPending ? styles.pending : ""
              }`}
              disabled={locked || pendingId !== null}
              onClick={() => handleClick(attack.id)}
            >
              <span
                className={styles.spellIcon}
                style={{
                  backgroundImage: `url(${ATTACK_IMAGES[attack.id]}), ${ATTACK_GRADIENTS[attack.id]}`,
                }}
              />
              <span className={styles.tooltip}>
                <strong>{attack.name}</strong>

                <div className={styles.statsRow}>
                  <span className={`${styles.element} ${elementClass}`}>
                    {attack.element}
                  </span>

                  <span className={`${styles.modifier} ${getModifierClass(symbol)}`}>
                    {symbol}
                  </span>

                  {isGambleWizard && (
                    <span className={styles.gamble}>
                      🎲
                    </span>
                  )}
                </div>

                <small>{attack.description}</small>
              </span>
            </button>
          );
        })}
      </div>
      <span className={styles.spellLabel}>Spells</span>
    </section>
  );
}