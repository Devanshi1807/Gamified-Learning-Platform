import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Globe2,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import styles from "./ncert.module.css";

const subjects = [
  {
    name: "Science",
    code: "science",
    icon: BookOpen,
    description:
      "Explore concepts through stories, interactive activities and practice.",
  },
  {
    name: "Mathematics",
    code: "mathematics",
    icon: Calculator,
    description:
      "Build strong mathematical thinking through guided learning and challenges.",
  },
  {
    name: "Social Science",
    code: "social-science",
    icon: Globe2,
    description:
      "Understand society, history, geography and civics through engaging learning.",
  },
];

export default function NCERTPage() {
  return (
    <>
      <main className={styles.page}>
        <div className={styles.container}>
          <Link href="/student/dashboard" className={styles.dashboardLink}>
            <LayoutDashboard size={16} />
            Back to Dashboard
          </Link>
          <section className={styles.hero}>
            <div className={styles.heroBadge}>
              <Sparkles size={16} />
              NCERT LEARNING HUB
            </div>

            <h1>
              Learn your NCERT chapters
              <br />
              <span>in a more interactive way.</span>
            </h1>

            <p>
              Choose a subject and explore chapter-wise learning designed to
              make your studies more engaging, active and personalized.
            </p>
          </section>

          <section className={styles.subjectSection}>
            <div className={styles.sectionHeader}>
              <h2>Choose Your Subject</h2>
              <p>Select a subject to explore its NCERT chapters.</p>
            </div>

            <div className={styles.subjectGrid}>
              {subjects.map((subject) => {
                const Icon = subject.icon;

                return (
                  <Link
                    key={subject.code}
                    href={`/student/ncert/${subject.code}`}
                    className={styles.subjectCard}
                  >
                    <div className={styles.iconBox}>
                      <Icon size={28} />
                    </div>

                    <h3>{subject.name}</h3>

                    <p>{subject.description}</p>

                    <span className={styles.explore}>Explore Chapters →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
