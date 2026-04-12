"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ATTACKS, AttackId } from "@/constants/attacks.constants";

export default function Attacks() {
  const [selectedAttacks, setSelectedAttacks] = useState<AttackId[]>([]);

  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const params = useParams();
  const gameCode = params.gameCode as string;

  const handleChooseAttacks = async () => {
    if (selectedAttacks.length !== 3) {
      message.error("Please select exactly 3 attacks.");
      return;
    }

    try {
      await apiService.put(`/game/${gameCode}/attacks`, {
        attacks: selectedAttacks,
      });
      message.success({
        content: "You have chosen your attacks!",
        style: { color: "#000000" },
      });
      router.push(`/game/${gameCode}/battle`);
    } catch {
      message.error({
        content: "Failed to choose attacks.",
        style: { color: "#000000" },
      });
    }
  };

  const handleAttackSelect = (attackId: AttackId) => {
    const isSelected = selectedAttacks.includes(attackId);

    if (isSelected) {
      setSelectedAttacks(
        selectedAttacks.filter((id) => id !== attackId)
      );
      return;
    }

    if (selectedAttacks.length >= 3) {
      return;
    }

    setSelectedAttacks([...selectedAttacks, attackId]);
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Attack Selection</h1>
          <p className={styles.locationText}>
            Selected location for the battle: Placeholder
          </p>
        </div>

        <div className={styles.confirmArea}>
          <div className={styles.confirmRow}>
            <Button
              className={
                selectedAttacks.length === 3
                  ? styles.buttonConfirm
                  : styles.buttonDisabled
              }
              disabled={selectedAttacks.length !== 3}
              onClick={handleChooseAttacks}
            >
              Confirm
            </Button>

            <span className={styles.counter}>
              {selectedAttacks.length}/3
            </span>
          </div>
        </div>
      </div>

      <div className={styles.attackList}>
        {ATTACKS.map((attack) => (
          <div key={attack.id} className={styles.attack}>
            <button
              type="button"
              className={`${styles.buttonAttack} ${
                selectedAttacks.includes(attack.id)
                  ? styles.selected
                  : ""
              }`}
              style={{
                backgroundImage: `url(${attack.image})`,
              }}
              onClick={() => handleAttackSelect(attack.id)}
            />

            <div className={styles.attackInfo}>
              <h2 className={styles.attackTitle}>{attack.title}</h2>
              <p className={styles.attackDescription}>
                Base Damage: {attack.baseDamage}
              </p>
              <p className={styles.attackDescription}>
                Element Type: {attack.element}
              </p>
              <p className={styles.attackDescription}>
                {attack.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}