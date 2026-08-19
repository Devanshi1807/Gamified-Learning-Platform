import {
  UserPlus,
  Megaphone,
  GraduationCap,
} from "lucide-react";

import styles from "./RecentActivity.module.css";

export default function RecentActivity() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Recent Activity</h2>
          <p>Recent changes made in your school</p>
        </div>

        <button className={styles.viewAll}>
          View all
        </button>
      </div>

      <div className={styles.activities}>
        <div className={styles.activity}>
          <div className={`${styles.icon} ${styles.blue}`}>
            <UserPlus size={18} />
          </div>

          <div className={styles.activityText}>
            <strong>
              New teacher Rahul Sharma added
            </strong>

            <span>10 minutes ago</span>
          </div>
        </div>

        <div className={styles.activity}>
          <div className={`${styles.icon} ${styles.green}`}>
            <Megaphone size={18} />
          </div>

          <div className={styles.activityText}>
            <strong>
              New announcement published
            </strong>

            <span>1 hour ago</span>
          </div>
        </div>

        <div className={styles.activity}>
          <div className={`${styles.icon} ${styles.purple}`}>
            <GraduationCap size={18} />
          </div>

          <div className={styles.activityText}>
            <strong>
              25 new students registered
            </strong>

            <span>Yesterday</span>
          </div>
        </div>
      </div>
    </section>
  );
}