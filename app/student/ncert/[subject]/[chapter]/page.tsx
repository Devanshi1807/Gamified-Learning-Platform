import Link from "next/link";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { getChapterById } from "@/lib/db/subjects";
import ChapterLearningExperience from "./ChapterLearningExperience";
import styles from "./chapter.module.css";

interface PageProps {
  params: Promise<{
    subject: string;
    chapter: string;
  }>;
}

export default async function NCERTChapterPage({ params }: PageProps) {
  const { subject, chapter } = await params;

  const chapterNumber = Number(chapter);

  if (!Number.isInteger(chapterNumber)) {
    notFound();
  }

  const data = await getChapterById(subject, chapterNumber);

  if (!data) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link
          href={`/student/ncert/${subject}`}
          className={styles.backLink}
        >
          <ArrowLeft size={17} />
          Back to {data.subject.name}
        </Link>

        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.iconBox}>
              <BookOpen size={30} />
            </div>

            <div>
              <div className={styles.eyebrow}>
                <Sparkles size={14} />
                PERSONALIZED LEARNING PATH
              </div>

              <h1>
                Chapter {data.chapter.chapter_number}:{" "}
                {data.chapter.name}
              </h1>

              <p>
                {data.subject.name} · Class {data.subject.class_number}
              </p>
            </div>
          </div>
        </section>

        <ChapterLearningExperience
          chapterName={data.chapter.name}
        />
      </div>
    </main>
  );
}