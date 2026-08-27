
"use client";

import { useState } from "react";
import styles from "./ClassificationQuest.module.css";

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
      "Which characteristic would be most useful for grouping animals into different groups?",
    options: [
      "The place where a student sees them",
      "Their important body features",
      "Their names in different languages",
      "Their colour only",
    ],
    answer: 1,
    explanation:
      "Animals can be grouped by important observable characteristics such as body structure, presence of limbs, body covering and other features.",
  },

  {
    question:
      "Which pair of organisms would be most suitable to place in the same group based on a common feature?",
    options: [
      "Rose and dog because both are colourful",
      "Cow and mango tree because both need water",
      "Neem tree and mango tree because both are plants",
      "Fish and stone because both can be found near water",
    ],
    answer: 2,
    explanation:
      "Neem and mango are both plants and share several characteristics of plants.",
  },

  {
    visual: ["🌳", "🌴", "🌾", "🌵"],
    question:
      "Which feature can help us make a meaningful group from the plants shown?",
    options: [
      "The number of letters in their names",
      "Their height, structure and type of stem",
      "Whether their names start with the same letter",
      "The colour of the soil around them",
    ],
    answer: 1,
    explanation:
      "Observable features such as size, stem type, leaf structure and overall form can help us compare and group plants.",
  },

  {
    question:
      "A student groups a frog, fish and whale together only because all three can swim. What is the problem with this classification?",
    options: [
      "Swimming is not a useful characteristic by itself for grouping them",
      "None of them can live in water",
      "All three are actually plants",
      "They have exactly the same body structure",
    ],
    answer: 0,
    explanation:
      "A single feature may not always be enough. Scientists consider several important characteristics when classifying organisms.",
  },

  {
    question:
      "Which of the following is a better way to classify the objects below as living organisms and non-living things?",
    options: [
      "Group them according to their size only",
      "Group them according to their colour",
      "Look for characteristics associated with living things",
      "Group them according to their price",
    ],
    answer: 2,
    explanation:
      "Classification should be based on meaningful characteristics rather than unrelated properties such as price or colour.",
  },

  {
    visual: ["🐟", "🐸", "🐦", "🐄"],
    question:
      "Which pair shows animals that belong to clearly different groups based on their usual habitats?",
    options: [
      "Fish and frog",
      "Bird and cow",
      "Fish and bird",
      "Frog and cow",
    ],
    answer: 2,
    explanation:
      "Fish are primarily aquatic, whereas birds are primarily terrestrial and aerial animals. Habitat can be one useful feature when comparing organisms.",
  },

  {
    question:
      "Why is classification useful when the number of different organisms around us is very large?",
    options: [
      "It helps us study and identify organisms systematically",
      "It makes all organisms identical",
      "It removes differences between organisms",
      "It prevents organisms from changing",
    ],
    answer: 0,
    explanation:
      "There is enormous diversity in the living world. Classification makes it easier to organize, identify and study organisms.",
  },

  {
    question:
      "Consider these two organisms: a butterfly and a sparrow. Which observation is most useful for comparing them?",
    options: [
      "Both can be seen outdoors",
      "Both can move from one place to another",
      "Their body structures and coverings are different",
      "Both may be found near plants",
    ],
    answer: 2,
    explanation:
      "Body structure and body covering provide more useful information for comparing and grouping organisms than simply where they are seen.",
  },

  {
    visual: ["🌿", "🍄", "🐕"],
    question:
      "A student wants to divide these three organisms into two groups. Which grouping is most reasonable?",
    options: [
      "🌿 and 🍄 together; 🐕 separately",
      "🌿 and 🐕 together; 🍄 separately",
      "🍄 and 🐕 together; 🌿 separately",
      "Put all three into one group because all are living",
    ],
    answer: 0,
    explanation:
      "The plant and fungus can be separated from the dog as a simple grouping based on broad observable differences. More detailed classification would require additional characteristics.",
  },

  {
    question:
      "Which statement best explains why classification should use more than one characteristic when necessary?",
    options: [
      "One characteristic may not show all the important similarities and differences",
      "Using more characteristics always makes organisms identical",
      "Scientists are not allowed to observe organisms",
      "Every organism has exactly the same characteristics",
    ],
    answer: 0,
    explanation:
      "Different organisms may share one feature but differ in several others. Considering multiple characteristics can lead to a more meaningful classification.",
  },
];

export default function ClassificationQuest() {
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

        <h2>Classification Quest Complete!</h2>

        <p>
          Great work! You tested your understanding of
          grouping and classifying living organisms.
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
          🌱 CLASSIFICATION QUEST
        </span>

        <h2>Classify the Living World</h2>

        <p>
          Compare characteristics and choose the most
          suitable groups.
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
                  ❌ Incorrect
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

