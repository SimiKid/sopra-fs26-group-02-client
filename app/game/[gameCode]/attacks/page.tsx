"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ATTACKS } from "@/constants/attacks.constants";

export default function Attacks() {
  const [fireballIsSel, setFireballIsSel] = useState(false);
  const [infernoIsSel, setInfernoIsSel] = useState(false);
  const [lightningIsSel, setLightningIsSel] = useState(false);
  const [tsunamiIsSel, setTsunamiIsSel] = useState(false);
  const [tornadoIsSel, setTornadoIsSel] = useState(false);
  const [punchIsSel, setPunchIsSel] = useState(false);
  const [iceSpikesIsSel, setIceSpikesIsSel] = useState(false);
  const [blizzardIsSel, setBlizzardIsSel] = useState(false);

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
      router.push(`/game/${gameCode}/summary`);
    } catch {
      message.error({
        content: "Failed to choose attacks.",
        style: { color: "#000000" },
      });
    }
  };

  const selectedAttacks = [
    fireballIsSel ? "FIREBALL" : null,
    infernoIsSel ? "INFERNO" : null,
    lightningIsSel ? "LIGHTNING" : null,
    tsunamiIsSel ? "TSUNAMI" : null,
    tornadoIsSel ? "TORNADO" : null,
    punchIsSel ? "PUNCH" : null,
    iceSpikesIsSel ? "ICE_SPIKES" : null,
    blizzardIsSel ? "BLIZZARD" : null,
  ].filter(Boolean);

  const handleAttackSelect = (attackId: string) => {
    const isSelected =
      (fireballIsSel && attackId === "FIREBALL") ||
      (infernoIsSel && attackId === "INFERNO") ||
      (lightningIsSel && attackId === "LIGHTNING") ||
      (tsunamiIsSel && attackId === "TSUNAMI") ||
      (tornadoIsSel && attackId === "TORNADO") ||
      (punchIsSel && attackId === "PUNCH") ||
      (iceSpikesIsSel && attackId === "ICE_SPIKES") ||
      (blizzardIsSel && attackId === "BLIZZARD");

    if (!isSelected && selectedAttacks.length >= 3) {
      return;
    }

    if (attackId === "FIREBALL") setFireballIsSel(!fireballIsSel);
    if (attackId === "INFERNO") setInfernoIsSel(!infernoIsSel);
    if (attackId === "LIGHTNING") setLightningIsSel(!lightningIsSel);
    if (attackId === "TSUNAMI") setTsunamiIsSel(!tsunamiIsSel);
    if (attackId === "TORNADO") setTornadoIsSel(!tornadoIsSel);
    if (attackId === "PUNCH") setPunchIsSel(!punchIsSel);
    if (attackId === "ICE_SPIKES") setIceSpikesIsSel(!iceSpikesIsSel);
    if (attackId === "BLIZZARD") setBlizzardIsSel(!blizzardIsSel);
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
                (fireballIsSel && attack.id === "FIREBALL") ||
                (infernoIsSel && attack.id === "INFERNO") ||
                (lightningIsSel && attack.id === "LIGHTNING") ||
                (tsunamiIsSel && attack.id === "TSUNAMI") ||
                (tornadoIsSel && attack.id === "TORNADO") ||
                (punchIsSel && attack.id === "PUNCH") ||
                (iceSpikesIsSel && attack.id === "ICE_SPIKES") ||
                (blizzardIsSel && attack.id === "BLIZZARD")
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