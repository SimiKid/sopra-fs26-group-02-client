"use client";

import styles from "./page.module.css";
import { useParams, useRouter } from "next/navigation";
import { Button, Spin, App, Modal} from "antd";
import { ATTACK_IMAGES } from "@/constants/attacks.constants";
import { useAttackSelection } from "@/hooks/useAttackSelection";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRemainingSelectionTime } from "@/hooks/useRemainingSelectionTime";
import { useBattle } from "@/hooks/useBattle";
import { useGameExitGuard } from "@/hooks/useGameExitGuard";


export default function Attacks() {
  const { value: token, hydrated } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);
  const params = useParams();
  const gameCode = params.gameCode as string;
  const { message } = App.useApp();
  const {timeLeft,stopTimer} = useRemainingSelectionTime(gameCode);
  const { handleLeave, isOpponentGone, markLeftVoluntarily } = useBattle(gameCode);
  const router = useRouter();
  const [location, setLocation] = useState<string>("Loading...", );
  const { showConfirm, handleConfirmLeave, closeConfirm } = useGameExitGuard({ gameCode, onBeforeLeave: markLeftVoluntarily });

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

  useEffect(() => {
    if (isOpponentGone) {
      router.push("/lobby");
      message.info("Your opponent has left the game.");
    }
  }, [isOpponentGone]);
  
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
    <>
    <Modal
      open={showConfirm}
      title="Leave the game?"
      okText="Leave"
      cancelText="Stay"
      okButtonProps={{ danger: true }}
      onOk={handleConfirmLeave}
      onCancel={closeConfirm}
      maskClosable={false}
      closable={false}
    >
      Are you sure you want to leave? The game will be cancelled.
    </Modal>
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Attack Selection</h1>
          <p className={styles.locationHint}>
            Select 3 attacks based on this battle location:
          </p>
          <div className={styles.locationCard}>
          <div className={styles.locationName}>
            {location} 
          </div>
        </div>

          <p className={styles.timeLeft}>
            ⏳ {timeLeft} seconds remaining
          </p>

        </div>

        <div className={styles.confirmArea}>
          <div className={styles.confirmRow}>
            <Button className={styles.leaveButton} onClick={handleLeave}>Leave</Button>
            <Button
              className={
                selectedAttacks.length === 3
                  ? styles.buttonConfirm
                  : styles.buttonDisabled
              }
              disabled={selectedAttacks.length !== 3}
              onClick={() => {handleChooseAttacks(); stopTimer();}}
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
    </>
  );
}