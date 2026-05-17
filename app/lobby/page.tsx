"use client";

import { Button, Spin, Input, Divider, Form } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useLobby } from "@/hooks/useLobby";
import { useBattleCounter } from "@/hooks/useBattleCounter";
import Leaderboard from "@/components/profile/Leaderboard/Leaderboard";
import styles from "./page.module.css";
import { useMatchmaking } from "@/hooks/useMatchmaking";
import { useRequireAuth } from "@/hooks/useRequireAuth";


export default function Lobby() {
  const { ready } = useRequireAuth();
  const battleCount = useBattleCounter();

  const {
    gameCode,
    loading,
    joinCode,
    setJoinCode,
    joinLoading,
    timeLeft,
    gameFullMessage,
    handleCreateGame,
    handleCancelWaiting,
    handleCopyCode,
    handleJoinGame,
    formatTime,
  } = useLobby();

  const { startMatchmaking, isSearching, matchFoundMessage, stopMatchmaking, timeLeft: matchmakingTimeLeft } = useMatchmaking();

  const formatMatchmakingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (!ready) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <Spin size="large" />
        </div>
      </div>
    );
  }

  if (gameFullMessage || matchFoundMessage) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="title">Game Ready!</h1>
          <p className="subtitle">{gameFullMessage || matchFoundMessage}</p>
          <div className={styles.spinnerWrapper}>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (isSearching) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="title">Search for an opponent</h1>
          <p className="subtitle">Wait for an other player to join the game</p>
          <div className={styles.spinnerWrapper}>
            <Spin size="large" />
            <p className={matchmakingTimeLeft <= 10 ? styles.timerWarning : styles.timerDefault}>
              Matchmaking ends in: {formatMatchmakingTime(matchmakingTimeLeft)}
            </p>
          </div>
          <Button
            block
            danger
            type="text"
            className={styles.cancelButton}
            onClick={stopMatchmaking}
          >
            Cancel and return to menu
          </Button>
        </div>
      </div>
    );
  }

  if (!gameCode) {
    return (
      <div className={`page ${styles.pageOverride}`}>
        <div className={styles.lobbyWrapper}>
        <aside className={styles.battleCounterSide}>
          <h2 className={styles.battleCounterTitle}>
            Battles Played
          </h2>

          <div className={styles.battleCounterCard}>
            <div className={styles.battleCounterNumber}>
              {battleCount ?? "—"}
            </div>

            <p className={styles.battleCounterLabel}>
              total battles
            </p>
          </div>
        </aside>

        <div className="container">
          <h1 className="title">Weather Wizards</h1>
          <p className="subtitle">Start a new battle</p>

          <Button
            block
            className="button-primary"
            onClick={handleCreateGame}
            loading={loading}
          >
            Create Game
          </Button>

          <Divider className={styles.divider}>or</Divider>

          <Form>
            <Form.Item>
              <Input
                placeholder="Game code"
                maxLength={6}
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className={`submit ${styles.codeInput}`}
              />
            </Form.Item>

            <Form.Item>
              <Button
                block
                htmlType="submit"
                className="button-secondary"
                onClick={handleJoinGame}
                loading={joinLoading}
              >
                Join Game
              </Button>
            </Form.Item>
          </Form>

          <Divider className={styles.divider}>or</Divider>
          <Button
            block
            className="button-secondary"
            onClick={startMatchmaking}
            loading={isSearching}
          >
            Quick Match
          </Button>
        </div>

        <aside className={styles.leaderboardSide}>
          <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
          <Leaderboard limit={5} compact />
        </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Game Created!</h1>
        <p className="subtitle">Share this code with your opponent</p>

        <div className={styles.gameCode}>{gameCode}</div>

        <Button
          block
          className="button-secondary"
          icon={<CopyOutlined />}
          onClick={handleCopyCode}
        >
          Copy Code
        </Button>

        <div className={styles.spinnerWrapper}>
          <Spin size="large" />
          <p className={styles.waitingSubtitle}>Waiting for opponent to join...</p>

          <p className={timeLeft < 60 ? styles.timerWarning : styles.timerDefault}>
            Code expires in: {formatTime(timeLeft)}
          </p>

          <Button
            block
            danger
            type="text"
            className={styles.cancelButton}
            onClick={handleCancelWaiting}
          >
            Cancel and return to menu
          </Button>
        </div>
      </div>
    </div>
  );
}