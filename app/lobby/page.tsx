// we call lit lobby not game page 
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Spin, message, Input, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameSession } from "@/types/game";

export default function CreateGame() {
  const router = useRouter();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const [gameCode, setGameCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const response = await apiService.post<GameSession>("/game", {});
      setGameCode(response.gameCode);
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Failed to create game: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!gameCode) return;
    try {
      await navigator.clipboard.writeText(gameCode);
      message.success("Game code copied!");
    } catch {
      message.error("Failed to copy code.");
    }
  };

  const handleJoinGame = async () => {
    if (joinCode.length !== 6) {
      message.error("Please enter a valid 6-character game code.");
      return;
    }
    setJoinLoading(true);
    try {
      await apiService.post(`/game/${joinCode}/players`, {});
      router.push("/lobby");
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Failed to join game: ${error.message}`);
      }
    } finally {
      setJoinLoading(false);
    }
  };

  useEffect(() => {
    if (!gameCode) return;

    const poll = async () => {
      try {
        const game = await apiService.get<GameSession>(`/game/${gameCode}`);
        if (game.status === "CONFIGURING") {
          clearInterval(intervalRef.current!);
          router.push("/lobby");
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    intervalRef.current = setInterval(poll, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameCode, apiService, router]);

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

          <Divider style={{ borderColor: "rgba(167, 139, 250, 0.3)", color: "#7a6f99" }}>or</Divider>

          <Input
            placeholder="Game code"
            maxLength={6}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            className="input"
            style={{ letterSpacing: "4px", fontFamily: "'Cinzel', serif", fontSize: "1.1rem", textAlign: "center", marginBottom: "12px" }}
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

        <div style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          letterSpacing: "8px",
          fontFamily: "'Cinzel', serif",
          color: "#c8b0ff",
          textShadow: "0 0 20px rgba(160, 100, 255, 0.5)",
          margin: "24px 0",
        }}>
          {gameCode}
        </div>

        <Button
          block
          className="button-secondary"
          icon={<CopyOutlined />}
          onClick={handleCopyCode}
        >
          Copy Code
        </Button>

        <div style={{ marginTop: "48px" }}>
          <Spin size="large" />
          <p className="subtitle" style={{ marginTop: "16px" }}>
            Waiting for opponent to join...
          </p>
        </div>
      </div>
    </div>
  );
}