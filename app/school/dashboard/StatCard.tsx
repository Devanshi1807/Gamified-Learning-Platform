import {
  UsersRound,
  GraduationCap,
  BookOpen,
  TrendingUp,
} from "lucide-react";

import styles from "./StatCard.module.css";

interface StatCardProps {
  type: "teachers" | "students" | "classes";
  title: string;
  value: string;
  description: string;
}

export default function StatCard({
  type,
  title,
  value,
  description,
}: StatCardProps) {
  const icons = {
    teachers: UsersRound,
    students: GraduationCap,
    classes: BookOpen,
  };

  const Icon = icons[type];

  return (
    <div className={`${styles.card} ${styles[type]}`}>
      <div className={styles.iconBox}>
        <Icon size={28} strokeWidth={2.2} />
      </div>

      <div className={styles.details}>
        <span className={styles.title}>{title}</span>

        <strong className={styles.value}>{value}</strong>

        <span className={styles.description}>
          {description}
        </span>
      </div>

      <div className={styles.trend}>
        <TrendingUp size={17} />
      </div>
    </div>
  );
}