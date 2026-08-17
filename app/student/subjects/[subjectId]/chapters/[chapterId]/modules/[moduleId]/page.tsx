import { notFound } from "next/navigation";

import Sidebar from "../../../../../../dashboard/Sidebar";
import { getModuleById } from "@/lib/db/subjects";

import styles from "./module.module.css";

import PatternDetectiveGame from "@/components/student/games/PatternDetectiveGame/PatternDetectiveGame";

import NumberSortingGame from "@/components/student/games/NumberSortingGame";
import NumberBuilderGame from "@/components/student/games/NumberBuilderGame";

export default async function ModulePage({
  params,
}: {
  params: Promise<{
    subjectId: string;
    chapterId: string;
    moduleId: string;
  }>;
}) {
  const { subjectId, chapterId, moduleId } = await params;

  const module = await getModuleById(
    subjectId,
    Number(chapterId),
    Number(moduleId),
  );

  if (!module) {
    notFound();
  }

  return (
    <>
      <Sidebar />

      <main className={styles.page}>
        <div className={styles.content}>
          {/* BREADCRUMB */}

          <div className={styles.breadcrumb}>
            {module.subject_name}

            <span>›</span>

            {module.chapter_name}
          </div>

          {/* HEADER */}

          <section className={styles.header}>
            <span className={styles.moduleLabel}>
              MODULE {module.module_number}
            </span>

            <h1>{module.module_name}</h1>

            <p>{module.description}</p>
          </section>

          {/* GAME */}

          {module.game_type === "pattern-discovery" ? (
            <PatternDetectiveGame />
          ) : module.game_type === "number-builder" ? (
            <NumberBuilderGame />
          ) : module.game_type === "number-sorting" ? (
            <NumberSortingGame />
          ) : (
            <div className={styles.gameCard}>
              <h2>Game coming soon 🎮</h2>
              <p>This learning game is currently being developed.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
