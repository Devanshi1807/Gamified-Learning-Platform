import { notFound } from "next/navigation";

import Sidebar from "../../../../../../dashboard/Sidebar";
import { getModuleById } from "@/lib/db/subjects";

import styles from "./module.module.css";

import PatternDetectiveGame from "@/components/student/games/PatternDetectiveGame/PatternDetectiveGame";

import NumberSortingGame from "@/components/student/games/NumberSortingGame";
import NumberBuilderGame from "@/components/student/games/NumberBuilderGame";

import ScienceDetective from "@/components/student/games/Science/ScienceDetective/ScienceDetective";
import ObservationHunt from "@/components/student/games/Science/ObservationHunt/ObservationHunt";
import QuestionMaster from "@/components/student/games/Science/QuestionMaster/QuestionMaster";

import LivingWorldExplorer from "@/components/student/games/Science/DiversityLivingWorld/LivingWorldExplorer/LivingWorldExplorer";
import ClassificationQuest from "@/components/student/games/Science/DiversityLivingWorld/ClassificationQuest/ClassificationQuest";
import BiodiversityChallenge from "@/components/student/games/Science/DiversityLivingWorld/BiodiversityChallenge/BiodiversityChallenge";





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
  moduleId
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
               ) : module.game_type === "science-detective" ? (
                <ScienceDetective />
                ) : module.game_type === "observation-hunt" ? (
                <ObservationHunt />
                ) : module.game_type === "question-master" ? (
                <QuestionMaster />
                ) : module.game_type === "living-world-explorer" ? (
                 <LivingWorldExplorer />
                 ) : module.game_type === "classification-quest" ? (
                <ClassificationQuest />
                ) : module.game_type === "biodiversity-challenge" ? (
                <BiodiversityChallenge />
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
