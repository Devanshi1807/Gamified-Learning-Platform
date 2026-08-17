"use client";

import { useState } from "react";
import styles from "./NumberSortingGame.module.css";

interface Round {
  title: string;
  instruction: string;
  numbers: string[];
  correctOrder: string[];
}

const rounds: Round[] = [
  {
    title: "Easy Start",
    instruction: "Arrange the numbers from smallest to largest.",
    numbers: ["1/4", "3/4", "2/4", "4/4"],
    correctOrder: ["1/4", "2/4", "3/4", "4/4"],
  },

  {
    title: "Positive Fractions",
    instruction: "Which fraction comes first?",
    numbers: ["2/5", "4/5", "1/5", "3/5"],
    correctOrder: ["1/5", "2/5", "3/5", "4/5"],
  },

  {
    title: "Negative Numbers",
    instruction: "Remember: -3/4 is smaller than -1/4.",
    numbers: ["-1/4", "-3/4", "-2/4", "-4/4"],
    correctOrder: ["-4/4", "-3/4", "-2/4", "-1/4"],
  },

  {
    title: "Different Denominators",
    instruction: "Compare the fractions carefully.",
    numbers: ["1/2", "1/4", "3/4", "2/3"],
    correctOrder: ["1/4", "1/2", "2/3", "3/4"],
  },

  {
    title: "Mixed Signs",
    instruction: "Place negative numbers before positive numbers.",
    numbers: ["1/2", "-1/2", "3/4", "-3/4"],
    correctOrder: ["-3/4", "-1/2", "1/2", "3/4"],
  },

  {
    title: "Fractions & Integers",
    instruction: "Remember that integers are rational numbers too.",
    numbers: ["1", "-1", "1/2", "-1/2"],
    correctOrder: ["-1", "-1/2", "1/2", "1"],
  },

  {
    title: "Mixed Challenge",
    instruction: "Can you find the correct order?",
    numbers: ["2/3", "-1/3", "1/6", "-5/6"],
    correctOrder: ["-5/6", "-1/3", "1/6", "2/3"],
  },

  {
    title: "Final Challenge",
    instruction: "This is your final challenge. Take your time!",
    numbers: ["-2/3", "3/4", "-1/2", "1/3"],
    correctOrder: ["-2/3", "-1/2", "1/3", "3/4"],
  },
];

