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
          type="primary"
          onClick={() => router.push("/login")}
        >
          Log In
        </Button>

        <Button
          size="large"
          type="primary"
          onClick={() => router.push("/register")} // /register is not created yet
        >
          Create Account
        </Button>
      </div>

      <main className={styles.main}>
        <h1 style={{ color: "#FFB6C1" }}>Group 02</h1>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}