
"use client";

import { useState } from "react";
import styles from "./ScienceDetective.module.css";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  visual?: string[];
};

const questions: Question[] = [
{
    question:
      "Why is evidence important in science?",
    options: [
      "It allows scientists to avoid experiments",
      "It replaces observation",
      "It makes guessing more accurate",
      "It helps support a scientific explanation",
    ],
    answer: 3,
    explanation:
      "Evidence collected from observations and investigations helps scientists support or improve their explanations.",
  },

  {
    question:
      "Which of the following is the most important starting point of scientific investigation?",
    options: [
      "Observation",
      "Guessing",
      "Memorising",
      "Copying",
    ],
    answer: 0,
    explanation:
      "Observation helps us collect information about the world around us and leads us towards scientific questions.",
  },

   {
    question:
      "Which quality is especially useful for learning science?",
    options: [
      "Curiosity",
      "Carelessness",
      "Fear of questions",
      "Avoiding experiments",
    ],
    answer: 0,
    explanation:
      "Curiosity encourages us to ask questions, investigate and learn about the world around us.",
  },

  {
    question:
      "Why do scientists make observations carefully?",
    options: [
      "To avoid asking questions",
      "To make random guesses",
      "To finish an experiment without thinking",
      "To collect useful information and evidence",
    ],
    answer: 3,
    explanation:
      "Careful observations provide information and evidence that can be used during scientific investigation.",
  },

  {
    visual: ["🪴", "☀️", "💧"],
    question:
      "A student wants to investigate whether sunlight affects plant growth. Which is the best approach?",
    options: [
      "Plan an investigation and compare plant growth",
      "Guess the answer without observing",
      "Observe only one plant for a few seconds",
      "Change the result after the experiment",
    ],
    answer: 0,
    explanation:
      "A scientific investigation involves planning, observing and collecting evidence before reaching a conclusion.",
  },

  {
    question:
      "Which quality encourages a person to ask questions and explore the world around them?",
    options: [
      "Curiosity",
      "Carelessness",
      "Laziness",
      "Fear of questions",
    ],
    answer: 0,
    explanation:
      "Curiosity is an important part of science because it encourages us to ask questions and investigate.",
  },

  {
    question:
      "Two students get different results during an investigation. What should they do?",
    options: [
      "Immediately decide that one student is wrong",
      "Compare their methods and observations",
      "Delete both results",
      "Stop the investigation",
    ],
    answer: 1,
    explanation:
      "Scientists compare methods, observations and evidence to understand why results may differ.",
  },

  {
    question:
      "A scientist gets an unexpected result during an investigation. What should the scientist do?",
    options: [
      "Study the result and investigate why it happened",
      "Delete the result",
      "Change the result",
      "Ignore it completely",
    ],
    answer: 0,
    explanation:
      "Unexpected observations can be useful because they may lead to new questions and investigations.",
  },

  {
    question:
      "Which sequence best represents scientific thinking?",
    options: [
      "Guess → Ignore → Stop",
       "Observe → Ask → Investigate → Learn",
      "Copy → Guess → Forget",
      "Ignore → Conclude → Observe",
    ],
    answer: 1,
    explanation:
      "Scientific thinking involves observation, questioning, investigation and learning from evidence.",
  },

  {
    visual: ["🥄", "☕", "🔥"],
    question:
      "A metal spoon becomes hot when kept in hot tea. Which question can be investigated scientifically?",
    options: [
      "Which spoon looks beautiful?",
      "Why do people like spoons?",
       "How does heat travel through the spoon?",
      "Is the spoon expensive?",
    ],
    answer: 2,
    explanation:
      "The transfer of heat through a material is a phenomenon that can be observed and investigated scientifically.",
  },

  

  {
    visual: ["👀", "❓", "🧠", "🔬"],
    question:
      "Which statement best describes the role of science in our lives?",
    options: [
      "Science helps us understand the natural world through observation and investigation",
      "Science is only about memorising textbook answers",
      "Science is based entirely on guesses",
      "Science does not require questions",
    ],
    answer: 0,
    explanation:
      "Science helps us understand the natural world by observing, asking questions, investigating and using evidence.",
  },
];

