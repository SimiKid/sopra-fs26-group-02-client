// we call lit lobby not game page 
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Spin, App, Input, Divider } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { GameSession } from "@/types/game";


export default function CreateGame() {
  const router = useRouter();
  const { value: token } = useLocalStorage<string>("token", "");
  const { value: userId } = useLocalStorage<string>("userId", "");
  const { message } = App.useApp();
  const apiService = useApi(token);

  const [gameCode, setGameCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const response = await apiService.post<GameSession>("/game", { player1Id: userId });
      setGameCode(response.gameCode);
    } catch (error) {
      if (error instanceof Error) {
        message.error(`Failed to create game: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelWaiting = () => {
    if (intervalRef.current) {
        clearInterval(intervalRef.current);
    }
    setGameCode(null);
    setTimeLeft(600);
    message.info({
        content: "Game creation cancelled.", style: {color: "#000000", },});
    };

  const handleCopyCode = async () => {
    if (!gameCode) return;
    try {
      await navigator.clipboard.writeText(gameCode);
      message.success({
        content: "Game code copied!", style: {color: "#000000", },});
    } catch {
      message.error({content: "Failed to copy code.", style: {color: "#000000",},});
    }
  };

  const handleJoinGame = async () => {
    if (joinCode.length !== 6) {
      message.error({content: "Please enter a valid 6-character game code.", style: {color: "#000000",},});
      return;
    }
    setJoinLoading(true);
    try {
      await apiService.post(`/game/${joinCode}/players`, {});
      router.push("/lobby");
    } catch (error) {
      if (error instanceof Error) {
        message.error({content: `Failed to join game: ${error.message}`, style: {color: "#000000",},});
      }
    } finally {
      setJoinLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  useEffect(() => {
    if (!gameCode || timeLeft <= 0) {
        if (gameCode && timeLeft === 0) {
            message.error({content: "Game code expired!", style: {color: "#000000",},});
            setGameCode(null);
        }
        return;
    }

    const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
}, [gameCode, timeLeft]);

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
        <div style={{ 
            marginTop: "12px", 
            fontSize: "1.2rem", 
            fontFamily: "'Cinzel', serif", 
            color: timeLeft < 60 ? "#ff4d4f" : "#a78bfa",
            fontWeight: "bold",
            textShadow: timeLeft < 60 ? "0 0 10px rgba(255, 77, 79, 0.5)" : "none"
        }}>
            Code expires in: {formatTime(timeLeft)}
        </div>

        <Button 
            block
            danger
            type="text"
            onClick={handleCancelWaiting}
            style={{ 
                marginTop: "12px", 
                color: "rgba(255, 77, 79, 0.8)", 
                fontSize: "0.9rem" 
            }}
            >
            Cancel and return to menu
        </Button>
        </div>
      </div>
    </div>
  );
}