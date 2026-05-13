import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

// Redirects when no token is present. Waits for hydration so that
// logged-in users don't flash through a redirect on first render.
export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const { value: token, hydrated } = useLocalStorage<string>("token", "");

  useEffect(() => {
    if (hydrated && !token) router.replace(redirectTo);
  }, [hydrated, token, redirectTo, router]);

  return { ready: hydrated && !!token };
}
