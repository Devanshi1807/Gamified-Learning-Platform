"use client";

import { useMemo, useState } from "react";
import styles from "./DustbinHoopGame.module.css";

type WasteType = "wet" | "dry";

type WasteItem = {
  name: string;
  emoji: string;
  type: WasteType;
  fact: string;
};

const WASTE_ITEMS: WasteItem[] = [
  {
    name: "Banana Peel",
    emoji: "🍌",
    type: "wet",
    fact: "Fruit and vegetable peels are biodegradable wet waste.",
  },
  {
    name: "Plastic Bottle",
    emoji: "🧴",
    type: "dry",
    fact: "Plastic bottles should go into dry/recyclable waste.",
  },
  {
    name: "Apple Core",
    emoji: "🍎",
    type: "wet",
    fact: "Food scraps such as fruit cores are wet waste.",
  },
  {
    name: "Newspaper",
    emoji: "📰",
    type: "dry",
    fact: "Paper is generally classified as dry waste.",
  },
  {
    name: "Vegetable Peel",
    emoji: "🥕",
    type: "wet",
    fact: "Kitchen vegetable peels are biodegradable wet waste.",
  },
  {
    name: "Cardboard Box",
    emoji: "📦",
    type: "dry",
    fact: "Clean cardboard is dry recyclable waste.",
  },
  {
    name: "Leftover Food",
    emoji: "🍚",
    type: "wet",
    fact: "Food leftovers belong in wet/biodegradable waste.",
  },
  {
    name: "Aluminium Can",
    emoji: "🥫",
    type: "dry",
    fact: "Metal cans are dry recyclable waste.",
  },
];

const TOTAL_ROUNDS = 10;

