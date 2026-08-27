"use client";

import { useState } from "react";
import styles from "./ObservationHunt.module.css";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  image?: string;
};

const questions: Question[] = [
  {
    question:
      "Which sense organ is mainly used to observe the colour and shape of an object?",
    options: [
      "Eyes",
      "Ears",
      "Nose",
      "Tongue",
    ],
    answer: 0,
    explanation:
      "Our eyes help us observe features such as colour, shape, size and position.",
  },


  {
    question:
      "Which of the following is the most useful observation about a leaf?",
    options: [
      "The leaf is beautiful",
      "The leaf is my favourite",
      "The leaf is green and has a broad surface",
      "The leaf looks interesting",
    ],
    answer: 2,
    explanation:
      "A useful scientific observation should describe features that can actually be noticed or examined.",
  },

  {
    question:
      "Which statement is based on an observation rather than an opinion?",
    options: [
      "This flower is the prettiest",
      "This flower has five petals",
      "This flower is boring",
      "This flower is better than that one",
    ],
    answer: 1,
    explanation:
      "The number of petals can be observed and counted, while the other statements are opinions.",
  },



  {
    question:
      "Which observation would be most useful while comparing two plants?",
    options: [
      "Which plant looks nicer",
      "Which plant is more interesting",
      "Their height and number of leaves",
      "Which plant you like more",
    ],
    answer: 2,
    explanation:
      "Measurable or observable features such as height and number of leaves are useful for scientific comparison.",
  },

  {
    question:
      "A student notices that one stone sinks in water while another floats. What should the student do next?",
    options: [
      "Throw both stones away",
      "Record the observation and ask why they behave differently",
      "Assume the answer without checking",
      "Ignore the difference",
    ],
    answer: 1,
    explanation:
      "Recording observations and asking questions helps us investigate why objects behave differently.",
  },

  {
    question:
      "Which of the following is an observation that can be measured?",
    options: [
      "The bag is beautiful",
      "The water tastes good",
      "The pencil is 15 cm long",
      "The flower is attractive",
    ],
    answer: 2,
    explanation:
      "Length can be measured using a suitable measuring instrument.",
  },


  {
    question:
      "Why should observations be recorded during an investigation?",
    options: [
      "So that evidence can be remembered and compared later",
      "So that we can avoid doing experiments",
      "So that we can change the results",
      "So that we do not need to think about the results",
    ],
    answer: 0,
    explanation:
      "Recording observations helps us organise, compare and analyse the evidence collected during an investigation.",
  },
];

export default function ObservationHunt() {
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
      setXp((prev) => prev + 100);
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

        <h2>Observation Hunt Complete!</h2>

        <p>
          Great job! You completed the observation challenge.
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

      {/* TOP BAR */}

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

      {/* TITLE */}

      <div className={styles.mission}>
        <span>🔎 OBSERVATION HUNT</span>

        <h2>Observe & Discover</h2>

        <p>
          Read carefully, observe the situation and choose
          the correct answer.
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

      {/* QUESTION CARD */}

      <div className={styles.questionCard}>

        <span className={styles.label}>
          🧠 QUESTION
        </span>

        {/* IMAGE */}
        {question.image && (
         <div className={styles.imageCard}>
        <img
         src={question.image}
         alt="Science question"
         className={styles.questionImage}
        />
      </div>
      )}

        <h3>{question.question}</h3>

        {/* OPTIONS */}

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
                <h4>🎉 Correct Answer!</h4>

                <p>
                  +100 XP ⭐
                </p>
              </>
            ) : (
              <>
                <h4>💡 Not quite!</h4>

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
            {current === questions.length - 1
              ? "🏆 Complete Hunt"
              : "Next Question →"}
          </button>
        )}

      </div>
    </div>
  );
}