"use client";

import { WIZARDS } from "@/constants/wizards.constants";

import styles from "./WizardAvatar.module.css";
import SpriteAnimation from "../SpriteAnimation";

interface WizardAvatarProps {
  wizardType: string;
  align?: "left" | "right";
  animation?: "idle" | "attack" | "damaged" | "death"; // todo: add more animations for battle screen (attack, damaged, death)
}

export default function WizardAvatar({
  wizardType,
  align = "left",
  animation = "idle",
}: WizardAvatarProps) {
  const wizard = WIZARDS.find((w) => w.id === wizardType) ?? WIZARDS[0];

  const spriteKey = `${animation}_sheet` as const;
  const frameKey = `${animation}_frames` as const;
  const wizardRecord = wizard as Record<string, string | number>;
  const spriteSheetValue = wizardRecord[spriteKey];
  const frameValue = wizardRecord[frameKey];
  const spriteSheet = typeof spriteSheetValue === "string" ? spriteSheetValue : wizard.idle_sheet;
  const frames = typeof frameValue === "number" ? frameValue : wizard.idle_frames;

  return (
    <div className={`${styles.container} ${styles[align]}`}>
      <div className={styles.frame} aria-label={wizard.title}>
        <SpriteAnimation
          {...wizard}
          src={spriteSheet}
          frames={frames}
          className={styles.animatedSprite}
          scale={7}
          flipX={align === "right"}
        />
      </div>
      <span className={styles.label}>{wizard.title}</span>
    </div>
  );
}

