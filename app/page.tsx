"use client"; // For components that need React hooks and browser APIs, SSR (server side rendering) has to be disabled. Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering
import { useRouter } from "next/navigation";
import { Button } from "antd";
import styles from "@/styles/page.module.css";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 style={{ color: "#FFB6C1" }}>Group 02</h1>
        <div className={styles.ctas}>
          <Button
            type="primary"
            variant="solid"
            onClick={() => router.push("/login")}
          >
            Go to login
          </Button>
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
