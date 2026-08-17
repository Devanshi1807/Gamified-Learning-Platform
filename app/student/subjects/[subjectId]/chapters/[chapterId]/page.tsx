import { notFound } from "next/navigation";

import Sidebar from "../../../../dashboard/Sidebar";
import { getChapterById } from "@/lib/db/subjects";

import styles from "./chapter.module.css";
import Link from "next/link";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{
    subjectId: string;
    chapterId: string;
  }>;
}) {
  const { subjectId, chapterId } = await params;

  const result = await getChapterById(
    subjectId,
    Number(chapterId)
  );

  if (!result) {
    notFound();
  }

  const { subject, chapter, modules } = result;

  return (
    <>
      <Sidebar />

      <main className={styles.page}>
        <div className={styles.content}>

          {/* HEADER */}

          <div className={styles.header}>
            <p className={styles.subject}>
              {subject.name}
            </p>

            <h1>{chapter.name}</h1>

            <p className={styles.description}>
              Continue your learning journey through
              interactive modules.
            </p>
          </div>


          {/* PROGRESS */}

          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <div>
                <span>Your Progress</span>

                <strong>0%</strong>
              </div>
            </div>

            <div className={styles.progressBar}>
              <div
                className={styles.progressValue}
                style={{
                  width: "0%",
                }}
              />
            </div>
          </div>


          {/* MODULES */}

          <section className={styles.modulesSection}>
            <div className={styles.sectionHeading}>
              <h2>Learning Modules</h2>

              <p>
                Complete each module to master this
                chapter.
              </p>
            </div>

            <div className={styles.moduleList}>

              {modules.length === 0 ? (
                <div className={styles.emptyState}>
                  <h3>
                    Modules coming soon
                  </h3>

                  <p>
                    Interactive learning modules for
                    this chapter are being prepared.
                  </p>
                </div>
              ) : (
                modules.map((module, index) => (
                  <Link
                    key={module.id}
                    href={`/student/subjects/${subject.code}/chapters/${chapter.id}/modules/${module.id}`}
                    className={styles.moduleCard}
                  >
                    <div className={styles.moduleNumber}>
                      {index + 1}
                    </div>

                    <div className={styles.moduleContent}>
                      <span className={styles.moduleLabel}>
                        MODULE {index + 1}
                      </span>

                      <h3>{module.name}</h3>

                      <p>
                        {module.description}
                      </p>
                    </div>

                    <div className={styles.moduleStatus}>
                      <span className={styles.continue}>
                        Start →
                      </span>
                    </div>
                  </Link>
                ))
              )}

            </div>
          </section>

        </div>
      </main>
    </>
  );
}