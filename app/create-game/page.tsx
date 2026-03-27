"use client"; // This is a client-side component — needed for useState, useEffect, browser APIs

// React hooks for state, side effects, and mutable refs
import { useState, useEffect, useRef } from "react";
// Next.js router for programmatic navigation (redirect after opponent joins)
import { useRouter } from "next/navigation";
// Ant Design UI components
import { Button, Typography, Spin, message, Input, Divider } from "antd";
// Copy icon for the clipboard button
import { CopyOutlined } from "@ant-design/icons";
// Custom hook — creates ApiService instance with auth token attached
import { useApi } from "@/hooks/useApi";
// Custom hook — reads/writes values to localStorage (used to get the auth token)
import useLocalStorage from "@/hooks/useLocalStorage";
// Type definitions for the game session returned by the backend
import { GameSession } from "@/types/game";

// Destructure Typography components for cleaner JSX
const { Title, Text } = Typography;




export default function CreateGame() {
  const router = useRouter();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  // Game code received from backend after creating a game
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // State for joining an existing game
  const [joinCode, setJoinCode] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);

  // Holds the polling interval so we can clear it on unmount
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Call POST /game to create a new game and store the returned game code
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

  // Copy the game code to the clipboard
  const handleCopyCode = async () => {
    if (!gameCode) return;
    try {
      await navigator.clipboard.writeText(gameCode);
      message.success("Game code copied!");
    } catch {
      message.error("Failed to copy code.");
    }
  };

  // Call POST /game/{code}/players to join an existing game
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

  // Poll GET /game/{gameCode} every 2s until opponent joins
  useEffect(() => {
    if (!gameCode) return;

    const poll = async () => {
      try {
        const game = await apiService.get<GameSession>(`/game/${gameCode}`);
        // When status changes to CONFIGURING, opponent has joined — redirect
        if (game.status === "CONFIGURING") {
          clearInterval(intervalRef.current!);
          router.push("/lobby");
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    };

    intervalRef.current = setInterval(poll, 2000);

    // Cleanup: clear interval when component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [gameCode, apiService, router]);


  // Initial state: show Create Game button AND join game input
  if (!gameCode) {
    return (
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <Title level={2}>Wizard Battle</Title>

        {/* Create a new game */}
        <Button
          type="primary"
          size="large"
          onClick={handleCreateGame}
          loading={loading}
        >
          Create Game
        </Button>

        <Divider>or</Divider>

        {/* Join an existing game with a code */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
          <Input
            placeholder="Enter game code"
            maxLength={6}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            style={{ width: "160px", letterSpacing: "4px", fontFamily: "monospace", fontSize: "18px" }}
          />
          <Button
            type="default"
            size="large"
            onClick={handleJoinGame}
            loading={joinLoading}
          >
            Join Game
          </Button>
        </div>
      </div>
    );
  }

  // Waiting state: show game code + copy button + spinner
  return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <Title level={2}>Game Created!</Title>
      <div style={{ margin: "32px 0" }}>
        <Text style={{ fontSize: "14px", color: "#888" }}>
          Share this code with your opponent:
        </Text>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "12px" }}>
          <Text style={{ fontSize: "48px", fontWeight: "bold", letterSpacing: "8px", fontFamily: "monospace" }}>
            {gameCode}
          </Text>
          <Button icon={<CopyOutlined />} onClick={handleCopyCode} size="large">
            Copy
          </Button>
        </div>
      </div>
      <div style={{ marginTop: "48px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>
          <Text style={{ fontSize: "16px", color: "#888" }}>
            Waiting for opponent to join...
          </Text>
        </div>
      </div>
    </div>
  );
}