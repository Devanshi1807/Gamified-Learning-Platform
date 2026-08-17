"use client";

import { useEffect, useState } from "react";
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
    </section>
  );
}