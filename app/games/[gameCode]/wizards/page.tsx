"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, App, Modal } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { WIZARDS } from "@/constants/wizards.constants";
import SpriteAnimation from "@/components/SpriteAnimation";
import { useRemainingSelectionTime } from "@/hooks/useRemainingSelectionTime";
import { useBattle } from "@/hooks/useBattle";
import { useEffect } from "react";
import { useGameExitGuard } from "@/hooks/useGameExitGuard";

type WizardSelectionState = {
  selectedWizardId: string | null;
};

export default function Wizard() {
  const [selection, setSelection] = useState<WizardSelectionState>({
    selectedWizardId: null,
  });

  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const params = useParams();
  const gameCode = params.gameCode as string;
  const { timeLeft } = useRemainingSelectionTime(gameCode);
  const { handleLeave, isOpponentGone, markLeftVoluntarily } = useBattle(gameCode);
  const { showConfirm, handleConfirmLeave, closeConfirm } = useGameExitGuard({ gameCode, onBeforeLeave: markLeftVoluntarily });


  useEffect(() => {
    if (isOpponentGone) {
      message.info("Your opponent has left the game.");
      router.push("/lobby");
    }
  }, [isOpponentGone]);


  const handleChooseWizard = async (
    selectedWizardId: string
  ): Promise<void> => {
    try {
      await apiService.put(`/games/${gameCode}/wizards`, {
        wizardClass: selectedWizardId,
      });

      message.success("You have chosen your wizard!");
      router.push(`/games/${gameCode}/attacks`);

    } catch (error) {
      message.error("Failed to choose wizard.");
    }
  };

  const handleWizardSelect = (wizardId: string): void => {
    setSelection((prev) => ({
      selectedWizardId: prev.selectedWizardId === wizardId ? null : wizardId,
    }));
  };

  const determineBorder = (wizardId: string): string => {
    return selection.selectedWizardId === wizardId
      ? styles.buttonWizardSelected
      : "";
  };

  const handleConfirmSelection = async (): Promise<void> => {
    if (!selection.selectedWizardId) {
      return;
    }

    await handleChooseWizard(selection.selectedWizardId);
  };

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
      <div className={styles.container}>
        <h1 className={styles.title}>Choose your Wizard!</h1>

      </div>

      <div className={styles.wizardList}>
        {WIZARDS.map((wizard) => (
          <div key={wizard.id} className={styles.wizard}>
            <h2 className={styles.wizardTitle}>{wizard.title}</h2>
            <Button
              className={`${styles.buttonWizard} ${determineBorder(wizard.id)}`}
              onClick={() => handleWizardSelect(wizard.id)}
            >
              <SpriteAnimation
                {...wizard}
                src={wizard.selection_sheet}
                frames={wizard.selection_frames}
                scale={4}
                className={styles.animatedSprite}
                animationSpeed={wizard.animation_speed}
              />
            </Button>

            <p className={styles.wizardDescription}>{wizard.description}</p>
          </div>
        ))}

      </div>
      
      {/* buttonContainer matches wizardList size to align the confirm button at the bottom of the page */}
      <div className={styles.buttonContainer}>
      <Button className={styles.leaveButton} onClick={handleLeave}>Leave</Button>

        <p className={styles.timeLeft}>⏳ {timeLeft} seconds remaining</p>

        <Button
          className={
            selection.selectedWizardId
              ? styles.buttonConfirm
              : styles.buttonDisabled
          }
          disabled={!selection.selectedWizardId}
          onClick={handleConfirmSelection}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
    </>
  );
}