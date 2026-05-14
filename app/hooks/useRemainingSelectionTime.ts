import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from './useApi';
import { App } from 'antd';
import { useRouter } from 'next/navigation';

export function useRemainingSelectionTime(gameCode: string) {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Referenz zum Stoppen
    const apiService = useApi();
    const { message } = App.useApp();
    const router = useRouter();

    // function to clear the interval
    const clearExistingInterval = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    const startCountdown = useCallback((target: number) => {
        clearExistingInterval(); // ensure no old interval is running

        intervalRef.current = setInterval(() => {
            const now = Date.now();
            const remaining = Math.max(0, Math.floor((target - now) / 1000));
            
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearExistingInterval();
                sessionStorage.removeItem(`targetTime_${gameCode}`);
                message.error("Time's up! You didn't select a wizard and attacks in time.");
                router.push('/lobby');
            }
        }, 1000);
    }, [gameCode, message, router, clearExistingInterval]);

    useEffect(() => {
        if (!gameCode) return;

        const storedTarget = sessionStorage.getItem(`targetTime_${gameCode}`);

        if (storedTarget) {
            startCountdown(parseInt(storedTarget));
        } else {
            apiService.get<number>(`/${gameCode}/expiration-time`)
                .then(remainingMs => {
                    const newTarget = Date.now() + remainingMs;
                    sessionStorage.setItem(`targetTime_${gameCode}`, newTarget.toString());
                    startCountdown(newTarget);
                })
                .catch(err => console.error("Error fetching expiration time:", err));
        }

        // Cleanup when component unmounts
        return () => clearExistingInterval();
    }, [gameCode, apiService, startCountdown, clearExistingInterval]);

    const stopTimer = () => {
        clearExistingInterval(); 
        sessionStorage.removeItem(`targetTime_${gameCode}`);
        setTimeLeft(null);
    };

    return { timeLeft, stopTimer };
}