export default function ScienceDetective() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      const newStreak = streak + 1;

      setXp((prev) => prev + 100);
      setStreak(newStreak);

      if (newStreak > bestStreak) {
        setBestStreak(newStreak);
      }
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
    setBestStreak(0);
    setFinished(false);
  }

  if (finished) {
    const correctAnswers = xp / 100;

    const accuracy = Math.round(
      (correctAnswers / questions.length) * 100
    );

    return (
      <div className={styles.result}>
        <div className={styles.trophy}>🏆</div>

        <span className={styles.completeBadge}>
          🔬 MISSION COMPLETE
        </span>

        <h2>Science Detective Completed!</h2>

        <p>
          Great work, young scientist! You completed
          Chapter 1 and tested your scientific thinking.
        </p>

        <div className={styles.stats}>
          <div>
            <span>⭐</span>
            <strong>{xp}</strong>
            <small>XP Earned</small>
          </div>

          <div>
            <span>🎯</span>
            <strong>{accuracy}%</strong>
            <small>Accuracy</small>
          </div>

          <div>
            <span>🔥</span>
            <strong>{bestStreak}</strong>
            <small>Best Streak</small>
          </div>
        </div>

        <div className={styles.finalMessage}>
          {accuracy >= 80
            ? "🌟 Excellent! You are thinking like a real scientist."
            : accuracy >= 50
            ? "👏 Good work! Keep practising to improve your scientific thinking."
            : "💪 Keep investigating! Practice will make you stronger."}
        </div>

        <button
          className={styles.restart}
          onClick={restart}
        >
          🔄 Play Again
        </button>
      </div>
    );
  }

  const progress =
    ((current + 1) / questions.length) * 100;

  return (
    <div className={styles.game}>

      {/* TOP GAME BAR */}

      <div className={styles.topBar}>
        <div className={styles.stat}>
          ⭐ {xp} XP
        </div>

        <div className={styles.stat}>
          {"❤️".repeat(lives)}
          {"🖤".repeat(3 - lives)}
        </div>

        <div className={styles.stat}>
          🔥 {streak}
        </div>
      </div>

      {/* MISSION */}

      <div className={styles.mission}>
        <span>🔬 SCIENCE DETECTIVE</span>

        <h2>
          The Wonderful World of Science
        </h2>

        <p>
          Observe carefully, ask questions and think
          like a scientist!
        </p>
      </div>

      {/* PROGRESS */}

      <div className={styles.progressSection}>
        <div className={styles.progressText}>
          <span>
            Question {current + 1} / {questions.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* XP REWARD */}

      <div className={styles.xpMission}>
        <span>🎯 CORRECT ANSWER</span>
        <strong>+100 XP</strong>
      </div>

      {/* VISUAL — ONLY FOR SOME QUESTIONS */}

      {question.visual && (
        <div className={styles.visualCard}>
          <div className={styles.visualObjects}>
            {question.visual.map((item, index) => (
              <div
                className={styles.visualObject}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION */}

      <div className={styles.questionCard}>

        <span className={styles.label}>
          🧠 DETECTIVE CHALLENGE
        </span>

        <h3>{question.question}</h3>

        <div className={styles.options}>
          {question.options.map(
            (option, index) => {
              let optionClass =
                styles.option;

              if (selected !== null) {
                if (
                  index === question.answer
                ) {
                  optionClass +=
                    ` ${styles.correct}`;
                } else if (
                  index === selected
                ) {
                  optionClass +=
                    ` ${styles.wrong}`;
                }
              }

              return (
                <button
                  key={option}
                  className={optionClass}
                  onClick={() =>
                    handleAnswer(index)
                  }
                  disabled={
                    selected !== null
                  }
                >
                  <span
                    className={styles.letter}
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                  </span>

                  <span>{option}</span>
                </button>
              );
            }
          )}
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
                <h4>
                  🎉 Correct! +100 XP
                </h4>

                <p>
                  {streak >= 2
                    ? `🔥 ${streak} answer streak!`
                    : question.explanation}
                </p>
              </>
            ) : (
              <>
                <h4>
                  💡 Not quite!
                </h4>

                <p>
                  <strong>
                    Correct Answer:{" "}
                    {question.options[
                      question.answer
                    ]}
                  </strong>
                </p>

                <p>
                  {question.explanation}
                </p>
              </>
            )}
          </div>
        )}

        {/* NEXT */}

        {selected !== null && (
          <button
            className={styles.next}
            onClick={nextQuestion}
          >
            {lives <= 0
              ? "💔 Mission Over"
              : current === questions.length - 1
              ? "🏆 Complete Mission"
              : "Continue →"}
          </button>
        )}
      </div>

      {/* TIP */}

      <div className={styles.gameTip}>
        💡 <strong>Scientist Tip:</strong>{" "}
        Read the question carefully and choose the
        answer supported by scientific reasoning.
      </div>
    </div>
  );
}

