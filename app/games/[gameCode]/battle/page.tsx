"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { App, Button, Spin } from "antd";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useApi } from "@/hooks/useApi";
import { useBattle } from "@/hooks/useBattle";
import AttackInterface from "@/components/battle/AttackInterface";
import { Attack } from "@/types/attack";
import { AttackId } from "@/constants/attacks.constants";
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
  const { battleState, isConnected, error, sendAttack } = useBattle(gameCode);

  // Fetch the full attack catalog, then filter to the 3 the player configured.
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

  const myUserId = userIdStr ? Number(userIdStr) : null;
  const isMyTurn =
    battleState !== null
    && myUserId !== null
    && battleState.activePlayerId === myUserId
    && battleState.gameStatus === "BATTLE";

  const isGameOver = battleState?.gameStatus === "FINISHED";
  const isInitialBroadcast =
    battleState !== null
    && battleState.attackUsed === null
    && battleState.damageDealt === 0;

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

  return (
    <main className={styles.page}>
      <header className={styles.status}>
        {isInitialBroadcast ? (
          <p className={styles.statusLine}>
            Battle begins — {isMyTurn ? "you strike first!" : "opponent strikes first."}
          </p>
        ) : (
          <p className={styles.statusLine}>
            Last turn: <strong>{battleState.attackUsed}</strong> dealt{" "}
            <strong>{battleState.damageDealt}</strong> damage.
          </p>
        )}
        <p className={styles.hpLine}>
          P1 HP: <strong>{battleState.player1Hp}</strong> · P2 HP:{" "}
          <strong>{battleState.player2Hp}</strong>
        </p>
      </header>

      <AttackInterface
        attacks={myAttacks}
        isMyTurn={isMyTurn}
        disabled={!isConnected}
        onAttackSelected={sendAttack}
      />
    </main>
  );
}
