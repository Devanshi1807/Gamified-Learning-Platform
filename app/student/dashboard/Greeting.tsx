"use client";

import { useEffect, useState } from "react";
import { FaBolt, FaStar, FaMedal, FaTrophy } from "react-icons/fa";
import styles from "./dashboard.module.css";

interface GreetingProps {
  studentName: string;
  className?: string;
  section?: string;
}

export default function Greeting({
  studentName,
  className = "Class 8",
  section = "Section A",
}: GreetingProps) {
  const [greeting, setGreeting] = useState("Good morning");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const stats = [
    { label: "Total XP",      value: "2,450", Icon: FaBolt,   color: "#f59e0b", bg: "#fff7ed" },
    { label: "Level",         value: "8",     Icon: FaStar,   color: "#7c3aed", bg: "#f5f0ff" },
    { label: "Badges Earned", value: "12",    Icon: FaMedal,  color: "#10b981", bg: "#ecfaf7" },
    { label: "Rank",          value: "#34",   Icon: FaTrophy, color: "#2563eb", bg: "#eef5ff" },
  ];

  return (
    <section className={styles.greeting}>
      <p className={styles.greetingLabel}>
        Student Dashboard
      </p>

      <h1>
        {greeting}, {studentName} 👋
      </h1>

      <p className={styles.studentClass}>
        {className} • {section}
      </p>

      {/* STATS ROW */}
      <div className={styles.statsRow}>
        {stats.map((stat) => {
          const { Icon } = stat;
          return (
            <div
              key={stat.label}
              className={styles.statCard}
              style={{ borderTopColor: stat.color }}
            >
              <div
                className={styles.statIconWrap}
                style={{ background: stat.bg, color: stat.color }}
              >
                <Icon />
              </div>

              <div className={styles.statValue}>{stat.value}</div>

              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}