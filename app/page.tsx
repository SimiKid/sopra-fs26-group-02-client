"use client";

import { useRouter } from "next/navigation";
import { Button } from "antd";
import styles from "@/styles/page.module.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <header className={styles.topRow}>
        <div className={styles.hero}>
          <h1 className={styles.title}>Weather Wizards</h1>
        </div>

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
      </header>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>✨ About the Game</h2>

          <p className={styles.body}>
            Weather Wizards is a turn-based dueling game where{" "}
            <span className={styles.highlight}>real-world weather</span> shapes every
            fight. Pick a wizard class, choose three spells, and adapt your strategy to the weather before facing your opponent.
          </p>

          <div className={styles.twistBox}>
            <div className={styles.smallElements}>📍 ⛅ The Twist</div>
            <p className={styles.body}>
              A <span className={styles.highlight}>random location</span> is chosen
              for every duel. You must{" "}
              <span className={styles.highlight}>guess the weather</span> and
              pick attacks that thrive in those conditions.
            </p>
          </div>

          <h3 className={styles.sectionTitle}>Spell Elements</h3>

          <div className={styles.elementGrid}>
            <div className={`${styles.infoBox} ${styles.fire}`}>
              <span>🔥</span>
              <div>
                <div className={styles.itemTitle}>Fire</div>
                <div className={styles.itemText}>
                  Strong in heat and clear weather, weak in cold and rain
                </div>
              </div>
            </div>

            <div className={`${styles.infoBox} ${styles.ice}`}>
              <span>❄️</span>
              <div>
                <div className={styles.itemTitle}>Ice</div>
                <div className={styles.itemText}>
                  Strong in cold and rain, weak in heat and clear weather
                </div>
              </div>
            </div>

            <div className={`${styles.infoBox} ${styles.lightning}`}>
              <span>⚡</span>
              <div>
                <div className={styles.itemTitle}>Lightning</div>
                <div className={styles.itemText}>
                  Strong in rain, weak in clear weather
                </div>
              </div>
            </div>

            <div className={`${styles.infoBox} ${styles.neutral}`}>
              <span>⚪</span>
              <div>
                <div className={styles.itemTitle}>Neutral</div>
                <div className={styles.itemText}>
                  Strong in neutral temperatures, weak in heat and cold
                </div>
              </div>
            </div>
          </div>

          <h3 className={styles.sectionTitle}>Wizard Classes</h3>

          <div className={styles.wizardGrid}>
            <div className={styles.wizardBox}>
              <div className={styles.symbolBackground}>⚔️</div>
              <div className={styles.itemTitle}>Attacker</div>
              <div className={styles.itemText}>High damage, low HP</div>
            </div>

            <div className={styles.wizardBox}>
              <div className={styles.symbolBackground}>🛡️</div>
              <div className={styles.itemTitle}>Tank</div>
              <div className={styles.itemText}>Low damage, high HP</div>
            </div>

            <div className={styles.wizardBox}>
              <div className={styles.symbolBackground}>⚖️</div>
              <div className={styles.itemTitle}>Balanced</div>
              <div className={styles.itemText}>Balanced damage and HP</div>
            </div>

            <div className={styles.wizardBox}>
              <div className={styles.symbolBackground}>🎲</div>
              <div className={styles.itemTitle}>Gambler</div>
              <div className={styles.itemText}>Random damage and HP</div>
            </div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.gameCard}`}>
          <h2 className={styles.cardTitle}>⚔️ How to play</h2>

          <ol className={styles.game}>
            <li className={styles.gameItem}>
              <div className={styles.gameIcon}>
                <div className={styles.symbolBackground}>👤</div>
                <div className={styles.line} />
              </div>
              <div>
                <div className={styles.smallElements}>Step 1</div>
                <h3 className={styles.itemTitle}>Log in or Register</h3>
                <p className={styles.itemText}>Create your account or log in</p>
              </div>
            </li>

            <li className={styles.gameItem}>
              <div className={styles.gameIcon}>
                <div className={styles.symbolBackground}>⚔️</div>
                <div className={styles.line} />
              </div>
              <div>
                <div className={styles.smallElements}>Step 2</div>
                <h3 className={styles.itemTitle}>Create or Join a Battle</h3>
                <p className={styles.itemText}>Host a duel or join one</p>
              </div>
            </li>

            <li className={styles.gameItem}>
              <div className={styles.gameIcon}>
                <div className={styles.symbolBackground}>🪄</div>
                <div className={styles.line} />
              </div>
              <div>
                <div className={styles.smallElements}>Step 3</div>
                <h3 className={styles.itemTitle}>Choose Your Wizard</h3>
                <p className={styles.itemText}>Pick a class with unique stats</p>
              </div>
            </li>

            <li className={styles.gameItem}>
              <div className={styles.gameIcon}>
                <div className={styles.symbolBackground}>✨</div>
                <div className={styles.line} />
              </div>
              <div>
                <div className={styles.smallElements}>Step 4</div>
                <h3 className={styles.itemTitle}>Pick 3 Attacks</h3>
                <p className={styles.itemText}>Build your spell loadout</p>
              </div>
            </li>

            <li className={styles.gameItem}>
              <div className={styles.gameIcon}>
                <div className={styles.symbolBackground}>🏆</div>
              </div>
              <div>
                <div className={styles.smallElements}>Step 5</div>
                <h3 className={styles.itemTitle}>Defeat Your Enemy</h3>
                <p className={styles.itemText}>
                  Take turns battling until one wizard is defeated
                </p>
              </div>
            </li>
          </ol>
        </article>
      </section>
    </div>
  );
}