export default function DustbinHoopGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedBin, setSelectedBin] = useState<WasteType | null>(null);
  const [isThrowing, setIsThrowing] = useState(false);
  const [feedback, setFeedback] = useState<{
    correct: boolean;
    message: string;
    fact: string;
  } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentWaste = useMemo(() => {
    return WASTE_ITEMS[(round - 1) % WASTE_ITEMS.length];
  }, [round]);

  const handleBinClick = (bin: WasteType) => {
    if (isThrowing || feedback || gameOver) return;

    setSelectedBin(bin);
    setIsThrowing(true);

    window.setTimeout(() => {
      const correct = bin === currentWaste.type;

      if (correct) {
        setScore((prev) => prev + 10 + streak * 2);
        setStreak((prev) => prev + 1);
      } else {
        setStreak(0);
      }

      setFeedback({
        correct,
        message: correct
          ? `Excellent! ${currentWaste.name} was thrown into the correct bin.`
          : `${currentWaste.name} was placed in the wrong bin.`,
        fact: correct
          ? currentWaste.fact
          : `The correct bin is the ${
              currentWaste.type === "wet" ? "GREEN" : "BLUE"
            } bin. ${currentWaste.fact}`,
      });

      setIsThrowing(false);
    }, 750);
  };

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setGameOver(true);
      return;
    }

    setRound((prev) => prev + 1);
    setSelectedBin(null);
    setFeedback(null);
  };

  const restartGame = () => {
    setRound(1);
    setScore(0);
    setStreak(0);
    setSelectedBin(null);
    setFeedback(null);
    setIsThrowing(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className={styles.gameShell}>
        <div className={styles.gameOverCard}>
          <div className={styles.trophy}>🏆</div>

          <p className={styles.eyebrow}>DUSTBIN HOOP COMPLETE</p>

          <h2>Great job, Eco Champion!</h2>

          <div className={styles.finalScore}>
            <span>Final Score</span>
            <strong>{score}</strong>
            <small>XP earned through waste segregation</small>
          </div>

          <div className={styles.resultRow}>
            <div>
              <strong>{TOTAL_ROUNDS}</strong>
              <span>Rounds</span>
            </div>

            <div>
              <strong>{score}</strong>
              <span>Points</span>
            </div>

            <div>
              <strong>🌱</strong>
              <span>Eco Skill</span>
            </div>
          </div>

          <button className={styles.primaryButton} onClick={restartGame}>
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.gameShell}>
      <div className={styles.topBar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>♻️</div>
          <div>
            <h1>Dustbin Hoop</h1>
            <p>AI-inspired Waste Segregation Challenge</p>
          </div>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>🏆</span>
            <div>
              <small>Score</small>
              <strong>{score}</strong>
            </div>
          </div>

          <div className={styles.stat}>
            <span>🔥</span>
            <div>
              <small>Streak</small>
              <strong>{streak}</strong>
            </div>
          </div>

          <div className={styles.stat}>
            <span>🎯</span>
            <div>
              <small>Round</small>
              <strong>
                {round}/{TOTAL_ROUNDS}
              </strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.progressTrack}>
        <div
          className={styles.progressFill}
          style={{ width: `${(round / TOTAL_ROUNDS) * 100}%` }}
        />
      </div>

      <div className={styles.instruction}>
        <span>♻️</span>
        Identify the waste and throw it into the correct dustbin.
      </div>

      <div className={styles.gameArea}>
        <section className={styles.objectPanel}>
          <div className={styles.roundBadge}>ROUND {round}</div>

          <p className={styles.smallLabel}>NEXT GARBAGE</p>

          <div
            className={`${styles.wasteObject} ${
              isThrowing ? styles.throwing : ""
            }`}
          >
            <span>{currentWaste.emoji}</span>
          </div>

          <h2>{currentWaste.name}</h2>

          <p className={styles.question}>
            Which bin should this garbage go into?
          </p>

          {feedback ? (
            <div
              className={`${styles.feedback} ${
                feedback.correct ? styles.correct : styles.incorrect
              }`}
            >
              <strong>
                {feedback.correct ? "✅ Correct Throw!" : "❌ Wrong Bin!"}
              </strong>

              <span>{feedback.message}</span>
              <small>💡 {feedback.fact}</small>
            </div>
          ) : (
            <p className={styles.helperText}>
              Choose a bin below to make your throw.
            </p>
          )}
        </section>

        <section className={styles.hoopArea}>
          <div className={styles.arenaGlow} />

          <div
            className={`${styles.virtualGarbage} ${
              isThrowing ? styles.fly : ""
            }`}
          >
            {currentWaste.emoji}
          </div>

          <div className={styles.bins}>
            <button
              className={`${styles.bin} ${styles.greenBin} ${
                selectedBin === "wet" ? styles.selectedBin : ""
              }`}
              onClick={() => handleBinClick("wet")}
              disabled={isThrowing || !!feedback}
            >
              <div className={styles.hoop}>◎</div>
              <div className={styles.binBody}>
                <span className={styles.recycle}>♻</span>
                <strong>GREEN</strong>
                <small>WET WASTE</small>
              </div>
            </button>

            <button
              className={`${styles.bin} ${styles.blueBin} ${
                selectedBin === "dry" ? styles.selectedBin : ""
              }`}
              onClick={() => handleBinClick("dry")}
              disabled={isThrowing || !!feedback}
            >
              <div className={styles.hoop}>◎</div>
              <div className={styles.binBody}>
                <span className={styles.recycle}>♻</span>
                <strong>BLUE</strong>
                <small>DRY WASTE</small>
              </div>
            </button>
          </div>

          <p className={styles.throwHint}>
            {isThrowing
              ? "Making the throw..."
              : feedback
                ? "Round complete!"
                : "Tap a bin to throw"}
          </p>

          {feedback && (
            <div
              className={`${styles.resultCard} ${
                feedback.correct ? styles.resultCorrect : styles.resultWrong
              }`}
            >
              <div className={styles.resultIcon}>
                {feedback.correct ? "✓" : "✕"}
              </div>

              <div className={styles.resultContent}>
                <h3>
  {feedback.correct
    ? `Correct Throw! +${10 + Math.max(streak - 1, 0) * 2} XP`
    : "Wrong Bin!"}
</h3>

                <p>{feedback.message}</p>

                <div className={styles.reason}>
                  <strong>💡 Why?</strong>
                  <span>{feedback.fact}</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <div className={styles.bottomPanel}>
        <div className={styles.rules}>
          <div className={styles.rule}>
            <span className={styles.greenDot}>●</span>
            <div>
              <strong>Green Bin</strong>
              <small>Wet / biodegradable waste</small>
            </div>
          </div>

          <div className={styles.rule}>
            <span className={styles.blueDot}>●</span>
            <div>
              <strong>Blue Bin</strong>
              <small>Dry / recyclable waste</small>
            </div>
          </div>
        </div>

        {feedback && (
          <button className={styles.nextButton} onClick={nextRound}>
            {round === TOTAL_ROUNDS ? "See Result →" : "Next Garbage →"}
          </button>
        )}
      </div>
    </div>
  );
}
