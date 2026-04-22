"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { App, Button, Spin } from "antd";

import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { useBattle } from "@/hooks/useBattle";

import AttackInterface from "@/components/battle/AttackInterface";
import FighterPanel from "@/components/battle/FighterPanel";
import TurnStatus from "@/components/battle/TurnStatus";
import WizardAvatar from "@/components/battle/WizardAvatar";

import { Attack } from "@/types/attack";
import { BattleStateDTO } from "@/types/battle";
import { AttackId } from "@/constants/attacks.constants";
import { getElementModifier } from "@/utils/weatherModifiers";
import { BattleResult } from "@/types/battleResult";

import styles from "./page.module.css";

interface PlayerGetDTO {
  id: number;
  userId: number;
  wizardClass: string;
  attacks: AttackId[];
  hp: number;
  ready: boolean;
}

export default function Battle() {
  // Routing & identity
  const router = useRouter();
  const params = useParams();
  const gameCode = params.gameCode as string;
  const { value: token, hydrated: tokenHydrated } = useLocalStorage<string>("token", "");
  const { value: userIdStr } = useLocalStorage<string>("userId", "");
  const myUserId = userIdStr ? Number(userIdStr) : null;

  // Services
  const { message } = App.useApp();
  const apiService = useApi(token);
  const { battleState, isConnected, sendAttack } = useBattle(gameCode);

  // Player-owned data (this player's 3 chosen attacks)
  const [myAttacks, setMyAttacks] = useState<Attack[]>([]);

  // Starting HP snapshot — captured once per player to compute the HP bar %
  const [initialPlayer1Hp, setInitialPlayer1Hp] = useState<number | null>(null);
  const [initialPlayer2Hp, setInitialPlayer2Hp] = useState<number | null>(null);

  // Transient UI state
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [player1DamageText, setPlayer1DamageText] = useState("");
  const [player2DamageText, setPlayer2DamageText] = useState("");
  const [resultStats, setResultStats] = useState<BattleResult | null>(null);
  const previousStateRef = useRef<BattleStateDTO | null>(null);

  const [rematchWaiting, setRematchWaiting] = useState(false);
  const [rematchTimeLeft, setRematchTimeLeft] = useState(30);
  const rematchPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rematchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRematch = async () => {
    try {
      await apiService.post(`/games/${gameCode}/rematch`, {});
      setRematchWaiting(true);

      rematchPollRef.current = setInterval(async () => {
        const game = await apiService.get<{ rematchGameCode?: string }>(`/games/${gameCode}`);
        if (!game.rematchGameCode) return;
        clearInterval(rematchPollRef.current!);
        clearInterval(rematchTimerRef.current!);
        router.push(`/games/${game.rematchGameCode}/wizards`); // ← here
      }, 4000);

      rematchTimerRef.current = setInterval(() => {
        setRematchTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(rematchPollRef.current!);
            clearInterval(rematchTimerRef.current!);
            router.push("/lobby");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      router.push("/lobby");
    }
  };

  useEffect(() => {
    if (!tokenHydrated || !token) return;
    let cancelled = false;

    Promise.all([
      apiService.get<Attack[]>("/attacks"),
      apiService.get<PlayerGetDTO>(`/games/${gameCode}/attacks`),
    ])
      .then(([all, player]) => {
        if (cancelled) return;
        const selected = new Set(player.attacks);
        setMyAttacks(all.filter((a) => selected.has(a.id)));
      })
      .catch(() => message.error("Failed to load your attacks."));

    return () => {
      cancelled = true;
    };
  }, [apiService, gameCode, tokenHydrated, token, message]);

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

  const isMyTurn =
    battleState !== null &&
    myUserId !== null &&
    battleState.activePlayerId === myUserId &&
    battleState.gameStatus === "BATTLE";

  const isGameOver = battleState?.gameStatus === "FINISHED";

useEffect(() => {
  if (!isGameOver || !tokenHydrated || !token) return;

  apiService
    .get<BattleResult>(`/games/${gameCode}/battles/result`)
    .then((data) => setResultStats(data))
    .catch(() => message.error("Failed to load battle results."));
}, [isGameOver, apiService, gameCode, message, tokenHydrated, token]);

useEffect(() => {
  if (!isMyTurn) {
    setTimeLeft(30);
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isMyTurn]);

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
  const isDraw = battleState.winnerId === null;
  const youWon = !isDraw && battleState.winnerId === myUserId;

  return (
    <div className={styles.center}>
      <div className={styles.endCard}>
        <h1 className={youWon ? styles.victory : styles.defeat}>
          {isDraw ? "Draw!" : youWon ? "Victory!" : "Defeat"}
        </h1>
        <p className={styles.battleComplete}>Battle complete</p>

        {resultStats ? (
          <>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{resultStats.totalDamageDealt}</span>
                <span className={styles.statLabel}>Total damage dealt</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{resultStats.turnsPlayed}</span>
                <span className={styles.statLabel}>Turns played</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{resultStats.weather.rainCategory.toLowerCase()}</span>
                <span className={styles.statLabel}>Rain</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statValue}>{resultStats.weather.temperatureCategory.toLowerCase()}</span>
                <span className={styles.statLabel}>Temperature</span>
              </div>
            </div>
          </>
        ) : (
          <Spin style={{ margin: "1.5rem 0" }} />
        )}

        <div className={styles.buttonStack}>
          {rematchWaiting ? (
            <Button type="primary" block disabled>
              <Spin size="small" /> Waiting for opponent… {rematchTimeLeft}s
            </Button>
          ) : (
            <Button type="primary" block onClick={handleRematch}>
              Play Again
            </Button>
          )}
          <Button block onClick={() => router.push("/lobby")}>Back to lobby</Button>
        </div>
      </div>
    </div>
  );
}

  const playerWizardType = battleState.player1WizardClass;
  const opponentWizardType = battleState.player2WizardClass;

  const statusLine = isMyTurn
    ? "Your turn — choose an attack"
    : "Waiting for opponent…";

  const temperatureClass =
    battleState.temperature === "HOT"
      ? styles.hot
      : battleState.temperature === "COLD"
        ? styles.cold
        : styles.neutral;

  const rainClass =
    battleState.rain === "RAINING" ? styles.raining : "";

  return (
    <main className={`${styles.page} ${temperatureClass} ${rainClass}`}>
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

        <TurnStatus isMyTurn={isMyTurn} timeLeft={timeLeft} />

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