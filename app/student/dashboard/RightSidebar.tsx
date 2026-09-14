import { FaBolt, FaComments } from "react-icons/fa";

import styles from "./RightSidebar.module.css";

interface RightSidebarProps {
  studentName?: string;
  studentId?: string;
  className?: string;
  section?: string;
  xp?: number;
  nextLevelXp?: number;
  level?: number;
}

export default function RightSidebar({
  studentName = "Akshat",
  studentId = "STU001",
  className = "Class 8",
  section = "Section A",
  xp = 2450,
  nextLevelXp = 3000,
  level = 8,
}: RightSidebarProps) {
  const xpPercent = Math.min((xp / nextLevelXp) * 100, 100);

  const initials = studentName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className={styles.sidebar}>

      {/* STUDENT PROFILE CARD */}
      <section className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>{initials}</div>

          <div className={styles.profileInfo}>
            <h2>{studentName}</h2>
            <p>{className} • {section}</p>
            <span className={styles.studentId}>{studentId}</span>
          </div>
        </div>

        <div className={styles.xpSection}>
          <div className={styles.xpHeader}>
            <span className={styles.xpLabel}>
              <FaBolt className={styles.boltIcon} />
              Level {level} · {xp.toLocaleString()} XP
            </span>
            <span className={styles.xpTarget}>
              {nextLevelXp.toLocaleString()} XP
            </span>
          </div>

          <div className={styles.xpBar}>
            <div
              className={styles.xpFill}
              style={{ width: `${xpPercent}%` }}
            />
          </div>

          <p className={styles.xpHint}>
            {(nextLevelXp - xp).toLocaleString()} XP to Level {level + 1}
          </p>
        </div>
      </section>

      {/* NEED HELP CARD */}
      <section className={styles.helpCard}>
        <div className={styles.helpIcon}>
          <FaComments />
        </div>

        <div className={styles.helpContent}>
          <h2>Need Help?</h2>

          <p>
            Got a doubt? Ask our AI tutor and get instant, personalised help.
          </p>

          <button className={styles.chatButton}>
            Start Chat
            <span>→</span>
          </button>
        </div>
      </section>

    </aside>
  );
}
