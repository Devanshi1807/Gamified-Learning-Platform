"use client";

import { useState } from "react";
import styles from "./QuestionMaster.module.css";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  visual?: string[];
  type: "mcq" | "visual" | "challenge";
};

const questions: Question[] = [
  {
    type: "mcq",
    question:
      "A student notices that a wet cloth dries faster on a hot, windy day than on a cool, still day. Which conclusion is most reasonable?",
    options: [
      "Temperature and moving air may affect drying",
      "Wind creates water inside the cloth",
      "The cloth produces heat on hot days",
      "Water disappears without changing"
    ],
    answer: 0,
    explanation:
      "The observation suggests that both temperature and moving air can affect how quickly water evaporates."
  },

  {
    type: "mcq",
    question:
      "Which of the following is the BEST example of evidence rather than an assumption?",
    options: [
      "The plant grew 4 cm in seven days",
      "The plant probably likes the sunlight",
      "The plant must be healthy",
      "The plant will definitely grow tomorrow"
    ],
    answer: 0,
    explanation:
      "A measured growth of 4 cm is recorded evidence. The other statements are assumptions or predictions."
  },

  {
    type: "visual",
    visual: ["🌱", "🌱", "🌱", "📏"],
    question:
      "Three identical seedlings are grown under different conditions. Their heights are measured every two days. Why is measuring their height useful?",
    options: [
      "It provides numerical evidence that can be compared",
      "It guarantees which plant will survive",
      "It proves that sunlight is the only factor involved",
      "It removes the need for repeated observations"
    ],
    answer: 0,
    explanation:
      "Measurements provide numerical data that can be compared to understand changes in plant growth."
  },

  {
    type: "challenge",
    question:
      "A student wants to test whether the amount of water affects plant growth. Which experimental setup would give the fairest comparison?",
    options: [
      "Same type of plant, same soil and light, but different amounts of water",
      "Different plants, different soil and different amounts of water",
      "Same plant but different soil, light and water",
      "Different plants kept in completely different places"
    ],
    answer: 0,
    explanation:
      "A fair investigation changes mainly the factor being tested while keeping other important conditions similar."
  },

  {
    type: "mcq",
    question:
      "Two students observe the same phenomenon but give different explanations. What should they do next?",
    options: [
      "Design an investigation to collect evidence",
      "Choose the explanation of the faster student",
      "Combine both explanations without testing",
      "Select the explanation that sounds more convincing"
    ],
    answer: 0,
    explanation:
      "Scientific explanations should be compared using observations and evidence rather than personal preference."
  },

  {
    type: "visual",
    visual: ["🧊", "🌡️", "⏱️", "📊"],
    question:
      "Two identical ice cubes are kept at different temperatures. A student records the time taken for each to melt. What does this data allow the student to investigate?",
    options: [
      "Whether temperature affects the rate of melting",
      "Whether ice has a particular colour",
      "Whether the container is expensive",
      "Whether ice can produce sunlight"
    ],
    answer: 0,
    explanation:
      "Comparing melting times under different temperatures can provide evidence about the effect of temperature."
  },

  {
    type: "challenge",
    question:
      "A student predicts that Plant A will grow faster than Plant B. After two weeks, Plant B is taller. What is the most scientific response?",
    options: [
      "Accept the result and investigate why the prediction was different",
      "Change the recorded height of Plant B",
      "Ignore the result because the prediction was different",
      "Declare that the experiment failed automatically"
    ],
    answer: 0,
    explanation:
      "A prediction does not have to be correct. Unexpected results are useful because they can lead to new questions and investigations."
  },

  {
    type: "mcq",
    question:
      "Which question is MOST suitable for a scientific investigation?",
    options: [
      "Does the amount of sunlight affect the growth of a particular plant?",
      "Which flower is the most beautiful?",
      "Which colour looks happiest?",
      "Which food is the nicest?"
    ],
    answer: 0,
    explanation:
      "A scientific investigation should involve something that can be observed, measured or tested."
  },

  {
    type: "visual",
    visual: ["🥛", "💧", "🧂", "🔬"],
    question:
      "A student mixes equal amounts of water with different quantities of salt. Which observation would provide useful evidence?",
    options: [
      "How much salt dissolves in each sample",
      "Which container looks prettier",
      "Which sample has the student's favourite colour",
      "Which glass is more expensive"
    ],
    answer: 0,
    explanation:
      "Recording how much salt dissolves provides useful observable evidence for comparison."
  },

  {
    type: "challenge",
    question:
      "A scientist performs the same investigation three times and obtains similar results. Why does this strengthen the investigation?",
    options: [
      "It suggests that the result is consistent",
      "It proves the result can never be wrong",
      "It means further observations are impossible",
      "It removes the need to record data"
    ],
    answer: 0,
    explanation:
      "Repeated investigations giving similar results increase confidence that the observed pattern is consistent."
  },

  {
    type: "mcq",
    question:
      "Which statement correctly distinguishes an observation from an inference?",
    options: [
      "Observation is what we notice; inference is an explanation based on what we notice",
      "Observation and inference always mean exactly the same thing",
      "Inference must always be directly visible",
      "Observation is always a guess"
    ],
    answer: 0,
    explanation:
      "An observation is based on what we directly notice or measure, while an inference is an explanation drawn from observations."
  },

  {
    type: "challenge",
    question:
      "A student says, 'The plant grew because I used more water.' Which additional information would be MOST important before accepting this conclusion?",
    options: [
      "Whether other conditions such as light, soil and plant type were kept similar",
      "Whether the plant pot was colourful",
      "Whether the student liked the plant",
      "Whether the plant was kept near a window"
    ],
    answer: 0,
    explanation:
      "If several conditions change at the same time, we cannot confidently identify which factor caused the difference."
  }
];

