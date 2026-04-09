"use client";

import styles from "./page.module.css";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, Spin, App, Input, Divider } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameSession } from "@/types/game";



export default function Wizard() {
  const router = useRouter();
  const { value: token } = useLocalStorage<string>("token", "");
  const params = useParams();
  const gameCode = params.gameCode as string;
  const userId = params.userId as string;
  const { message } = App.useApp();
  const apiService = useApi(token);

  return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Choose your Wizard!</h1>
        </div>
        
        <div className={styles.wizardList}>
          <div className={styles.wizard}>
            <h2 className={styles.wizardTitle}>Attack Wizard</h2>
            <Button
              block
              className={styles.buttonWizard}
            >
              Choose Attack Wizard
            </Button>
            <h2 className={styles.wizardDescription}>
              Unleashes devastating damage but has very low health.
            </h2>
          </div>

          <div className={styles.wizard}>
            <h2 className={styles.wizardTitle}>Tank Wizard</h2>
            <Button
              block
              className={styles.buttonWizard}
            >
              Choose Tank Wizard
            </Button>
            <h2 className={styles.wizardDescription}>
              With a massive health pool but reduced damage, they stand firm against any onslaught.
            </h2>
          </div>

          <div className={styles.wizard}>
            <h2 className={styles.wizardTitle}>Balanced Wizard</h2>
            <Button
              block
              className={styles.buttonWizard}
            >
              Choose Balanced Wizard
            </Button>
            <h2 className={styles.wizardDescription}>
              A perfect blend of offensive power and durability.
            </h2>
          </div>

          <div className={styles.wizard}>
            <h2 className={styles.wizardTitle}>Gambling Wizard</h2>
            <Button
              block
              className={styles.buttonWizard}
            >
              Choose Gambling Wizard
            </Button>
            <h2 className={styles.wizardDescription}>
              With random multipliers and unstable health, every battle is a high-stakes risk.
            </h2>
          </div>
        </div>
      </div>
    );
  }