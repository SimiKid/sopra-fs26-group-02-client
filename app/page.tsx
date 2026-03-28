"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import styles from "@/styles/page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.welcomeButtons}>
        <Button
          size="large"
          className={styles.loginButton}
          onClick={() => router.push("/login")}
        >
          Log in
        </Button>

        <Button
          size="large"
          className={styles.registerButton}
          onClick={() => router.push("/register")}
        >
          Create Account
        </Button>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>Weather Wizards</h1>
        <p className={styles.subtitle}>
          A Real-Time Weather-Driven Wizard Battle Game
        </p>
      </main>

      <section className={styles.overview}>
        <h2 className={styles.overviewTitle}>Game Overview</h2>
        <p>Wizard Classes with name illustration and a stat summary (HP, attack damage, any special mechanic)</p>
        <p>Attack List</p>
        <p>
          Weather Modifier table with all six weather states and showing which attacks are boosted or reduced per weather condition.
        </p>
      </section>
    </div>
  );
}