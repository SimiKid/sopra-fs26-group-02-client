// app/hooks/useGameExitGuard.ts
"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { App } from "antd";
import { useApi } from "@/hooks/useApi";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ApplicationError } from "@/types/error";
import { useNavigationGuard } from "@/hooks/useNavigationGuard";

interface UseGameExitGuardOptions {
  gameCode: string;
  enabled?: boolean; // disable on FINISHED end-screen
  onBeforeLeave?: () => void;
}

export function useGameExitGuard({ gameCode, enabled = true, onBeforeLeave }: UseGameExitGuardOptions) {
  const router = useRouter();
  const { message } = App.useApp();
  const { value: token } = useLocalStorage<string>("token", "");
  const apiService = useApi(token);

  const { showConfirm, allowNavigation, closeConfirm } = useNavigationGuard({ enabled });

  const leaveGame = useCallback(async () => {
    onBeforeLeave?.();
    try {
      await apiService.delete(`/games/${gameCode}/leave`);
    } catch (error) {
      const err = error as ApplicationError;
      message.error(err.message ?? "Failed to leave game.");
    }
  }, [apiService, gameCode, message, onBeforeLeave]);

  // Used by the back-button modal's "Leave" button
  const handleConfirmLeave = useCallback(async () => {
    closeConfirm();
    allowNavigation();
    await leaveGame();
    router.replace("/lobby");
  }, [closeConfirm, allowNavigation, leaveGame, router]);

  // Used by the existing quit button on the battle page
  const handleQuit = useCallback(async () => {
    await leaveGame();
    router.replace("/lobby");
  }, [leaveGame, router]);

  return { showConfirm, handleConfirmLeave, closeConfirm, handleQuit };
}