export default function NumberSortingGame() {
  const [round, setRound] = useState(0);

  const [cards, setCards] = useState<string[]>(
    rounds[0].numbers
  );

  const [selectedCard, setSelectedCard] =
    useState<number | null>(null);

  const [draggedCard, setDraggedCard] =
    useState<number | null>(null);

  const [answered, setAnswered] = useState(false);

  const [correct, setCorrect] = useState(false);

  const [score, setScore] = useState(0);

  const [correctRounds, setCorrectRounds] =
    useState(0);

  const [gameFinished, setGameFinished] =
    useState(false);

  const currentRound = rounds[round];

  const progress =
    ((round + 1) / rounds.length) * 100;


  /* =========================
     CARD MOVEMENT
  ========================= */

  const moveCard = (
    fromIndex: number,
    toIndex: number
  ) => {
    if (answered) return;

    const updated = [...cards];

    const [movedCard] = updated.splice(
      fromIndex,
      1
    );

    updated.splice(toIndex, 0, movedCard);

    setCards(updated);
  };


  /* =========================
     CLICK TO SWAP
  ========================= */

  const handleCardClick = (index: number) => {
    if (answered) return;

    if (selectedCard === null) {
      setSelectedCard(index);
      return;
    }

    if (selectedCard === index) {
      setSelectedCard(null);
      return;
    }

    moveCard(selectedCard, index);

    setSelectedCard(null);
  };


  /* =========================
     DRAG & DROP
  ========================= */

  const handleDragStart = (index: number) => {
    if (answered) return;

    setDraggedCard(index);
  };

  const handleDrop = (index: number) => {
    if (
      draggedCard === null ||
      answered
    ) {
      return;
    }

    moveCard(draggedCard, index);

    setDraggedCard(null);
  };


  /* =========================
     CHECK ANSWER
  ========================= */

  const checkAnswer = () => {
    const isCorrect =
      cards.every(
        (card, index) =>
          card ===
          currentRound.correctOrder[index]
      );

    setCorrect(isCorrect);
    setAnswered(true);

    if (isCorrect) {
      setScore((previous) => previous + 100);

      setCorrectRounds(
        (previous) => previous + 1
      );
    }
  };


  /* =========================
     NEXT ROUND
  ========================= */

  const nextRound = () => {
    if (round === rounds.length - 1) {
      setGameFinished(true);
      return;
    }

    const next = round + 1;

    setRound(next);

    setCards([...rounds[next].numbers]);

    setSelectedCard(null);

    setAnswered(false);

    setCorrect(false);
  };


  /* =========================
     GAME COMPLETE
  ========================= */

  if (gameFinished) {
    const accuracy = Math.round(
      (correctRounds / rounds.length) *
        100
    );

    return (
      <div className={styles.completed}>

        <div className={styles.trophy}>
          🏆
        </div>

        <span className={styles.completeLabel}>
          LEVEL COMPLETE
        </span>

        <h2>
          Rational Number Sorter Complete!
        </h2>

        <p>
          You completed all{" "}
          {rounds.length} challenges.
        </p>

        <div className={styles.results}>

          <div className={styles.resultCard}>
            <span>XP EARNED</span>
            <strong>{score}</strong>
          </div>

          <div className={styles.resultCard}>
            <span>ACCURACY</span>
            <strong>{accuracy}%</strong>
          </div>

        </div>

        <button
          type="button"
          className={styles.nextButton}
        >
          Continue to Module 3 →
        </button>

      </div>
    );
  }


  /* =========================
     GAME
  ========================= */

  return (
    <div className={styles.game}>

      {/* HEADER */}

      <div className={styles.header}>

        <div>
          <span className={styles.gameLabel}>
            RATIONAL NUMBER SORTER
          </span>

          <h2>
            {currentRound.title}
          </h2>
        </div>

        <div className={styles.score}>
          <span>XP</span>
          <strong>{score}</strong>
        </div>

      </div>


      {/* PROGRESS */}

      <div className={styles.progressArea}>

        <div className={styles.progressText}>
          <span>
            Round {round + 1} of{" "}
            {rounds.length}
          </span>

          <span>
            {Math.round(progress)}%
          </span>
        </div>

        <div className={styles.progressBar}>
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>


      {/* INSTRUCTIONS */}

      <div className={styles.instruction}>

        <div className={styles.instructionIcon}>
          ↕
        </div>

        <div>
          <strong>
            Sort the numbers
          </strong>

          <p>
            {currentRound.instruction}
          </p>
        </div>

      </div>


      {/* SORTING AREA */}

      <div className={styles.sortArea}>

        <div className={styles.sortLabels}>
          <span>
            SMALLEST
          </span>

          <span>
            LARGEST
          </span>
        </div>

        <div className={styles.cards}>

          {cards.map((number, index) => (

            <div
              key={`${number}-${index}`}
              draggable={!answered}

              onDragStart={() =>
                handleDragStart(index)
              }

              onDragOver={(event) =>
                event.preventDefault()
              }

              onDrop={() =>
                handleDrop(index)
              }

              onClick={() =>
                handleCardClick(index)
              }

              className={`
                ${styles.numberCard}

                ${
                  selectedCard === index
                    ? styles.selected
                    : ""
                }

                ${
                  answered &&
                  currentRound
                    .correctOrder[index] ===
                    number
                    ? styles.correctCard
                    : ""
                }

                ${
                  answered &&
                  currentRound
                    .correctOrder[index] !==
                    number
                    ? styles.wrongCard
                    : ""
                }
              `}
            >

              <span className={styles.position}>
                {index + 1}
              </span>

              <strong>
                {number}
              </strong>

              {!answered && (
                <span className={styles.dragHint}>
                  ↕
                </span>
              )}

            </div>

          ))}

        </div>

        {!answered && (
          <p className={styles.mobileHint}>
            Tap two cards to swap them, or drag
            cards into position.
          </p>
        )}

      </div>


      {/* FEEDBACK */}

      {answered && (

        <div
          className={
            correct
              ? styles.correctFeedback
              : styles.wrongFeedback
          }
        >

          <strong>
            {correct
              ? "Perfect! 🎉"
              : "Not quite! 💡"}
          </strong>

          {correct ? (
            <span>
              You arranged all the numbers
              correctly.
            </span>
          ) : (
            <span>
              The correct order is:{" "}
              {currentRound.correctOrder.join(
                "  <  "
              )}
            </span>
          )}

        </div>

      )}


      {/* CONTROLS */}

      <div className={styles.controls}>

        {!answered ? (

          <button
            type="button"
            onClick={checkAnswer}
            className={styles.checkButton}
          >
            Check Order ✓
          </button>

        ) : (

          <button
            type="button"
            onClick={nextRound}
            className={styles.nextRoundButton}
          >
            {round === rounds.length - 1
              ? "Finish Level →"
              : "Next Round →"}
          </button>

        )}

      </div>

    </div>
  );
}