import {
  UserPlus,
  UserRoundPlus,
  BookOpen,
  BarChart3,
  ArrowRight,
} from "lucide-react";

import styles from "./QuickActions.module.css";

export default function QuickActions() {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Quick Actions</h2>
        <p>Common school administration tasks</p>
      </div>

      <div className={styles.actions}>
        <button className={`${styles.action} ${styles.blue}`}>
          <div className={styles.actionIcon}>
            <UserPlus size={22} />
          </div>

          <div className={styles.actionText}>
            <strong>Add Teacher</strong>
            <span>Register a new teacher</span>
          </div>

          <ArrowRight size={20} />
        </button>

        <button className={`${styles.action} ${styles.green}`}>
          <div className={styles.actionIcon}>
            <UserRoundPlus size={22} />
          </div>

          <div className={styles.actionText}>
            <strong>Add Student</strong>
            <span>Register a new student</span>
          </div>

          <ArrowRight size={20} />
        </button>

        <button className={`${styles.action} ${styles.purple}`}>
          <div className={styles.actionIcon}>
            <BookOpen size={22} />
          </div>

          <div className={styles.actionText}>
            <strong>Create Class</strong>
            <span>Create a new class</span>
          </div>

          <ArrowRight size={20} />
        </button>

        <button className={`${styles.action} ${styles.navy}`}>
          <div className={styles.actionIcon}>
            <BarChart3 size={22} />
          </div>

          <div className={styles.actionText}>
            <strong>View Reports</strong>
            <span>View school reports</span>
          </div>

          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}