export default function QuestionMaster() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [xp, setXp] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  function handleAnswer(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === question.answer) {
      const bonus = streak >= 2 ? 25 : 0;

      setXp((prev) => prev + 100 + bonus);
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
    setXp(0);
    setLives(3);
    setStreak(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className={styles.result}>
        <div className={styles.trophy}>🏆</div>

        <h2>Question Master Complete!</h2>

        <p>
          You completed the Science Question Master challenge.
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

      {/* GAME HUD */}

      <div className={styles.topBar}>
        <div className={styles.stat}>
          ⭐ {xp} XP
        </div>

        <div className={styles.stat}>
          ❤️ {lives}
        </div>

        <div className={styles.stat}>
          🔥 {streak}
        </div>
      </div>

      {/* HEADER */}

      <div className={styles.mission}>
        <span>🧠 QUESTION MASTER</span>

        <h2>Science Challenge</h2>

        <p>
          Think carefully. Use evidence. Choose the best answer.
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
              width: `${progress}%`
            }}
          />
        </div>
      </div>

      {/* QUESTION */}

      <div className={styles.questionCard}>

        <div className={styles.challengeBadge}>
          {question.type === "visual"
            ? "👀 VISUAL CHALLENGE"
            : question.type === "challenge"
            ? "🔥 BRAIN CHALLENGE"
            : "🧠 SCIENCE MCQ"}
        </div>

        {/* VISUAL */}

        {question.visual && (
          <div className={styles.visualCard}>
            <div className={styles.visualObjects}>
              {question.visual.map((item, index) => (
                <div
                  key={index}
                  className={styles.visualObject}
                >
                  {item}
                </div>
              ))}
            </div>
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
                  +100 XP
                  {streak >= 3 &&
                    " 🔥 Streak Bonus +25 XP!"}
                </p>
              </>
            ) : (
              <>
                <h4>💡 Learn From the Question</h4>

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
              ? "🏆 Complete Challenge"
              : "Next Question →"}
          </button>
        )}

      </div>
    </div>
  );
}