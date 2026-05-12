"use client";

import { useEffect, useState } from "react";
import { Popover } from "antd";

import type { EmoteKey, ReceivedEmote } from "@/types/emote";
import { EMOTES } from "@/constants/emotes.constants";

import styles from "./EmoteButton.module.css";

interface EmoteButtonProps {
  disabled?: boolean;
  receivedEmote: ReceivedEmote | null;
  onEmoteSelected: (emoteKey: EmoteKey) => void;
}

export default function EmoteButton({
  disabled = false,
  receivedEmote,
  onEmoteSelected,
}: EmoteButtonProps) {
  const [open, setOpen] = useState(false);
  const [visibleEmote, setVisibleEmote] = useState<string | null>(null);

  useEffect(() => {
    if (!receivedEmote) return;

    const emote = EMOTES.find((item) => item.key === receivedEmote.key);
    if (!emote) return;

    setVisibleEmote(emote.image);

    const timeout = setTimeout(() => {
      setVisibleEmote(null);
    }, 1800);

    return () => clearTimeout(timeout);
  }, [receivedEmote]);

  const content = (
    <div className={styles.emoteGrid}>
      {EMOTES.map((emote) => (
        <button
          key={emote.key}
          type="button"
          className={styles.emoteOption}
          onClick={() => {
            onEmoteSelected(emote.key);
            setOpen(false);
          }}
        >
          <img
            src={emote.image}
            alt={emote.label}
            className={styles.emoteImage}
          />
        </button>
      ))}
    </div>
  );

  return (
    <>
      {visibleEmote && (
        <img
          src={visibleEmote}
          alt="Emote"
          className={styles.floatingEmote}
        />
      )}

      <div className={styles.wrapper}>
        <Popover
          content={content}
          trigger="click"
          open={open}
          onOpenChange={setOpen}
          placement="top"
          rootClassName={styles.emotePopover}
        >
          <button
            type="button"
            className={styles.button}
            disabled={disabled}
          >
            <span className={styles.emoteIcon}>💬</span>
            <span className={styles.emoteLabel}>Emotes</span>
          </button>
        </Popover>
      </div>
    </>
  );
}