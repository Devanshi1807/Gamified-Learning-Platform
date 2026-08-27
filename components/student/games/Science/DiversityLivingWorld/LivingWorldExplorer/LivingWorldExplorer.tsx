
"use client";

import { useState } from "react";
import styles from "./LivingWorldExplorer.module.css";

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
      "Which of the following is the best example of diversity in the living world?",
    options: [
      "All organisms having the same body structure",
      "Different plants and animals having different features",
      "All animals living in the same habitat",
      "All plants having the same type of leaves",
    ],
    answer: 1,
    explanation:
      "Diversity means the presence of a variety of living organisms with different characteristics.",
  },

  {
    question:
      "Which feature can be used to distinguish a mango tree from a grass plant?",
    options: [
      "Both need water",
      "Both need sunlight",
      "Their size and structure are different",
      "Both are living organisms",
    ],
    answer: 2,
    explanation:
      "Plants may differ in size, stem, leaves and overall body structure even though they are both living organisms.",
  },

  {
    visual: ["🌳", "🌿", "🌵"],
    question:
      "Look at the three plants. Which observation correctly describes their diversity?",
    options: [
      "All three plants have identical structures",
      "They show differences in shape and structure",
      "Only the tree is a living organism",
      "They cannot be grouped as plants",
    ],
    answer: 1,
    explanation:
      "Plants show great diversity. Their size, shape, leaves, stems and other features can be different.",
  },

  {
    question:
      "Why do scientists group living organisms based on their similarities and differences?",
    options: [
      "To make studying organisms easier",
      "To make all organisms look similar",
      "To change their characteristics",
      "To stop organisms from reproducing",
    ],
    answer: 0,
    explanation:
      "Grouping organisms according to common characteristics makes the study and identification of living organisms easier.",
  },

  {
    question:
      "A student observes a rose plant and a mango tree. Which characteristic is common to both?",
    options: [
      "Both have exactly the same height",
      "Both produce fruits",
      "Both are plants and make their own food",
      "Both have identical leaves",
    ],
    answer: 2,
    explanation:
      "Rose and mango plants are different in many ways, but both are plants and generally prepare their own food through photosynthesis.",
  },

  {
    visual: ["🐟", "🦅", "🐪"],
    question:
      "The organisms shown live in different surroundings. Which combination is most appropriate?",
    options: [
      "Fish – water, Eagle – air/land, Camel – desert",
      "Fish – desert, Eagle – water, Camel – pond",
      "All three mainly live in water",
      "All three mainly live underground",
    ],
    answer: 0,
    explanation:
      "Different organisms are suited to different habitats. Fish are adapted to aquatic environments, camels to deserts, and eagles can live and move in terrestrial and aerial environments.",
  },

  {
    question:
      "Which of the following pairs shows organisms that are quite different but belong to the living world?",
    options: [
      "Mango tree and dog",
      "Rock and chair",
      "Table and stone",
      "Bottle and pencil",
    ],
    answer: 0,
    explanation:
      "A mango tree and a dog are very different organisms, but both are living things.",
  },

  {
    question:
      "Which statement about the diversity of plants is correct?",
    options: [
      "All plants are of the same size",
      "All plants have weak stems",
      "Plants can differ greatly in size, shape and structure",
      "Plants cannot live in different habitats",
    ],
    answer: 2,
    explanation:
      "Plants range from tiny herbs to large trees and show considerable variation in their structure and habitat.",
  },

  {
    visual: ["🐘", "🐜", "🦋"],
    question:
      "An elephant, an ant and a butterfly are shown. What is the most useful observation?",
    options: [
      "All three have the same body size",
      "They show differences in size and body structure",
      "Only the elephant is an animal",
      "They belong to the same species",
    ],
    answer: 1,
    explanation:
      "Animals show enormous diversity in body size, shape, structure and other characteristics.",
  },

  {
    question:
      "A student says, 'Since a whale lives in water, it must be a fish.' Which response is scientifically correct?",
    options: [
      "Correct, because every water-living organism is a fish",
      "Correct, because whales have fins",
      "Incorrect, because habitat alone does not determine the group of an organism",
      "Incorrect, because whales cannot swim",
    ],
    answer: 2,
    explanation:
      "Living organisms are classified using several characteristics, not simply the place where they live. A whale is a mammal.",
  },
];

export default function LivingWorldExplorer() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      setXp((prev) => prev + 100);
      setStreak((prev) => prev + 1);
      setCorrectAnswers((prev) => prev + 1);
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
    setCorrectAnswers(0);
    setFinished(false);
  }

  if (finished) {
    const accuracy = Math.round(
      (correctAnswers / questions.length) * 100
    );

    return (
      <div className={styles.result}>
        <div className={styles.trophy}>🏆</div>

        <h2>Challenge Complete!</h2>

        <p>
          You completed the Living World Explorer module.
        </p>

        <div className={styles.stats}>
          <div>
            <span>⭐</span>
            <strong>{xp}</strong>
            <small>XP</small>
          </div>

          <div>
            <span>✅</span>
            <strong>
              {correctAnswers}/{questions.length}
            </strong>
            <small>Correct</small>
          </div>

          <div>
            <span>📊</span>
            <strong>{accuracy}%</strong>
            <small>Accuracy</small>
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

      {/* HEADER */}

      <div className={styles.header}>
        <span className={styles.badge}>
          🌿 DIVERSITY IN THE LIVING WORLD
        </span>

        <h2>Living World Explorer</h2>

        <p>
          Test your understanding of the amazing variety
          of plants and animals.
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

      {/* VISUAL */}

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

        <span className={styles.questionNumber}>
          QUESTION {current + 1}
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
                  <span className={styles.letter}>
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
                ? `${styles.feedback} ${styles.correctFeedback}`
                : `${styles.feedback} ${styles.wrongFeedback}`
            }
          >
            {selected === question.answer ? (
              <>
                <h4>
                  🎉 Correct! +100 XP
                </h4>

                <p>
                  {question.explanation}
                </p>
              </>
            ) : (
              <>
                <h4>
                  ❌ Not quite!
                </h4>

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
              ? "🏆 Finish"
              : "Next Question →"}
          </button>
        )}

      </div>
    </div>
  );
}

