"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { WIZARDS } from "@/constants/wizards.constants";


export default function Wizard() {
  const [attackIsSel, setWizAttack] = useState(false);
  const [tankIsSel, setWizTank] = useState(false);
  const [balancedIsSel, setWizBalanced] = useState(false);
  const [gamblerIsSel, setWizGambler] = useState(false);
  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const params = useParams();
  const gameCode = params.gameCode as string;
  const userId = parseInt(params.userId as string);

  const handleChooseWizard = async (gameCode: string, userId: number, wizardClass: string) => {
    try {
      await apiService.put(`/game/${gameCode}/players/${userId}/wizard`, { wizardClass });
      message.success(`You have chosen the ${wizardClass} Wizard!`);
      router.push(`/game/${gameCode}/players/${userId}/attacks`);
    } catch (error) {
      message.error("Failed to choose wizard. Please try again.");
    }
  };

  const handleWizardSelect = (wizardId: string) => {
    setWizAttack(wizardId === "ATTACKWIZARD" ? !attackIsSel : false);
    setWizTank(wizardId === "TANKWIZARD" ? !tankIsSel : false);
    setWizBalanced(wizardId === "BALANCEDWIZARD" ? !balancedIsSel : false);
    setWizGambler(wizardId === "GAMBLERWIZARD" ? !gamblerIsSel : false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Choose your Wizard!</h1>
      </div>

      <div className={styles.wizardList}>
        {WIZARDS.map((wizard) => (
          <div key={wizard.id} className={styles.wizard}>
            <h2 className={styles.wizardTitle}>{wizard.title}</h2>
            <Button
            block
            className={styles.buttonWizard}
            style={{
              width: 200,
              height: 300,
              padding: 0,
              backgroundImage: `url(${wizard.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              border: (attackIsSel && wizard.id === "ATTACKWIZARD") || (tankIsSel && wizard.id === "TANKWIZARD") || (balancedIsSel && wizard.id === "BALANCEDWIZARD") || (gamblerIsSel && wizard.id === "GAMBLERWIZARD") ? '5px solid blue' : 'none',
            }}
            onClick={() => handleWizardSelect(wizard.id)}
            >
            </Button>
            <p className={styles.wizardDescription}>{wizard.description}</p>
          </div>
        ))}
      </div>
      
      {/* buttonContainer matches wizardList size to align the confirm button at the bottom of the page */}
      <div className={styles.buttonContainer}>
        <Button
        className="button-primary"
        disabled ={!(attackIsSel || tankIsSel || balancedIsSel || gamblerIsSel)}
        onClick={() => handleChooseWizard(gameCode, userId, attackIsSel ? "ATTACKWIZARD" : tankIsSel ? "TANKWIZARD" : balancedIsSel ? "BALANCEDWIZARD" : gamblerIsSel ? "GAMBLERWIZARD" : "")}
        >
          Confirm Selection
        </Button>
      </div>
    </div>
  );
}
