"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { App, Button, Spin } from "antd";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { useBattle } from "@/hooks/useBattle";

import AttackInterface from "@/components/battle/AttackInterface";
import FighterPanel from "@/components/battle/FighterPanel";
import WizardAvatar from "@/components/battle/WizardAvatar";

import { Attack } from "@/types/attack";
import { BattleStateDTO } from "@/types/battle";
import { AttackId } from "@/constants/attacks.constants";
import { getElementModifier } from "@/utils/weatherModifiers";

import styles from "./page.module.css";

export default function Battle() {
  const params = useParams();
  const router = useRouter();
  const gameCode = params.gameCode as string;
  const { message } = App.useApp();

  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userIdStr } = useLocalStorage<string>("userId", "");
  const { value: storedAttackIds } = useLocalStorage<AttackId[]>(
    `selectedAttacks-${gameCode}`,
    [],
  );

  const apiService = useApi(token);

  const [myAttacks, setMyAttacks] = useState<Attack[]>([]);
  const [initialPlayer1Hp, setInitialPlayer1Hp] = useState<number | null>(null);
  const [initialPlayer2Hp, setInitialPlayer2Hp] = useState<number | null>(null);
  const [player1DamageText, setPlayer1DamageText] = useState("");
  const [player2DamageText, setPlayer2DamageText] = useState("");

  const { battleState, isConnected, error, sendAttack } = useBattle(gameCode);
  const previousStateRef = useRef<BattleStateDTO | null>(null);

  useEffect(() => {
    if (!token || storedAttackIds.length === 0) return;
    let cancelled = false;

    apiService
      .get<Attack[]>("/attacks")
      .then((all) => {
        if (cancelled) return;
        setMyAttacks(all.filter((a) => storedAttackIds.includes(a.id)));
      })
      .catch(() => message.error("Failed to load your attacks."));

    return () => {
      cancelled = true;
    };
  }, [apiService, storedAttackIds, token, message]);

  useEffect(() => {
    if (error) message.error(error);
  }, [error, message]);

  useEffect(() => {
    if (!battleState) return;

    if (initialPlayer1Hp === null) {
      setInitialPlayer1Hp(battleState.player1Hp);
    }
    if (initialPlayer2Hp === null) {
      setInitialPlayer2Hp(battleState.player2Hp);
    }
  }, [battleState, initialPlayer1Hp, initialPlayer2Hp]);

  useEffect(() => {
    if (!battleState) return;

    const previous = previousStateRef.current;

    if (!previous) {
      previousStateRef.current = battleState;
      return;
    }

    const player1Loss = previous.player1Hp - battleState.player1Hp;
    const player2Loss = previous.player2Hp - battleState.player2Hp;

    if (player1Loss > 0) {
      setPlayer1DamageText(`-${player1Loss}`);
      setTimeout(() => setPlayer1DamageText(""), 1800);
    }

    if (player2Loss > 0) {
      setPlayer2DamageText(`-${player2Loss}`);
      setTimeout(() => setPlayer2DamageText(""), 1800);
    }

    previousStateRef.current = battleState;
  }, [battleState]);

  const elementModifiers = useMemo(() => {
    const temperature = battleState?.temperature ?? null;
    const rain = battleState?.rain ?? null;

    return {
      FIRE: getElementModifier("FIRE", temperature, rain),
      ICE: getElementModifier("ICE", temperature, rain),
      LIGHTNING: getElementModifier("LIGHTNING", temperature, rain),
      NEUTRAL: getElementModifier("NEUTRAL", temperature, rain),
    };
  }, [battleState?.temperature, battleState?.rain]);

  const myUserId = userIdStr ? Number(userIdStr) : null;

  const isMyTurn =
    battleState !== null &&
    myUserId !== null &&
    battleState.activePlayerId === myUserId &&
    battleState.gameStatus === "BATTLE";

  const isGameOver = battleState?.gameStatus === "FINISHED";

  if (!isConnected || battleState === null) {
    const statusText = isConnected
      ? "Waiting for battle to start…"
      : "Connecting…";

    return (
      <div className={styles.center}>
        <div className={styles.loadingStack}>
          <Spin size="large" />
          <p className={styles.loadingText}>{statusText}</p>
        </div>
      </div>
    );
  }

  if (isGameOver) {
    const youWon = battleState.winnerId === myUserId;

    return (
      <div className={styles.center}>
        <div className={styles.endCard}>
          <h1 className={youWon ? styles.victory : styles.defeat}>
            {youWon ? "Victory!" : "Defeat"}
          </h1>
          <Button type="primary" onClick={() => router.push("/lobby")}>
            Back to lobby
          </Button>
        </div>
      </div>
    );
  }

  const playerWizardType = battleState.player1WizardClass;
  const opponentWizardType = battleState.player2WizardClass;

  const statusLine = isMyTurn
    ? "Your turn — choose an attack"
    : "Waiting for opponent…";

  return (
    <main className={styles.page}>
      <div className={styles.battleRow}>
        <div className={styles.fighterColumn}>
          <FighterPanel
            username={battleState.player1Username ?? "You"}
            wizardClass={playerWizardType}
            currentHp={battleState.player1Hp}
            maxHp={initialPlayer1Hp ?? battleState.player1Hp}
            damageText={player1DamageText}
          />
          <WizardAvatar wizardType={playerWizardType} align="left" />
        </div>

        <div className={styles.statusCenter}>
          <span
            className={`${styles.turnBadge} ${
              isMyTurn ? styles.turnMine : styles.turnTheirs
            }`}
          >
            {isMyTurn ? "Your turn" : "Opponent's turn"}
          </span>
          <span className={styles.statusLine}>{statusLine}</span>
        </div>

        <div className={styles.fighterColumn}>
          <FighterPanel
            username={battleState.player2Username ?? "Opponent"}
            wizardClass={opponentWizardType}
            currentHp={battleState.player2Hp}
            maxHp={initialPlayer2Hp ?? battleState.player2Hp}
            damageText={player2DamageText}
          />
          <WizardAvatar wizardType={opponentWizardType} align="right" />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <section className={styles.infoPanel}>
          <h2 className={styles.infoTitle}>Arena</h2>

          <div className={styles.infoBlock}>
            <div className={styles.infoLine}>
              <span className={styles.infoLabel}>Location:</span>
              <span>{battleState.location}</span>
            </div>
            <div className={styles.infoLine}>
              <span className={styles.infoLabel}>Rain:</span>
              <span>{battleState.rain ?? "Unknown"}</span>
            </div>
            <div className={styles.infoLine}>
              <span className={styles.infoLabel}>Temperature:</span>
              <span>{battleState.temperature ?? "Unknown"}</span>
            </div>
          </div>

          <div className={styles.modifierBox}>
            <div className={styles.modifierTitle}>Element Modifiers</div>
            <div className={styles.modifierGrid}>
              <span>Fire</span>
              <span>x{elementModifiers.FIRE.toFixed(2)}</span>

              <span>Ice</span>
              <span>x{elementModifiers.ICE.toFixed(2)}</span>

              <span>Lightning</span>
              <span>x{elementModifiers.LIGHTNING.toFixed(2)}</span>

              <span>Neutral</span>
              <span>x{elementModifiers.NEUTRAL.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <div className={styles.attackDock}>
          <AttackInterface
            attacks={myAttacks}
            isMyTurn={isMyTurn}
            disabled={!isConnected}
            onAttackSelected={sendAttack}
            rain={battleState.rain}
            temperature={battleState.temperature}
          />
        </div>
      </div>
    </main>
  );
}
