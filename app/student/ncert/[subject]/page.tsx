import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles, LayoutDashboard } from "lucide-react";
import { getSubjectByCode } from "@/lib/db/subjects";
import styles from "./subject.module.css";

interface PageProps {
  params: Promise<{
    subject: string;
  }>;
}

export default async function NCERTSubjectPage({ params }: PageProps) {
  const { subject } = await params;

  const subjectData = await getSubjectByCode(subject);

  if (!subjectData) {
    notFound();
  }

  const chapterCount = subjectData.chapters.length;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.navigationLinks}>
  <Link href="/student/dashboard" className={styles.dashboardLink}>
    <LayoutDashboard size={16} />
    Back to Dashboard
  </Link>

  <Link href="/student/ncert" className={styles.backLink}>
    <ArrowLeft size={18} />
    Back to NCERT
  </Link>
</div>

        <section className={styles.hero}>
          <div className={styles.heroIcon}>
            <BookOpen size={30} />
          </div>

          <div>
            <div className={styles.eyebrow}>
              <Sparkles size={15} />
              PERSONALIZED LEARNING PATH
            </div>

            <h1>{subjectData.name}</h1>

            <p>
              Class {subjectData.class_number}
              {subjectData.textbook_name
                ? ` · ${subjectData.textbook_name}`
                : ""}
            </p>
          </div>
        </section>

        <section className={styles.chapterSection}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Choose a Chapter</h2>
              <p>
                Explore your NCERT chapters and learn through interactive
                activities.
              </p>
            </div>

            <span className={styles.chapterCount}>
              {chapterCount} {chapterCount === 1 ? "Chapter" : "Chapters"}
            </span>
          </div>

          <div className={styles.chapterGrid}>
            {subjectData.chapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/student/ncert/${subjectData.code}/${chapter.chapter_number}`}
                className={styles.chapterCard}
              >
                <div className={styles.chapterNumber}>
                  {chapter.chapter_number}
                </div>

                <div className={styles.chapterContent}>
                  <span className={styles.chapterLabel}>
                    CHAPTER {chapter.chapter_number}
                  </span>

                  <h3>{chapter.name}</h3>

                  <span className={styles.explore}>
                    Start learning →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}