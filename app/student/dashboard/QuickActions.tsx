import Link from "next/link";
import {
  FaPlayCircle,
  FaClipboardList,
  FaBolt,
  FaTrophy,
} from "react-icons/fa";

import styles from "./QuickActions.module.css";

const actions = [
  {
    label: "Join Today'\''s Class",
    Icon: FaPlayCircle,
    href: "/student/classes",
    color: "#2563eb",
    bg: "#eef5ff",
  },
  {
    label: "Submit Assignment",
    Icon: FaClipboardList,
    href: "/student/assignments",
    color: "#10b981",
    bg: "#ecfaf7",
  },
  {
    label: "Daily Challenge",
    Icon: FaBolt,
    href: "/student/challenges",
    color: "#f59e0b",
    bg: "#fff7ed",
  },
  {
    label: "View Leaderboard",
    Icon: FaTrophy,
    href: "/student/leaderboard",
    color: "#7c3aed",
    bg: "#f5f0ff",
  },
];

export default function QuickActions() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div>
          <h2>Quick Actions</h2>
          <p>Jump right in.</p>
        </div>
      </div>

      <div className={styles.grid}>
        {actions.map((action) => {
          const { Icon } = action;
          return (
            <Link key={action.label} href={action.href} className={styles.card}>
              <div
                className={styles.iconWrap}
                style={{ background: action.bg, color: action.color }}
              >
                <Icon />
              </div>

              <span className={styles.label}>{action.label}</span>

              <span className={styles.arrow} style={{ color: action.color }}>
                →
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
