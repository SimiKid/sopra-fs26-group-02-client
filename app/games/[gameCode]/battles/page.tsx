"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { WIZARDS } from "@/constants/wizards.constants";

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

  // Transient UI state
  const [targetTime, setTargetTime] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [player1DamageText, setPlayer1DamageText] = useState("");
  const [player2DamageText, setPlayer2DamageText] = useState("");
  const [resultStats, setResultStats] = useState<BattleResult | null>(null);
  const previousStateRef = useRef<BattleStateDTO | null>(null);
  const [myAnimation, setMyAnimation] = useState<"idle" | "attack" | "death">("idle");
  const [opponentAnimation, setOpponentAnimation] = useState<"idle" | "attack" | "death">("idle");
  const [myAnimationKey, setMyAnimationKey] = useState(0);
  const [opponentAnimationKey, setOpponentAnimationKey] = useState(0);

  const myAnimationRef = useRef<"idle" | "attack" | "death">("idle");
  const opponentAnimationRef = useRef<"idle" | "attack" | "death">("idle");

  const [showResults, setShowResults] = useState(false);

  const [rematchWaiting, setRematchWaiting] = useState(false);
  const [rematchTimeLeft, setRematchTimeLeft] = useState(30);
  const rematchPollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rematchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleRematch = async () => {
    if (rematchWaiting) return;
    try {
      await apiService.post(`/games/${gameCode}/rematch`, {});
      setRematchWaiting(true);
      setRematchTimeLeft(30);
    } catch (err) {
      message.error((err as Error)?.message ?? "Failed to request rematch.");
      router.push("/lobby");
      return;
    }

      rematchPollRef.current = setInterval(async () => {
    try {
      const game = await apiService.get<{ rematchGameCode?: string }>(`/games/${gameCode}`);
      if (!game.rematchGameCode) return;
      clearInterval(rematchPollRef.current!);
      clearInterval(rematchTimerRef.current!);
      router.push(`/games/${game.rematchGameCode}/wizards`);
    } catch {
      }
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

    // Don't process state changes after game is over
    if (battleState.gameStatus === "FINISHED") return;

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

    const turnAdvanced = previous.activePlayerId !== battleState.activePlayerId;
    const hasResolvedAttack = battleState.attackUsed !== null;

    if (turnAdvanced && hasResolvedAttack && myUserId !== null) {
      const attackerUserId = previous.activePlayerId;

      if (attackerUserId === myUserId) {
        setMyAnimation("attack");
        setMyAnimationKey((k) => k + 1);
      } else {
        setOpponentAnimation("attack");
        setOpponentAnimationKey((k) => k + 1);
      }
    }

    previousStateRef.current = battleState;
  }, [battleState, myUserId]);

  const handleMyAnimationComplete = useCallback(() => {
    setMyAnimation((current) =>
      current === "death" ? current : "idle"
    );
  }, []);

  const handleOpponentAnimationComplete = useCallback(() => {
    setOpponentAnimation((current) =>
      current === "death" ? current : "idle"
    );
  }, []);

  // Keep refs in sync with state
  useEffect(() => {
    myAnimationRef.current = myAnimation;
  }, [myAnimation]);

  useEffect(() => {
    opponentAnimationRef.current = opponentAnimation;
  }, [opponentAnimation]);



  const elementModifiers = useMemo(() => {
    const temperature = battleState?.temperature ?? null;
    const rain = battleState?.rain ?? null;

    return {
      FIRE: getElementModifier("FIRE", temperature, rain),
      ICE: getElementModifier("ICE", temperature, rain),
      STORM: getElementModifier("STORM", temperature, rain),
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
    .get<BattleResult>(`/games/${gameCode}/result`)
    .then((data) => setResultStats(data))
    .catch((err) => message.error(err?.message ?? "Failed to load battle results."));
}, [isGameOver, apiService, gameCode, message, tokenHydrated, token]);

useEffect(() => {
  if (!isGameOver || !battleState || !myUserId) return;

  // Determine the loser
  const isDraw = battleState.winnerId === null;
  const loserIsMe = !isDraw && battleState.winnerId !== myUserId;

  // calculate attack duration determined by attack frames times animation speed
  const attackDuration = (() => {
    const wizard = WIZARDS.find((w) => w.id === (battleState?.player2WizardClass)); // Player 2 is always the last to attack (all wizards currently have the same animations, so not really necessary at the moment)
    const frames = wizard?.attack_frames;
    const animationSpeed = wizard?.animation_speed;
    return frames && animationSpeed ? frames * animationSpeed : 1000; // default to 1000ms if any value is missing
    // in the future, check if wizard or spell animation has more frames and use that for duration calculation
  })();
  // wait for attack animation to finish before starting death animation
  setTimeout(() => {}, attackDuration);

  // Set death animation for the loser or both if it's a draw
  if (!isDraw) {
    if (loserIsMe) {
      setMyAnimation("death");
      setMyAnimationKey((k) => k + 1);
    } else {
      setOpponentAnimation("death");
      setOpponentAnimationKey((k) => k + 1);
    }
  } else {
    setMyAnimation("death");
    setMyAnimationKey((k) => k + 1);
    setOpponentAnimation("death");
    setOpponentAnimationKey((k) => k + 1);
  }
  // Show results after 4 seconds
  const timer = setTimeout(() => {
    setShowResults(true);
  }, 4000);

  return () => clearTimeout(timer);
}, [isGameOver, battleState, myUserId]);

useEffect(() => {
  return () => {
    clearInterval(rematchPollRef.current!);
    clearInterval(rematchTimerRef.current!);
  };
}, []);

useEffect(() => {
  const fetchTimer = async () => {
    setTimeLeft(null);
    setTargetTime(null);
    try {
      const response = await apiService.get<string>(`/timer/${gameCode}`);
      setTargetTime(response); 
      
    } catch (error) {
      console.error("Error loading timer", error);
    }
  };

  if (isMyTurn) {
    fetchTimer();
  }
}, [isMyTurn, gameCode]);

useEffect(() => {
  if (!targetTime || !isMyTurn) return;

  const timer = setInterval(() => {
    const now = new Date(); 
    const end = new Date(targetTime); 
    const diffInMs = end.getTime() - now.getTime();
    const seconds = Math.floor(diffInMs / 1000);

    if (seconds <= 0) {
      setTimeLeft(0);
      clearInterval(timer); 
    } else {
      setTimeLeft(seconds); 
    }
  }, 1000);
  return () => clearInterval(timer);
}, [targetTime, isMyTurn]); 


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

if (isGameOver && showResults) {
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
          <Spin className={styles.spinMargin} />
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

  const amIPlayer1 = battleState.player1UserId === myUserId;

  const p1 = {
    wizard: battleState.player1WizardClass,
    username: battleState.player1Username ?? "You",
    hp: battleState.player1Hp,
    maxHp: battleState.player1MaxHp,
    damage: player1DamageText,
  };

  const p2 = {
    wizard: battleState.player2WizardClass,
    username: battleState.player2Username ?? "Opponent",
    hp: battleState.player2Hp,
    maxHp: battleState.player2MaxHp,
    damage: player2DamageText,
  };

  const me = amIPlayer1 ? p1 : p2;
  const opponent = amIPlayer1 ? p2 : p1;

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
            username={me.username}
            wizardClass={me.wizard}
            currentHp={me.hp}
            maxHp={me.maxHp}
            damageText={me.damage}
          />
          <WizardAvatar
            wizardType={me.wizard}
            align="left"
            animation={myAnimation}
            playOnce={myAnimation === "attack" || myAnimation === "death"}
            animationKey={myAnimationKey}
            onAnimationComplete={handleMyAnimationComplete}
          />
        </div>

        <TurnStatus isMyTurn={isMyTurn} timeLeft={timeLeft} />

        <div className={styles.fighterColumn}>
          <FighterPanel
            username={opponent.username}
            wizardClass={opponent.wizard}
            currentHp={opponent.hp}
            maxHp={opponent.maxHp}
            damageText={opponent.damage}
          />
          <WizardAvatar
            wizardType={opponent.wizard}
            align="right"
            animation={opponentAnimation}
            playOnce={opponentAnimation === "attack" || opponentAnimation === "death"}
            animationKey={opponentAnimationKey}
            onAnimationComplete={handleOpponentAnimationComplete}
          />
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.attackDock}>
          <AttackInterface
            attacks={myAttacks}
            isMyTurn={isMyTurn}
            disabled={!isConnected || myAnimation !== "idle" || opponentAnimation !== "idle"}
            onAttackSelected={sendAttack}
            rain={battleState.rain}
            temperature={battleState.temperature}
            wizardClass={me.wizard}
          />
        </div>
      </div>
    </main>
  );
}