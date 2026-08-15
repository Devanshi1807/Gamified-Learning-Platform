import Link from "next/link";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaSchool,
  FaChartBar,
} from "react-icons/fa";

import styles from "./QuickActions.module.css";

const actions = [
  {
    name: "Add Teacher",
    description: "Register a new teacher",
    href: "/school/teachers/add",
    icon: FaChalkboardTeacher,
    variant: "teacher",
  },
  {
    name: "Add Student",
    description: "Register a new student",
    href: "/school/students/add",
    icon: FaUserGraduate,
    variant: "student",
  },
  {
    name: "Create Class",
    description: "Create a new class",
    href: "/school/classes/create",
    icon: FaSchool,
    variant: "class",
  },
  {
    name: "View Reports",
    description: "View school reports",
    href: "/school/reports",
    icon: FaChartBar,
    variant: "report",
  },
];

export default function QuickActions() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div>
          <h2>Quick Actions</h2>
          <p>Common school administration tasks.</p>
        </div>
      </div>

      <div className={styles.actionsGrid}>
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.name}
              href={action.href}
              className={`${styles.actionCard} ${
                styles[action.variant]
              }`}
            >
              <div className={styles.iconWrapper}>
                <Icon />
              </div>

              <div className={styles.actionContent}>
                <h3>{action.name}</h3>
                <p>{action.description}</p>
              </div>

              <span className={styles.arrow}>→</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}