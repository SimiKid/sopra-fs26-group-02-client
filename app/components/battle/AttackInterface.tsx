"use client";

import { useEffect, useState } from "react";
import { Attack } from "@/types/attack";
import {
  AttackId,
  ATTACK_IMAGES,
  ATTACK_GRADIENTS,
} from "@/constants/attacks.constants";
import styles from "./AttackInterface.module.css";

interface AttackInterfaceProps {
  attacks: Attack[];
  isMyTurn: boolean;
  disabled?: boolean;
  onAttackSelected: (attackId: AttackId) => void;
}

export default function AttackInterface({
  attacks,
  isMyTurn,
  disabled = false,
  onAttackSelected,
}: AttackInterfaceProps) {
  const [pendingId, setPendingId] = useState<AttackId | null>(null);
  const locked = !isMyTurn || disabled;

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
      <div className={styles.grid}>
        {attacks.map((attack) => {
          const isPending = pendingId === attack.id;

          return (
            <button
              key={attack.id}
              type="button"
              className={`${styles.card} ${isPending ? styles.pending : ""}`}
              disabled={locked || pendingId !== null}
              onClick={() => handleClick(attack.id)}
              aria-label={`${attack.name}, ${attack.baseDamage} base damage`}
            >
              <span
                className={styles.thumb}
                style={{
                  backgroundImage: `url(${ATTACK_IMAGES[attack.id]}), ${ATTACK_GRADIENTS[attack.id]}`,
                }}
                aria-hidden
              />
              <span className={styles.meta}>
                <span className={styles.name}>{attack.name}</span>
                <span className={styles.damage}>{attack.baseDamage} DMG</span>
                <span className={styles.description}>{attack.description}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
