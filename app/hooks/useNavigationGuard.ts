"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseNavigationGuardOptions {
  enabled: boolean;
}

export function useNavigationGuard({ enabled }: UseNavigationGuardOptions) {
  const [showConfirm, setShowConfirm] = useState(false);
  const allowedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    // Add a "guard" entry so the first back press pops to a state I can control
    window.history.pushState({ guard: true }, "");

    const handlePopState = () => {
      if (allowedRef.current) return;
      // Re-push so the URL stays the same and the page doesn't unmount
      window.history.pushState({ guard: true }, "");
      setShowConfirm(true);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [enabled]);

  const allowNavigation = useCallback(() => {
    allowedRef.current = true;
  }, []);

  const closeConfirm = useCallback(() => setShowConfirm(false), []);

  return { showConfirm, allowNavigation, closeConfirm };
}