"use client";

import styles from "./SpriteAnimation.module.css";
import { useEffect, useState } from "react";

interface SpriteAnimationProps {
  src: string;
  frames: number;
  spriteWidth: number;
  spriteHeight: number;
  animationSpeed?: number; // milliseconds per frame
  className?: string;
  scale?: number;
  displayWidth?: number; // width to display the sprite at
  displayHeight?: number; // height to display the sprite at
  flipX?: boolean; // whether to flip the sprite horizontally
  playOnce?: boolean; // whether to play the animation only once (instead of looping)
  onComplete?: (animationFinished: boolean) => void;}

export default function SpriteAnimation({
  src, // URL of the sprite sheet
  frames, // total number of frames in the sprite sheet
  spriteWidth, // width of each individual frame
  spriteHeight, // height of each individual frame
  animationSpeed = 100, // default to 100ms per frame
  className = "",
  scale = 1, // sprites can be scaled up or down with this factor
  displayWidth, // can be used to override the default width (spriteWidth * scale)
  displayHeight, // can be used to override the default height (spriteHeight * scale)
  flipX = false, // whether to flip the sprite horizontally
  playOnce = false, // whether to play the animation only once (instead of looping)
  onComplete,
}: SpriteAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0); // current frame index

  // Reset to frame 0 whenever animation source/profile changes.
  useEffect(() => {
    setFrameIndex(0);

    let currentFrame = 0;

    const interval = setInterval(() => {
      currentFrame += 1;

      if (playOnce) {
        if (currentFrame >= frames) {
          setFrameIndex(frames - 1);
          clearInterval(interval);
          onComplete?.(true);
          return;
        }

        setFrameIndex(currentFrame);
      } else {
        setFrameIndex(currentFrame % frames);
      }
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [src, frames, animationSpeed, playOnce, onComplete]);

  const safeFrame = Math.max(0, Math.min(frameIndex, frames - 1));
  const col = safeFrame;

  const offsetX = col * spriteWidth;
  const totalWidth = frames * spriteWidth;

  const width = displayWidth || spriteWidth * scale;
  const height = displayHeight || spriteHeight * scale;
  const scaledOffsetX = offsetX * scale;
  const scaledTotalWidth = totalWidth * scale;
  const scaledTotalHeight = spriteHeight * scale;

  return (
    <div
      className={`${styles.sprite} ${className}`}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: `-${scaledOffsetX}px 0`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundSize: `${scaledTotalWidth}px ${scaledTotalHeight}px`,
        transform: flipX ? "scaleX(-1)" : undefined, // flip horizontally if flipX is true (for opponent in the battle screen)
        transformOrigin: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
