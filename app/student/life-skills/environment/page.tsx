"use client";

import Link from "next/link";
import DustbinHoopGame from "../../games/DustbinHoopGame";
import styles from "./environment.module.css";

export default function EnvironmentPage() {
  return (
    <main className={styles.page}>
      <Link href="/student/life-skills" className={styles.backLink}>
        ← Back to Explore Domains
      </Link>

      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>🌱 LIFE SKILLS · ENVIRONMENT</span>
          <h1>Environment & Cleanliness</h1>
          <p>
            Learn how small everyday choices can make our surroundings cleaner,
            healthier and more sustainable.
          </p>
        </div>

        <div className={styles.headerIcon}>🌍</div>
      </header>

      <section className={styles.challengeIntro}>
        <div>
          <span className={styles.pill}>🎮 INTERACTIVE CHALLENGE</span>
          <h2>Dustbin Hoop</h2>
          <p>
            Identify the garbage, choose the correct bin and score points by
            making the perfect virtual throw.
          </p>
        </div>

        <div className={styles.challengeStats}>
          <div>
            <strong>10</strong>
            <span>Rounds</span>
          </div>
          <div>
            <strong>+XP</strong>
            <span>Rewards</span>
          </div>
          <div>
            <strong>🌱</strong>
            <span>Eco Skill</span>
          </div>
        </div>
      </section>

      <DustbinHoopGame />
    </main>
  );
}