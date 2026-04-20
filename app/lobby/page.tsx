"use client";

import { Button, Spin, Input, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useLobby } from "@/hooks/useLobby";
import styles from "./page.module.css";

export default function Lobby() {
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

  if (gameFullMessage) {
    return (
      <div className="page">
        <div className="container">
          <h1 className="title">Game Ready!</h1>
          <p className="subtitle">{gameFullMessage}</p>
          <div className={styles.spinnerWrapper}>
            <Spin size="large" />
          </div>
        </div>
      </div>
    );
  }

  if (!gameCode) {
    return (
      <div className="page">
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

          <Input
            placeholder="Game code"
            maxLength={6}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className={`input ${styles.codeInput}`}
          />

          <Button
            block
            className="button-secondary"
            onClick={handleJoinGame}
            loading={joinLoading}
          >
            Join Game
          </Button>
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