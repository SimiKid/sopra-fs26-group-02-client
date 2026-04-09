"use client";

import styles from "./page.module.css";
import { useRouter, useParams } from "next/navigation";
import { Button, App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";

const WIZARDS = [
  {
    id: "ATTACKWIZARD",
    title: "Attack Wizard",
    description: "Unleashes devastating damage but has very low health.",
  },
  {
    id: "TANKWIZARD",
    title: "Tank Wizard",
    description: "With a massive health pool but reduced damage, they stand firm against any onslaught.",
  },
  {
    id: "BALANCEDWIZARD",
    title: "Balanced Wizard",
    description: "A perfect blend of offensive power and durability.",
  },
  {
    id: "GAMBLERWIZARD",
    title: "Gambling Wizard",
    description: "With random multipliers and unstable health, every battle is a high-stakes risk.",
  },
];

export default function Wizard() {
  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const params = useParams();
  const gameCode = params.gameCode as string;
  const userId = parseInt(params.userId as string);

  const handleChooseWizard = async (gameCode: string, userId: number, wizardClass: string) => {
    try {
      await apiService.put(`/games/${gameCode}/players/${userId}/wizard`, { wizardClass });
      message.success(`You have chosen the ${wizardClass} Wizard!`);
      router.push(`/game/${gameCode}/attacks`);
    } catch (error) {
      message.error("Failed to choose wizard. Please try again.");
    }
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
              onClick={() => handleChooseWizard(gameCode, userId, wizard.id)}
              block
              className={styles.buttonWizard}
            >
              Choose {wizard.title}
            </Button>
            <p className={styles.wizardDescription}>{wizard.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}