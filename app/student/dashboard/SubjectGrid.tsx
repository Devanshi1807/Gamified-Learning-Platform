import Link from "next/link";
import {
  FaCheckCircle,
  FaMedal,
  FaClipboardList,
  FaPlayCircle,
  FaBookOpen,
} from "react-icons/fa";

import styles from "./SubjectGrid.module.css";

const activities = [
  {
    id: 1,
    Icon: FaCheckCircle,
    color: "#2563eb",
    bg: "#eef5ff",
    text: "Completed Quiz — Rational Numbers",
    subject: "Mathematics",
    time: "2 hours ago",
  },
  {
    id: 2,
    Icon: FaMedal,
    color: "#f59e0b",
    bg: "#fff7ed",
    text: "Earned Badge — Quick Learner",
    subject: "Achievement",
    time: "Yesterday",
  },
  {
    id: 3,
    Icon: FaClipboardList,
    color: "#10b981",
    bg: "#ecfaf7",
    text: "Submitted Assignment — Plants",
    subject: "Science",
    time: "2 days ago",
  },
  {
    id: 4,
    Icon: FaPlayCircle,
    color: "#f59e0b",
    bg: "#fff7ed",
    text: "Joined Live Class — Grammar",
    subject: "English",
    time: "3 days ago",
  },
  {
    id: 5,
    Icon: FaBookOpen,
    color: "#7c3aed",
    bg: "#f5f0ff",
    text: "Completed Chapter — The Constitution",
    subject: "Social Science",
    time: "4 days ago",
  },
];

export default function RecentActivity() {
  return (
    <section className={styles.container}>

      {/* HEADING */}
      <div className={styles.heading}>
        <div>
          <h2>Recent Activities</h2>
          <p>Your learning history.</p>
        </div>

        <Link href="/student/activities" className={styles.viewAll}>
          View all <span>→</span>
        </Link>
      </div>

      {/* ACTIVITY LIST */}
      <div className={styles.list}>
        {activities.map((item) => {
          const { Icon } = item;
          return (
            <div key={item.id} className={styles.item}>
              <div
                className={styles.iconWrap}
                style={{ background: item.bg, color: item.color }}
              >
                <Icon />
              </div>

              <div className={styles.itemContent}>
                <p className={styles.itemText}>{item.text}</p>
                <span className={styles.itemMeta}>
                  {item.subject} · {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}