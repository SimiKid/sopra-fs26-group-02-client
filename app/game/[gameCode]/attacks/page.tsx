"use client";

import styles from "./page.module.css";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button, App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Attacks() {
  const [fireballIsSel, setFireballIsSel] = useState(false);
  const [infernoIsSel, setInfernoIsSel] = useState(false);
  const [lightningIsSel, setLightningIsSel] = useState(false);
  const [tsunamiIsSel, setTsunamiIsSel] = useState(false);
  const [tornadoIsSel, setTornadoIsSel] = useState(false);
  const [punchIsSel, setPunchIsSel] = useState(false);
  const [iceSpikesIsSel, setIceSpikesIsSel] = useState(false);
  const [blizzardIsSel, setBlizzardIsSel] = useState(false);

  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const params = useParams();
  const gameCode = params.gameCode as string;
  const userId = parseInt(params.userId as string);


  const handleChooseAttacks = async () => {
    if (selectedAttacks.length !== 3) {
      message.error("Please select exactly 3 attacks.");
      return;
    }

    try {
      await apiService.put(`/game/${gameCode}/players/${userId}/attacks`, {
        attacks: selectedAttacks,
      });

      message.success("You have chosen your attacks!");
      router.push(`/game/${gameCode}/players/${userId}/summary`);
    } catch {
      message.error("Failed to choose attacks.");
    }
  };

  const selectedAttacks = [
    fireballIsSel ? "FIREBALL" : null,
    infernoIsSel ? "INFERNO" : null,
    lightningIsSel ? "LIGHTNING" : null,
    tsunamiIsSel ? "TSUNAMI" : null,
    tornadoIsSel ? "TORNADO" : null,
    punchIsSel ? "PUNCH" : null,
    iceSpikesIsSel ? "ICE_SPIKES" : null,
    blizzardIsSel ? "BLIZZARD" : null,
  ].filter(Boolean);

  const handleAttackSelect = (attackId: string) => {
    const isSelected =
      (fireballIsSel && attackId === "FIREBALL") ||
      (infernoIsSel && attackId === "INFERNO") ||
      (lightningIsSel && attackId === "LIGHTNING") ||
      (tsunamiIsSel && attackId === "TSUNAMI") ||
      (tornadoIsSel && attackId === "TORNADO") ||
      (punchIsSel && attackId === "PUNCH") ||
      (iceSpikesIsSel && attackId === "ICE_SPIKES") ||
      (blizzardIsSel && attackId === "BLIZZARD");

    if (!isSelected && selectedAttacks.length >= 3) {
      return;
    }

    if (attackId === "FIREBALL") setFireballIsSel(!fireballIsSel);
    if (attackId === "INFERNO") setInfernoIsSel(!infernoIsSel);
    if (attackId === "LIGHTNING") setLightningIsSel(!lightningIsSel);
    if (attackId === "TSUNAMI") setTsunamiIsSel(!tsunamiIsSel);
    if (attackId === "TORNADO") setTornadoIsSel(!tornadoIsSel);
    if (attackId === "PUNCH") setPunchIsSel(!punchIsSel);
    if (attackId === "ICE_SPIKES") setIceSpikesIsSel(!iceSpikesIsSel);
    if (attackId === "BLIZZARD") setBlizzardIsSel(!blizzardIsSel);
  };
}