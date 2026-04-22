"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";

import styles from "./AppHeader.module.css";
import { useLobby } from "@/hooks/useLobby"
import { Button } from "antd";
const HIDDEN_EXACT = ["/", "/login", "/register"];
// Battle route is /games/[gameCode]/battles — keep it immersive (no chrome).
const HIDDEN_SUFFIXES = ["/battles"];

function shouldHide(pathname: string): boolean {
  if (HIDDEN_EXACT.includes(pathname)) return true;
  return HIDDEN_SUFFIXES.some((s) => pathname.endsWith(s));
}

const NAV_LINKS = [
  { href: "/lobby", label: "Lobby" },
  { href: "/profile", label: "Profile" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const { value: token, hydrated } = useLocalStorage<string>("token", ""); 
  const { handleLogout } = useLobby();
  if (shouldHide(pathname)) return null;

  // Until we know the auth state, render a minimal shell so we don't
  // flash the nav links for a frame before hiding them.
  const isLoggedIn = hydrated && !!token;


  return (
    <header className={styles.header}>
      <Link href={isLoggedIn ? "/lobby" : "/"} className={styles.brand}>
        Weather Wizards
      </Link>

      {isLoggedIn && (
        <nav className={styles.nav}>
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
              >
                {label}
              </Link>
            );
          })}
          <Button onClick={handleLogout} className="button-secondary">
            Logout
          </Button>
        </nav>
      )}
    </header>
  );
}
