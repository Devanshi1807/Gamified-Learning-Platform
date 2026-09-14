"use client";

import Link from "next/link";
import styles from "./life-skills.module.css";

const domains = [
  {
    id: "personal-finance",
    icon: "💰",
    title: "Personal Finance & Investing",
    description:
      "Learn how money works, how to save, budget, and understand investing.",
    color: "purple",
    available: false,
  },
  {
    id: "health-wellness",
    icon: "❤️",
    title: "Health, Wellness & Well-being",
    description:
      "Build healthy habits and understand nutrition, fitness, hygiene, sleep and mental well-being.",
    color: "red",
    available: true,
  },
  {
    id: "constitution",
    icon: "⚖️",
    title: "Constitution, Basic Laws & Civic Sense",
    description:
      "Understand democracy, rights, laws, government and how citizens participate.",
    color: "purple",
    href: "/student/life-skills/constitution",
    available: true,
  },
  {
    id: "environment",
    icon: "🌱",
    title: "Environment & Cleanliness",
    description:
      "Explore sustainability, cleanliness, conservation and caring for our planet.",
    color: "green",
    href: "/student/life-skills/environment",
    available: true,
  },
  {
    id: "moral-education",
    icon: "🧭",
    title: "Moral Education",
    description:
      "Develop values, empathy, responsibility, honesty and good decision-making.",
    color: "orange",
    available: false,
  },
];

export default function LifeSkillsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/student/dashboard" className={styles.back}>
          ← Back to Dashboard
        </Link>

        <header className={styles.header}>
          <span className={styles.eyebrow}>BEYOND NCERT</span>
          <h1>Explore Domains</h1>
          <p>
            Discover practical knowledge and life skills that help you learn
            beyond the classroom.
          </p>
        </header>

        <section className={styles.grid}>
          {domains.map((domain) => (
            <Link
              key={domain.id}
              href={
                domain.available ? `/student/life-skills/${domain.id}` : "#"
              }
              className={`${styles.card} ${styles[domain.color]}`}
              onClick={(e) => {
                if (!domain.available) e.preventDefault();
              }}
            >
              <div className={styles.icon}>{domain.icon}</div>

              <div className={styles.cardContent}>
                <h2>{domain.title}</h2>
                <p>{domain.description}</p>
              </div>

              <div className={styles.footer}>
                {domain.available ? (
                  <span>Explore →</span>
                ) : (
                  <span>Content coming soon</span>
                )}
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
