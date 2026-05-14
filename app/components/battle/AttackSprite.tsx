"use client";

import { ATTACK_SPRITES } from "@/constants/attackSprites.constants";
import { AttackId } from "@/constants/attacks.constants";

import styles from "./AttackSprite.module.css";
import SpriteAnimation from "../SpriteAnimation";

interface AttackSpriteProps {
  attackId: AttackId;
  align?: "left" | "right";
  playOnce?: boolean;
  onAnimationComplete?: () => void;
  scale?: number;
}

export default function AttackSprite({
  attackId,
  align = "right",
  playOnce = true,
  onAnimationComplete,
  scale = 7, // Default scale for spell animations if not specified in constants
}: AttackSpriteProps) {
  const attackSprite = ATTACK_SPRITES[attackId];

  if (!attackSprite) {
    console.warn(`Attack sprite not found for ${attackId}`);
    return null;
  }

  return (
    <div
      className={`${styles.container} ${styles[align]}`}
      style={{ transform: `translateY(${attackSprite.yOffset ?? 0}px)` }}
    >
      <SpriteAnimation
        src={attackSprite.spriteSheet}
        frames={attackSprite.frames}
        spriteWidth={attackSprite.spriteWidth}
        spriteHeight={attackSprite.spriteHeight}
        animationSpeed={attackSprite.animation_speed}
        className={styles.animatedSprite}
        scale={attackSprite.scale ?? scale}
        flipX={align === "right"}
        playOnce={playOnce}
        onComplete={onAnimationComplete}
      />
    </div>
  );
}