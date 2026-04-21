import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

// Redirects to /login when no token is present. Waits for hydration so
// that logged-in users don't flash through a redirect on first render.
export function useRequireAuth() {
  const router = useRouter();
  const { value: token, hydrated } = useLocalStorage<string>("token", "");

  useEffect(() => {
    if (hydrated && !token) router.replace("/login");
  }, [hydrated, token, router]);

  return { ready: hydrated && !!token };
}
