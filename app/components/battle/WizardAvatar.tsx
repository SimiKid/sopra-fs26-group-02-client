"use client";

import Image from "next/image";

import { WIZARDS } from "@/constants/wizards.constants";

import styles from "./WizardAvatar.module.css";

interface WizardAvatarProps {
  wizardType: string;
  align?: "left" | "right";
}

export default function WizardAvatar({
  wizardType,
  align = "left",
}: WizardAvatarProps) {
  const wizard =
    WIZARDS.find((w) => w.id === wizardType) ?? WIZARDS[0];

  return (
    <div className={`${styles.container} ${styles[align]}`}>
      <div className={styles.frame} aria-label={wizard.title}>
        <Image
          src={wizard.image}
          alt={wizard.title}
          fill
          sizes="200px"
          className={styles.image}
          priority
        />
      </div>
      <span className={styles.label}>{wizard.title}</span>
    </div>
  );
}

