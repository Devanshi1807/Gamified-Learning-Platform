"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import styles from "./chapter.module.css";

interface ChapterLearningExperienceProps {
  chapterName: string;
}

const steps = [
  {
    number: "01",
    type: "DISCOVER",
    title: "Meet the Concept",
    description:
      "Start by exploring the central idea of this chapter through a short guided introduction.",
    action: "Start Exploring",
  },
  {
    number: "02",
    type: "THINK",
    title: "Observe & Predict",
    description:
      "Look at a situation, make your prediction, and then compare it with what actually happens.",
    action: "Make a Prediction",
  },
  {
    number: "03",
    type: "APPLY",
    title: "Take the Challenge",
    description:
      "Use what you have learned to solve a small real-world challenge based on the chapter.",
    action: "Try the Challenge",
  },
  {
    number: "04",
    type: "CHECK",
    title: "Check Your Understanding",
    description:
      "Finish with a few quick questions to see which concepts you have mastered.",
    action: "Start Check",
  },
];

export default function ChapterLearningExperience({
  chapterName,
}: ChapterLearningExperienceProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  const current = steps[activeStep];

  function completeStep() {
    setCompleted((previous) =>
      previous.includes(activeStep)
        ? previous
        : [...previous, activeStep],
    );

    if (activeStep < steps.length - 1) {
      setActiveStep((previous) => previous + 1);
    }
  }

  return (
    <section className={styles.learningExperience}>
      <div className={styles.learningHeader}>
        <div>
          <div className={styles.pathBadge}>
            <Sparkles size={14} />
            YOUR LEARNING PATH
          </div>

          <h2>Learn {chapterName} your way</h2>

          <p>
            This chapter is organised into small interactive steps so you can
            learn, think, apply and then check your understanding.
          </p>
        </div>

        <div className={styles.progressBox}>
          <strong>
            {completed.length}/{steps.length}
          </strong>
          <span>completed</span>
        </div>
      </div>

      <div className={styles.stepRow}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isComplete = completed.includes(index);

          return (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`${styles.stepButton} ${
                isActive ? styles.stepButtonActive : ""
              } ${isComplete ? styles.stepButtonComplete : ""}`}
            >
              <span className={styles.stepNumber}>
                {isComplete ? <CheckCircle2 size={18} /> : step.number}
              </span>

              <span>
                <small>{step.type}</small>
                <strong>{step.title}</strong>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.activityPanel}>
        <div className={styles.activityMeta}>
          STEP {current.number} · {current.type}
        </div>

        <h3>{current.title}</h3>

        <p>{current.description}</p>

        <div className={styles.activityPlaceholder}>
          <Sparkles size={24} />

          <strong>Interactive activity</strong>

          <span>
            This is where the chapter-specific activity will appear.
          </span>

          <span className={styles.prototypeNote}>
            Prototype content · ready to be replaced by generated learning
            content later.
          </span>
        </div>

        <button
          type="button"
          className={styles.continueButton}
          onClick={completeStep}
        >
          {activeStep === steps.length - 1
            ? "Complete Learning Path"
            : current.action}

          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}