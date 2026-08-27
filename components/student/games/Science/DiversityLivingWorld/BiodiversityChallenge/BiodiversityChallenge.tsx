
"use client";

import { useState } from "react";
import styles from "./BiodiversityChallenge.module.css";

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
      "Why can two organisms living in the same habitat still have very different characteristics?",
    options: [
      "Because every organism has exactly the same needs",
      "Because different organisms have different structures and ways of living",
      "Because habitat makes all organisms identical",
      "Because organisms do not interact with their surroundings",
    ],
    answer: 1,
    explanation:
      "Organisms may share a habitat but can have different structures, food habits, movement and other characteristics.",
  },

  {
    visual: ["🐪", "🐟", "🐒", "🐧"],
    question:
      "Which animal is best adapted to survive in a hot and dry desert environment?",
    options: [
      "🐟 Fish",
      "🐧 Penguin",
      "🐪 Camel",
      "🐒 Monkey",
    ],
    answer: 2,
    explanation:
      "Camels have adaptations that help them survive in hot and dry desert conditions.",
  },

  {
    question:
      "A student observes that a particular organism can grow, obtain food, reproduce and respond to changes around it. What does this suggest?",
    options: [
      "It shows characteristics of a living organism",
      "It must be a non-living object",
      "It cannot interact with its surroundings",
      "It must be a rock",
    ],
    answer: 0,
    explanation:
      "Growth, obtaining food, reproduction and responding to surroundings are important characteristics associated with living organisms.",
  },

  {
    visual: ["🌵", "🌴", "🌿", "🌳"],
    question:
      "A cactus has a thick green stem and very small or modified leaves. What is the main advantage of such features?",
    options: [
      "They help reduce water loss",
      "They help the plant live completely underwater",
      "They prevent the plant from receiving sunlight",
      "They make the plant unable to survive in dry places",
    ],
    answer: 0,
    explanation:
      "Cactus plants are adapted to dry conditions. Their features help reduce water loss and allow them to survive where water is limited.",
  },

  {
    question:
      "Which situation gives the strongest evidence that an organism responds to its surroundings?",
    options: [
      "A stone remains in the same place",
      "A plant bends towards a source of light",
      "A chair becomes dusty",
      "A book remains on a table",
    ],
    answer: 1,
    explanation:
      "A plant bending towards light is an example of a living organism responding to a change in its surroundings.",
  },

  {
    question:
      "Why is biodiversity important for the natural world?",
    options: [
      "It means only one type of organism exists",
      "It represents the variety of living organisms found in different places",
      "It removes all differences between organisms",
      "It means organisms cannot depend on one another",
    ],
    answer: 1,
    explanation:
      "Biodiversity refers to the variety of living organisms. Different organisms play different roles in ecosystems.",
  },

  {
    visual: ["🐟", "🌊", "🐪", "🏜️"],
    question:
      "Which pairing correctly matches an organism with its commonly associated habitat?",
    options: [
      "🐟 → Desert",
      "🐪 → Ocean",
      "🐟 → Water",
      "🐪 → Deep ocean",
    ],
    answer: 2,
    explanation:
      "Fish are aquatic animals and are commonly associated with water-based habitats, while camels are adapted to dry regions.",
  },

  {
    question:
      "Suppose a forest contains many different plants, insects, birds and mammals. What would most likely happen if one species completely disappeared?",
    options: [
      "Nothing in the ecosystem could ever be affected",
      "Some relationships within the ecosystem could be disturbed",
      "All other organisms would immediately disappear",
      "The forest would automatically become a desert",
    ],
    answer: 1,
    explanation:
      "Organisms in an ecosystem can depend on one another for food, shelter and other resources. The loss of one species can therefore disturb these relationships.",
  },

  {
    question:
      "Which observation would be least useful for understanding the diversity of living organisms?",
    options: [
      "Differences in body structures",
      "Differences in habitats",
      "Differences in ways of obtaining food",
      "The number of letters in their names",
    ],
    answer: 3,
    explanation:
      "Body structure, habitat and food habits provide meaningful information about organisms. The number of letters in a name does not.",
  },

  {
    visual: ["🌳", "🐦", "🐛", "🍎"],
    question:
      "A bird feeds on insects found on a tree. What does this example show about organisms in an environment?",
    options: [
      "Organisms can have relationships with one another and their surroundings",
      "Animals never depend on plants",
      "Plants and animals always live independently",
      "All organisms have exactly the same role",
    ],
    answer: 0,
    explanation:
      "Living organisms interact with one another and with their surroundings. Food relationships are one example of such interactions.",
  },

  {
    question:
      "Which statement best explains why scientists study organisms from different regions?",
    options: [
      "To understand the variety and characteristics of life in different environments",
      "To make every organism look the same",
      "To prove that habitats do not matter",
      "To remove differences between organisms",
    ],
    answer: 0,
    explanation:
      "Studying organisms from different regions helps scientists understand biodiversity and how organisms are suited to different environments.",
  },

  {
    question:
      "A plant grows in a place where water is scarce. Which feature would most likely help it survive there?",
    options: [
      "A feature that increases unnecessary water loss",
      "A feature that helps conserve water",
      "A complete absence of roots",
      "A structure that prevents it from receiving light",
    ],
    answer: 1,
    explanation:
      "Plants living in dry environments need adaptations that help them conserve water.",
  },
];

export default function BiodiversityChallenge() {
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

        <h2>Biodiversity Challenge Complete!</h2>

        <p>
          Excellent! You completed the final challenge
          of this chapter.
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
          🌍 BIODIVERSITY CHALLENGE
        </span>

        <h2>Explore the Living World</h2>

        <p>
          Test your understanding of biodiversity,
          habitats and living organisms.
        </p>
      </div>

      {/* PROGRESS */}

      <div className={styles.progressSection}>
        <div className={styles.progressText}>
          <span>
            Challenge {current + 1} / {questions.length}
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
          CHALLENGE {current + 1}
        </span>

        <h3>{question.question}</h3>

        <div className={styles.options}>
          {question.options.map(
            (option, index) => {
              let optionClass = styles.option;

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
              ? "🏆 Finish Challenge"
              : "Next Question →"}
          </button>
        )}

      </div>
    </div>
  );
}

