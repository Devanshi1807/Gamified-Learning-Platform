import Link from "next/link";
import {
  FaCalculator,
  FaFlask,
  FaGlobeAsia,
  FaLanguage,
} from "react-icons/fa";

import styles from "./ProgressSection.module.css";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    chapters: 14,
    progress: 45,
    Icon: FaCalculator,
    color: "#2563eb",
    bg: "#eef5ff",
    href: "/student/subjects/1",
  },
  {
    id: 2,
    name: "Science",
    chapters: 11,
    progress: 60,
    Icon: FaFlask,
    color: "#10b981",
    bg: "#ecfaf7",
    href: "/student/subjects/2",
  },
  {
    id: 3,
    name: "Social Science",
    chapters: 10,
    progress: 30,
    Icon: FaGlobeAsia,
    color: "#7c3aed",
    bg: "#f5f0ff",
    href: "/student/subjects/3",
  },
  {
    id: 4,
    name: "English",
    chapters: 12,
    progress: 72,
    Icon: FaLanguage,
    color: "#f59e0b",
    bg: "#fff7ed",
    href: "/student/subjects/4",
  },
];

export default function SubjectCards() {
  return (
    <section className={styles.container}>

      {/* HEADING */}
      <div className={styles.heading}>
        <div>
          <h2>Your Subjects</h2>
          <p>Continue where you left off.</p>
        </div>
      </div>

      {/* SUBJECT GRID */}
      <div className={styles.grid}>
        {subjects.map((subject) => {
          const { Icon } = subject;
          return (
            <Link
              key={subject.id}
              href={subject.href}
              className={styles.card}
            >
              {/* TOP ROW */}
              <div className={styles.cardTop}>
                <div
                  className={styles.iconWrap}
                  style={{ background: subject.bg, color: subject.color }}
                >
                  <Icon />
                </div>

                <span
                  className={styles.pct}
                  style={{ color: subject.color }}
                >
                  {subject.progress}%
                </span>
              </div>

              {/* INFO */}
              <div className={styles.info}>
                <h3>{subject.name}</h3>
                <p>{subject.chapters} Chapters</p>
              </div>

              {/* PROGRESS BAR */}
              <div className={styles.bar}>
                <div
                  className={styles.fill}
                  style={{
                    width: `${subject.progress}%`,
                    background: subject.color,
                  }}
                />
              </div>

              {/* BOTTOM */}
              <div className={styles.cardBottom}>
                <span className={styles.remaining}>
                  {100 - subject.progress}% remaining
                </span>

                <span
                  className={styles.continueBtn}
                  style={{ color: subject.color }}
                >
                  Continue →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

    </section>
  );
}