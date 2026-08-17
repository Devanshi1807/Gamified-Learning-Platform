import Link from "next/link";
import {
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaGlobeAsia,
  FaLanguage,
} from "react-icons/fa";

import styles from "./SubjectGrid.module.css";

interface Subject {
  id: number;
  name: string;
  chapters: number;
  icon: React.ElementType;
  theme: string;
}

interface SubjectGridProps {
  subjects?: Subject[];
}

const defaultSubjects: Subject[] = [
  {
    id: 1,
    name: "English",
    chapters: 12,
    icon: FaLanguage,
    theme: "english",
  },
  {
    id: 2,
    name: "Mathematics",
    chapters: 14,
    icon: FaCalculator,
    theme: "mathematics",
  },
  {
    id: 3,
    name: "Science",
    chapters: 11,
    icon: FaFlask,
    theme: "science",
  },
  {
    id: 4,
    name: "Social Science",
    chapters: 10,
    icon: FaGlobeAsia,
    theme: "socialScience",
  },
];

export default function SubjectGrid({
  subjects = defaultSubjects,
}: SubjectGridProps) {
  return (
    <section className={styles.container}>

      {/* HEADING */}
      <div className={styles.heading}>
        <div>
          <h2>Subjects</h2>
          <p>Explore your subjects and continue learning.</p>
        </div>
      </div>


      {/* SUBJECT GRID */}
      <div className={styles.grid}>
        {subjects.map((subject) => {
          const Icon = subject.icon;

          return (
            <Link
              key={subject.id}
              href={`/student/subjects/${subject.id}`}
              className={`${styles.card} ${styles[subject.theme]}`}
            >
              <div className={styles.iconWrapper}>
                <Icon />
              </div>

              <div className={styles.cardContent}>
                <h3>{subject.name}</h3>

                <p>
                  {subject.chapters} Chapters
                </p>
              </div>

              <span className={styles.arrow}>
                →
              </span>
            </Link>
          );
        })}
      </div>

    </section>
  );
}