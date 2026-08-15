import {
  FaChalkboardTeacher,
  FaBullhorn,
  FaUserGraduate,
} from "react-icons/fa";

import styles from "./RecentActivity.module.css";

const activities = [
  {
    id: 1,
    type: "teacher",
    title: "New teacher Rahul Sharma added",
    time: "10 minutes ago",
  },
  {
    id: 2,
    type: "announcement",
    title: "New announcement published",
    time: "1 hour ago",
  },
  {
    id: 3,
    type: "student",
    title: "25 new students registered",
    time: "Yesterday",
  },
];

export default function RecentActivity() {
  return (
    <section className={styles.container}>
      <div className={styles.heading}>
        <div>
          <h2>Recent Activity</h2>
          <p>
            Recent changes made in your school.
          </p>
        </div>

        <button className={styles.viewAll}>
          View all
        </button>
      </div>

      <div className={styles.activityList}>
        {activities.map((activity) => {
          let Icon = FaChalkboardTeacher;

          if (activity.type === "announcement") {
            Icon = FaBullhorn;
          }

          if (activity.type === "student") {
            Icon = FaUserGraduate;
          }

          return (
            <div
              className={styles.activityItem}
              key={activity.id}
            >
              <div
                className={`${styles.iconWrapper} ${
                  styles[activity.type]
                }`}
              >
                <Icon />
              </div>

              <div className={styles.activityContent}>
                <p>{activity.title}</p>
                <span>{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}