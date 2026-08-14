import {
  IconType,
} from "react-icons";

import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: IconType;
  variant: "teachers" | "students" | "classes";
}

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  variant,
}: StatCardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.topRow}>
        <div className={styles.iconWrapper}>
          <Icon />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>

        <h2>{value}</h2>

        <p className={styles.description}>
          {description}
        </p>
      </div>
    </div>
  );
}