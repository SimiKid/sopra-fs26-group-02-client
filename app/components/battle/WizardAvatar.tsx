"use client";

import { WIZARDS } from "@/constants/wizards.constants";

import styles from "./WizardAvatar.module.css";
import SpriteAnimation from "../SpriteAnimation";

interface WizardAvatarProps {
  wizardType: string;
  align?: "left" | "right";
  animation?: "idle" | "attack" | "damaged" | "death";
  playOnce?: boolean; // whether to play the animation only once (instead of looping)
  animationKey?: number;
  onAnimationComplete?: () => void;
}

export default function WizardAvatar({
  wizardType,
  align = "left",
  animation = "idle",
  playOnce = false,
  onAnimationComplete,
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
          playOnce={playOnce}
          onComplete={onAnimationComplete}
        />
      </div>
      <span className={styles.label}>{wizard.title}</span>
    </div>
  );
}

