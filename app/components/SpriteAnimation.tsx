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
}

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
}: SpriteAnimationProps) {
  const [frameIndex, setFrameIndex] = useState(0); // current frame index

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [frames, animationSpeed]);

  const col = frameIndex % frames;

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
      }}
    />
  );
}
