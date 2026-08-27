"use client";

import { useState } from "react";
import styles from "./ScienceChapter1.module.css";

type Question = {
  visual: string[];
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const questions: Question[] = [
  {
    visual: ["🌱", "☀️", "💧"],
    question: "Riya sees a plant growing towards sunlight. What should a curious scientist do first?",
    options: [
      "Observe the plant carefully",
      "Immediately cut the plant",
      "Ignore what is happening",
      "Guess without observing",
    ],
    answer: 0,
    explanation:
      "Science begins with careful observation. A scientist notices what is happening before trying to explain it.",
  },

  {
    visual: ["🔍", "🪨", "🍃", "🪵"],
    question: "You find a strange object while exploring outside. Which action shows scientific thinking?",
    options: [
      "Look at it carefully and ask questions",
      "Throw it away immediately",
      "Make a random guess",
      "Ignore it",
    ],
    answer: 0,
    explanation:
      "Scientists observe things carefully and ask questions to understand them better.",
  },

  {
    visual: ["❓", "🌧️", "☁️"],
    question: "You notice that it is raining. Which is a scientific question?",
    options: [
      "Why does rain happen?",
      "Rain is boring.",
      "I don't care about rain.",
      "Rain looks nice.",
    ],
    answer: 0,
    explanation:
      "A scientific question helps us investigate and understand something we observe.",
  },

  {
    visual: ["🧪", "💧", "🧽"],
    question:
      "You want to know which material absorbs more water. What should you do?",
    options: [
      "Test different materials",
      "Choose an answer randomly",
      "Avoid doing an experiment",
      "Only look at the materials",
    ],
    answer: 0,
    explanation:
      "Testing different materials allows us to compare their water absorption.",
  },

  {
    visual: ["👀", "🧠", "💡"],
    question: "Which sequence best represents scientific thinking?",
    options: [
      "Observe → Ask → Investigate → Learn",
      "Guess → Ignore → Forget",
      "Ignore → Guess → Stop",
      "Copy → Guess → Stop",
    ],
    answer: 0,
    explanation:
      "Scientists observe, ask questions, investigate and use evidence to learn.",
  },
];

export default function ScienceChapter1() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      const bonus = streak >= 2 ? 25 : 0;

      setXp((prev) => prev + 50 + bonus);
      setStreak((prev) => prev + 1);
    } else {
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
    }
  }

  function nextQuestion() {
    if (lives <= 0) {
      setFinished(true);
      return;
    }

    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setLives(3);
    setXp(0);
    setStreak(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className={styles.result}>
        <div className={styles.trophy}>🏆</div>

        <h2>Science Mission Complete!</h2>

        <p>
          Great work, young scientist! You completed the first
          Science Detective mission.
        </p>

        <div className={styles.stats}>
          <div>
            <span>⭐</span>
            <strong>{xp}</strong>
            <small>XP</small>
          </div>

          <div>
            <span>❤️</span>
            <strong>{lives}</strong>
            <small>Lives</small>
          </div>

          <div>
            <span>🔥</span>
            <strong>{streak}</strong>
            <small>Streak</small>
          </div>
        </div>

        <button className={styles.restart} onClick={restart}>
          🔄 Play Again
        </button>
      </div>
    );
  }

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className={styles.game}>
      {/* TOP BAR */}

      <div className={styles.topBar}>
        <div className={styles.stat}>⭐ {xp} XP</div>

        <div className={styles.stat}>
          {"❤️".repeat(lives)}
          {"🖤".repeat(3 - lives)}
        </div>

        <div className={styles.stat}>🔥 {streak}</div>
      </div>

      {/* MISSION */}

      <div className={styles.mission}>
        <span>🔬 SCIENCE DETECTIVE</span>

        <h2>The Wonderful World of Science</h2>

        <p>
          Observe carefully, think like a scientist and solve the mystery!
        </p>
      </div>

      {/* PROGRESS */}

      <div className={styles.progressSection}>
        <div className={styles.progressText}>
          <span>
            Mission {current + 1} / {questions.length}
          </span>

          <span>{Math.round(progress)}%</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* VISUAL */}

      <div className={styles.visualCard}>
        <div className={styles.visualObjects}>
          {question.visual.map((item, index) => (
            <div className={styles.visualObject} key={index}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* QUESTION */}

      <div className={styles.questionCard}>
        <span className={styles.label}>🧠 DETECTIVE CHALLENGE</span>

        <h3>{question.question}</h3>

        <div className={styles.options}>
          {question.options.map((option, index) => {
            let optionClass = styles.option;

            if (selected !== null) {
              if (index === question.answer) {
                optionClass += ` ${styles.correct}`;
              } else if (index === selected) {
                optionClass += ` ${styles.wrong}`;
              }
            }

            return (
              <button
                key={option}
                className={optionClass}
                onClick={() => handleAnswer(index)}
                disabled={selected !== null}
              >
                <span className={styles.letter}>
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            );
          })}
        </div>

        {/* FEEDBACK */}

        {selected !== null && (
          <div
            className={
              selected === question.answer
                ? styles.correctFeedback
                : styles.wrongFeedback
            }
          >
            {selected === question.answer ? (
              <>
                <h4>🎉 Excellent Scientist!</h4>
                <p>
                  +50 XP
                  {streak >= 3 && " 🔥 Streak Bonus!"}
                </p>
              </>
            ) : (
              <>
                <h4>💡 Keep Investigating!</h4>
                <p>{question.explanation}</p>
              </>
            )}
          </div>
        )}

        {/* NEXT */}

        {selected !== null && (
          <button className={styles.next} onClick={nextQuestion}>
            {current === questions.length - 1
              ? "🏆 Complete Mission"
              : "Continue →"}
          </button>
        )}
      </div>
    </div>
  );
}