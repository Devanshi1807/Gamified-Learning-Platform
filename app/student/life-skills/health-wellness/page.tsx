"use client";

import Link from "next/link";
import styles from "./health-wellness.module.css";

const topics = [
  {
    id: "healthy-eating",
    icon: "🥗",
    title: "Healthy Eating & Nutrition",
    description: "Learn how balanced food choices fuel your body and mind.",
  },
  {
    id: "junk-food",
    icon: "🍔",
    title: "Junk Food & Its Effects",
    description: "Understand how excessive junk food can affect your health.",
  },
  {
    id: "physical-fitness",
    icon: "🏃",
    title: "Physical Fitness",
    description: "Discover simple ways to keep your body active and strong.",
  },
  {
    id: "mental-health",
    icon: "🧠",
    title: "Mental Health",
    description: "Learn about emotions, stress, self-care and mental well-being.",
  },
  {
    id: "diseases-prevention",
    icon: "🩺",
    title: "Common Diseases & Prevention",
    description: "Understand common illnesses and healthy prevention habits.",
  },
  {
    id: "personal-hygiene",
    icon: "🧼",
    title: "Personal Hygiene",
    description: "Build everyday habits that help keep you clean and healthy.",
  },
  {
    id: "sleep-habits",
    icon: "😴",
    title: "Sleep & Healthy Habits",
    description: "Understand why good sleep and routines matter.",
  },
];

export default function HealthWellnessPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/student/life-skills" className={styles.back}>
          ← Back to Explore Domains
        </Link>

        <header className={styles.header}>
          <span className={styles.eyebrow}>LIFE SKILLS</span>

          <h1>Health, Wellness & Well-being ❤️</h1>

          <p>
            Explore practical knowledge that can help you make healthier
            choices and build positive everyday habits.
          </p>
        </header>

        <section className={styles.grid}>
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/student/life-skills/health-wellness/${topic.id}`}
              className={styles.card}
            >
              <div className={styles.icon}>{topic.icon}</div>

              <div>
                <h2>{topic.title}</h2>
                <p>{topic.description}</p>
              </div>

              <span className={styles.arrow}>Explore →</span>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}