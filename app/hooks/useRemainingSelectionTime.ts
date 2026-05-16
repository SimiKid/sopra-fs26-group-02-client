import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from './useApi';
import useLocalStorage from './useLocalStorage';

const targetTimeKey = (gameCode: string) => `targetTime_${gameCode}`;
const stoppedKey = (gameCode: string) => `selectionTimerStopped_${gameCode}`;
export const selectionExpiredKey = (gameCode: string) => `selectionTimerExpired_${gameCode}`;

export const SELECTION_EXPIRED_EVENT = 'selection-time-expired';

export function dispatchSelectionExpired(gameCode: string) {
    window.dispatchEvent(
        new CustomEvent(SELECTION_EXPIRED_EVENT, { detail: { gameCode } }),
    );
}

export function useRemainingSelectionTime(gameCode: string) {
    const { value: token, hydrated } = useLocalStorage<string>("token", "");
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const apiService = useApi(token);

    const clearExistingInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const isStopped = useCallback(
        () =>
            !!sessionStorage.getItem(stoppedKey(gameCode)) ||
            !!sessionStorage.getItem(selectionExpiredKey(gameCode)),
        [gameCode],
    );

    const startCountdown = useCallback((target: number) => {
        if (isStopped()) return;
        clearExistingInterval();

        intervalRef.current = setInterval(() => {
            if (isStopped()) {
                clearExistingInterval();
                return;
            }

            const remaining = Math.max(0, Math.floor((target - Date.now()) / 1000));
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearExistingInterval();
                dispatchSelectionExpired(gameCode);
            }
        }, 1000);
    }, [clearExistingInterval, gameCode, isStopped]);

    useEffect(() => {
        if (!gameCode || !hydrated || !token || isStopped()) return;

        const storedTarget = sessionStorage.getItem(targetTimeKey(gameCode));
        if (storedTarget) {
            startCountdown(parseInt(storedTarget, 10));
        } else {
            apiService
                .get<number>(`/${gameCode}/expiration-time`)
                .then((remainingMs) => {
                    if (isStopped()) return;
                    const newTarget = Date.now() + remainingMs;
                    sessionStorage.setItem(targetTimeKey(gameCode), newTarget.toString());
                    startCountdown(newTarget);
                })
                .catch((err) => console.error("Error fetching expiration time:", err));
        }

        return clearExistingInterval;
    }, [gameCode, apiService, startCountdown, clearExistingInterval, hydrated, token, isStopped]);

    const stopTimer = useCallback((markExpired = false) => {
        sessionStorage.setItem(stoppedKey(gameCode), 'true');
        if (markExpired) {
            sessionStorage.setItem(selectionExpiredKey(gameCode), 'true');
        }
        clearExistingInterval();
        sessionStorage.removeItem(targetTimeKey(gameCode));
        setTimeLeft(null);
    }, [clearExistingInterval, gameCode]);

    return { timeLeft, stopTimer };
}
