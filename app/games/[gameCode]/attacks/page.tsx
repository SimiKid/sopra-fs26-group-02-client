"use client";

import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { Button, Spin, App } from "antd";
import { ATTACK_IMAGES } from "@/constants/attacks.constants";
import { useAttackSelection } from "@/hooks/useAttackSelection";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";


export default function Attacks() {
  const { value: token, hydrated } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);
  const params = useParams();
  const gameCode = params.gameCode as string;
  const { message } = App.useApp();

  const [location, setLocation] = useState<string>("Loading...", );

  useEffect(() => {
    if (!hydrated || !token) return;
    let cancelled = false;
    const fetchLocation = async () => {
      try {
        const response = await apiService.get<{ locationName: string }>(`/games/${gameCode}/location`);
        if (cancelled) return;
          setLocation(response.locationName);
      } catch {
        if (cancelled) return;
        message.error("Failed to get location.");
        setLocation("Unknown location");
      }
    };

    fetchLocation();

    return () => {
    cancelled = true;
    };
  }, [apiService, gameCode, hydrated, token, message]);

  const {
    selectedAttacks,
    attacks,
    waitingForOpponent,
    handleChooseAttacks,
    handleAttackSelect,
    formatElement,
  } = useAttackSelection(gameCode);

  if (waitingForOpponent) {
    return (
      <div className={styles.page}>
        <div className={styles.waitingContainer}>
          <h1 className={styles.title}>Attacks Selected!</h1>
          <p className={styles.locationText}>
            Waiting for your opponent to finish selecting attacks...
          </p>
          <div className={styles.spinnerWrapper}>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Attack Selection</h1>
          <p className={styles.locationText}>
            Location: {location} 
            <br />
            Select 3 attacks for the battle.
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
        {attacks.map((attack) => (
          <div key={attack.id} className={styles.attack}>
            <button
              type="button"
              className={`${styles.buttonAttack} ${
                selectedAttacks.includes(attack.id) ? styles.selected : ""
              }`}
              style={{
                backgroundImage: `url(${ATTACK_IMAGES[attack.id]})`,
              }}
              onClick={() => handleAttackSelect(attack.id)}
            />

            <div className={styles.attackInfo}>
              <h2 className={styles.attackTitle}>{attack.name}</h2>
              <p className={styles.attackDescription}>
                Base Damage: {attack.baseDamage}
              </p>
              <p className={styles.attackDescription}>
                Element Type: {formatElement(attack.element)}
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