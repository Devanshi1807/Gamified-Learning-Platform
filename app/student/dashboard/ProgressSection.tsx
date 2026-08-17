import Link from "next/link";

import styles from "./ProgressSection.module.css";

interface ChapterProgress {
  id: number;
  subject: string;
  name: string;
  progress: number;
}

interface ProgressSectionProps {
  chapters?: ChapterProgress[];
}

const defaultChapters: ChapterProgress[] = [
  {
    id: 1,
    subject: "Mathematics",
    name: "Rational Numbers",
    progress: 45,
  },
  {
    id: 2,
    subject: "Science",
    name: "Plants",
    progress: 54,
  },
  {
    id: 3,
    subject: "English",
    name: "Grammar",
    progress: 32,
  },
  {
    id: 4,
    subject: "Social Science",
    name: "The Constitution",
    progress: 72,
  },
  {
    id: 5,
    subject: "Mathematics",
    name: "Linear Equations",
    progress: 41,
  },
];

export default function ProgressSection({
  chapters = defaultChapters,
}: ProgressSectionProps) {
  const visibleChapters = chapters.slice(0, 4);

  if (visibleChapters.length === 0) {
    return null;
  }

  return (
    <section className={styles.container}>

      {/* HEADING */}
      <div className={styles.heading}>
        <div>
          <h2>Progress</h2>
          <p>Track your learning progress.</p>
        </div>

        {chapters.length > 4 && (
          <Link
            href="/student/progress"
            className={styles.viewAll}
          >
            View all
            <span>→</span>
          </Link>
        )}
      </div>


      {/* PROGRESS GRID */}
      <div className={styles.progressGrid}>
        {visibleChapters.map((chapter) => (
          <div
            key={chapter.id}
            className={styles.progressCard}
          >

            <div className={styles.cardTop}>
              <div>
                <span className={styles.subject}>
                  {chapter.subject}
                </span>

                <h3>{chapter.name}</h3>
              </div>

              <span className={styles.percentage}>
                {chapter.progress}%
              </span>
            </div>


            {/* PROGRESS BAR */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressValue}
                style={{
                  width: `${chapter.progress}%`,
                }}
              />
            </div>


            {/* BOTTOM */}
            <div className={styles.cardBottom}>
              <span className={styles.remaining}>
                {chapter.progress === 100
                  ? "Completed"
                  : `${100 - chapter.progress}% remaining`}
              </span>

              {chapter.progress < 100 && (
                <button className={styles.continueButton}>
                  Continue Learning
                  <span>→</span>
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}