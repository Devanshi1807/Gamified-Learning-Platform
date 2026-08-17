import { notFound } from "next/navigation";

import Sidebar from "../../dashboard/Sidebar";
import { getSubjectByCode } from "@/lib/db/subjects";
import styles from "./subject.module.css";
import Link from "next/link";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;

  const subject = await getSubjectByCode(subjectId);

  if (!subject) {
    notFound();
  }

  return (
    <>
      <Sidebar />

      <main className={styles.page}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>{subject.name}</h1>

            <p>
  Class 6 · {subject.textbook_name}
</p>

            <h2>Chapters</h2>
          </div>

          <div className={styles.chapterList}>
            {subject.chapters.map((chapter) => (
              <div key={chapter.id} className={styles.chapterCard}>
                <h3>
                  {chapter.chapter_number}. {chapter.name}
                </h3>

                <p>Start learning this chapter</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
