"use client";

import { useState } from "react";
import styles from "./NumberBuilderGame.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function NumberBuilderGame() {
  const [level, setLevel] = useState<Level>(1);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  /* Level 1 / 2 / 5 */
  const [selectedPieces, setSelectedPieces] = useState<number[]>([]);

  /* Level 3 */
  const [pictureAnswer, setPictureAnswer] = useState<string | null>(null);

  /* Level 4 */
  const [equivalentAnswer, setEquivalentAnswer] = useState<string | null>(null);

  /* Level 6 */
  const [temperatureAnswer, setTemperatureAnswer] = useState<string | null>(
    null,
  );

  /* Level 7 */
  const [tankAnswer, setTankAnswer] = useState<string | null>(null);

  /* Level 8 */
  const [finalStep, setFinalStep] = useState(1);
  const [finalAnswer, setFinalAnswer] = useState<string | null>(null);

  const progress = (level / 8) * 100;

  /* =========================
     RESET CURRENT LEVEL
  ========================= */

  const resetLevel = () => {
    setSelectedPieces([]);
    setPictureAnswer(null);
    setEquivalentAnswer(null);
    setTemperatureAnswer(null);
    setTankAnswer(null);
    setFinalAnswer(null);

    setAnswered(false);
    setCorrect(false);
  };

  /* =========================
     NEXT LEVEL
  ========================= */

  const nextLevel = () => {
    if (level === 8) {
      setGameFinished(true);
      return;
    }

    const next = (level + 1) as Level;

    setLevel(next);

    setSelectedPieces([]);

    setPictureAnswer(null);
    setEquivalentAnswer(null);
    setTemperatureAnswer(null);
    setTankAnswer(null);
    setFinalAnswer(null);

    setAnswered(false);
    setCorrect(false);
    setFinalStep(1);
  };

  /* =========================
     LEVEL 1 / 2 / 5
     PIECE SELECTION
  ========================= */

  const handlePieceClick = (index: number) => {
    if (answered) return;

    setSelectedPieces((previous) => {
      if (previous.includes(index)) {
        return previous.filter((piece) => piece !== index);
      }

      return [...previous, index];
    });
  };

  /* =========================
     CHECK ANSWER
  ========================= */

  const checkAnswer = () => {
    let isCorrect = false;

    /* LEVEL 1 */
    if (level === 1) {
      isCorrect = selectedPieces.length === 1;
    }

    /* LEVEL 2 */
    if (level === 2) {
      isCorrect = selectedPieces.length === 3;
    }

    /* LEVEL 3 */
    if (level === 3) {
      isCorrect = pictureAnswer === "2/4";
    }

    /* LEVEL 4 */
    if (level === 4) {
      isCorrect = equivalentAnswer === "2/4";
    }

    /* LEVEL 5 */
    if (level === 5) {
      isCorrect = selectedPieces.length === 4;
    }

    /* LEVEL 6 */
    if (level === 6) {
      isCorrect = temperatureAnswer === "-3/2°C";
    }

    /* LEVEL 7 */
    if (level === 7) {
      isCorrect = tankAnswer === "5/8";
    }

    setCorrect(isCorrect);
    setAnswered(true);

    if (isCorrect) {
      setScore((previous) => previous + 100);
    }
  };

  /* =========================
     LEVEL 8
  ========================= */

  const handleFinalAnswer = (answer: string) => {
    if (answered) return;

    setFinalAnswer(answer);
  };

  const checkFinalStep = () => {
    let isCorrect = false;

    if (finalStep === 1) {
      isCorrect = finalAnswer === "3/5";
    }

    if (finalStep === 2) {
      isCorrect = finalAnswer === "6/10";
    }

    if (finalStep === 3) {
      isCorrect = finalAnswer === "-3/5";
    }

    if (isCorrect) {
      if (finalStep === 3) {
        setScore((previous) => previous + 100);
        setCorrect(true);
        setAnswered(true);
        return;
      }

      setScore((previous) => previous + 100);
      setFinalStep((previous) => previous + 1);
      setFinalAnswer(null);
      return;
    }

    setCorrect(false);
    setAnswered(true);
  };

  /* =========================
     COMPLETED SCREEN
  ========================= */

  if (gameFinished) {
    return (
      <div className={styles.completed}>
        <div className={styles.trophy}>🏆</div>

        <span className={styles.completeLabel}>GAME COMPLETE</span>

        <h2>Rational Number Expert!</h2>

        <p>You completed all 8 levels of Rational Number Builder.</p>

        <div className={styles.results}>
          <div className={styles.resultCard}>
            <span>XP EARNED</span>
            <strong>{score}</strong>
          </div>

          <div className={styles.resultCard}>
            <span>LEVELS</span>
            <strong>8 / 8</strong>
          </div>
        </div>

        <button type="button" className={styles.nextButton}>
          Continue to Module 2 →
        </button>
      </div>
    );
  }

  /* =========================
     LEVEL 1
  ========================= */

  const renderLevel1 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>🍕</div>

        <div>
          <strong>Build the fraction 1/2</strong>

          <p>Click exactly one of the two equal pieces.</p>
        </div>
      </div>

      <div className={styles.fractionDisplay}>
        <span>Build</span>

        <div className={styles.fraction}>
          <strong>1</strong>
          <div />
          <strong>2</strong>
        </div>
      </div>

      <div className={styles.objectArea}>
        <div className={styles.pizzaLabel}>🍕</div>

        <div className={styles.pieces}>
          {[0, 1].map((index) => (
            <button
              key={index}
              type="button"
              className={`${styles.piece} ${
                selectedPieces.includes(index) ? styles.selected : ""
              }`}
              onClick={() => handlePieceClick(index)}
              disabled={answered}
            >
              {selectedPieces.includes(index) ? "🟦" : ""}
            </button>
          ))}
        </div>

        <p className={styles.helper}>Click a piece to shade it.</p>
      </div>
    </>
  );

  /* =========================
     LEVEL 2
  ========================= */

  const renderLevel2 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>🍫</div>

        <div>
          <strong>Shade 3/4 of the chocolate bar</strong>

          <p>Select exactly three of the four equal pieces.</p>
        </div>
      </div>

      <div className={styles.fractionDisplay}>
        <span>Build</span>

        <div className={styles.fraction}>
          <strong>3</strong>
          <div />
          <strong>4</strong>
        </div>
      </div>

      <div className={styles.objectArea}>
        <div className={styles.pizzaLabel}>🍫</div>

        <div className={styles.piecesFour}>
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              type="button"
              className={`${styles.piece} ${
                selectedPieces.includes(index) ? styles.selected : ""
              }`}
              onClick={() => handlePieceClick(index)}
              disabled={answered}
            >
              {selectedPieces.includes(index) ? "🟫" : ""}
            </button>
          ))}
        </div>

        <p className={styles.helper}>Click the pieces you want to shade.</p>
      </div>
    </>
  );

  /* =========================
     LEVEL 3
  ========================= */

  const renderLevel3 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>👀</div>

        <div>
          <strong>Read the picture</strong>

          <p>What fraction of the shape is shaded?</p>
        </div>
      </div>

      <div className={styles.objectArea}>
        <div className={styles.piecesFour}>
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`${styles.picturePiece} ${
                index < 2 ? styles.pictureSelected : ""
              }`}
            >
              {index < 2 ? "🟦" : ""}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.options}>
        {["1/4", "2/4", "3/4", "4/4"].map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${
              pictureAnswer === option ? styles.optionSelected : ""
            }`}
            onClick={() => setPictureAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );

  /* =========================
     LEVEL 4
  ========================= */

  const renderLevel4 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>🧩</div>

        <div>
          <strong>Find the equivalent fraction</strong>

          <p>Which fraction represents the same amount as 1/2?</p>
        </div>
      </div>

      <div className={styles.equivalentVisual}>
        <div>
          <span>1/2</span>

          <div className={styles.visualTwo}>
            <div className={styles.filled} />
            <div />
          </div>
        </div>

        <span className={styles.equals}>=</span>

        <div>
          <span>?</span>

          <div className={styles.visualFour}>
            <div className={styles.filled} />
            <div className={styles.filled} />
            <div />
            <div />
          </div>
        </div>
      </div>

      <div className={styles.options}>
        {["2/4", "1/3", "3/4", "2/5"].map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${
              equivalentAnswer === option ? styles.optionSelected : ""
            }`}
            onClick={() => setEquivalentAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );

  /* =========================
     LEVEL 5
  ========================= */

  const renderLevel5 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>🧱</div>

        <div>
          <strong>Build an equivalent fraction</strong>

          <p>Turn 2/3 into an equivalent fraction with denominator 6.</p>
        </div>
      </div>

      <div className={styles.fractionDisplay}>
        <span>Start with</span>

        <div className={styles.fraction}>
          <strong>2</strong>
          <div />
          <strong>3</strong>
        </div>

        <span>→ denominator 6</span>
      </div>

      <div className={styles.objectArea}>
        <div className={styles.piecesSix}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              type="button"
              className={`${styles.pieceSmall} ${
                selectedPieces.includes(index) ? styles.selected : ""
              }`}
              onClick={() => handlePieceClick(index)}
              disabled={answered}
            >
              {selectedPieces.includes(index) ? "🟦" : ""}
            </button>
          ))}
        </div>

        <p className={styles.helper}>Select four of the six pieces.</p>
      </div>
    </>
  );

  /* =========================
     LEVEL 6
  ========================= */

  const renderLevel6 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>🌡️</div>

        <div>
          <strong>Positive or negative?</strong>

          <p>Which temperature represents -3/2°C?</p>
        </div>
      </div>

      <div className={styles.temperature}>
        <div>+2°C</div>
        <div>+1°C</div>
        <div>0°C</div>
        <div>-1°C</div>
        <div>-2°C</div>
      </div>

      <div className={styles.options}>
        {["-1/2°C", "-3/2°C", "+3/2°C", "+1/2°C"].map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${
              temperatureAnswer === option ? styles.optionSelected : ""
            }`}
            onClick={() => setTemperatureAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );

  /* =========================
     LEVEL 7
  ========================= */

  const renderLevel7 = () => (
    <>
      <div className={styles.instruction}>
        <div className={styles.instructionIcon}>💧</div>

        <div>
          <strong>Water Tank Challenge</strong>

          <p>What fraction of the tank is filled?</p>
        </div>
      </div>

      <div className={styles.objectArea}>
        <div className={styles.tank}>
          {Array.from({ length: 8 }, (_, index) => (
            <div
              key={index}
              className={index < 5 ? styles.waterFilled : styles.waterEmpty}
            >
              {index < 5 ? "" : ""}
            </div>
          ))}
        </div>

        <p className={styles.helper}></p>
      </div>

      <div className={styles.options}>
        {["5/8", "3/8", "5/6", "8/5"].map((option) => (
          <button
            key={option}
            type="button"
            className={`${styles.option} ${
              tankAnswer === option ? styles.optionSelected : ""
            }`}
            onClick={() => setTankAnswer(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );

  /* =========================
     LEVEL 8
  ========================= */

  const renderLevel8 = () => {
    if (answered) {
      return (
        <div className={styles.finalSuccess}>
          <div className={styles.trophy}>🏆</div>

          <h2>Rational Number Vault Unlocked!</h2>

          <p>You completed the final challenge.</p>

          <button
            type="button"
            className={styles.nextButton}
            onClick={() => setGameFinished(true)}
          >
            Complete Game →
          </button>
        </div>
      );
    }

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🔐</div>

          <div>
            <strong>Final Challenge</strong>

            <p>Complete all three tasks to unlock the vault.</p>
          </div>
        </div>

        <div className={styles.finalProgress}>
          <span>Challenge {finalStep} of 3</span>

          <div>
            <div
              style={{
                width: `${(finalStep / 3) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className={styles.finalQuestion}>
          {finalStep === 1 && (
            <>
              <h3>Build the fraction</h3>

              <div className={styles.bigFraction}>3/5</div>

              <p>Which fraction represents the target?</p>

              <div className={styles.options}>
                {["3/5", "2/5", "5/3", "1/5"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.option} ${
                      finalAnswer === option ? styles.optionSelected : ""
                    }`}
                    onClick={() => handleFinalAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {finalStep === 2 && (
            <>
              <h3>Find the equivalent fraction</h3>

              <div className={styles.bigFraction}>3/5 = ?</div>

              <div className={styles.options}>
                {["6/10", "4/10", "3/10", "5/6"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.option} ${
                      finalAnswer === option ? styles.optionSelected : ""
                    }`}
                    onClick={() => handleFinalAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}

          {finalStep === 3 && (
            <>
              <h3>Find the negative counterpart</h3>

              <div className={styles.bigFraction}>3/5 → ?</div>

              <div className={styles.options}>
                {["-3/5", "3/5", "-5/3", "5/3"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.option} ${
                      finalAnswer === option ? styles.optionSelected : ""
                    }`}
                    onClick={() => handleFinalAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.checkButton}
            disabled={!finalAnswer}
            onClick={checkFinalStep}
          >
            Check Answer ✓
          </button>
        </div>
      </>
    );
  };

  /* =========================
     LEVEL CONTENT
  ========================= */

  const renderLevel = () => {
    switch (level) {
      case 1:
        return renderLevel1();

      case 2:
        return renderLevel2();

      case 3:
        return renderLevel3();

      case 4:
        return renderLevel4();

      case 5:
        return renderLevel5();

      case 6:
        return renderLevel6();

      case 7:
        return renderLevel7();

      case 8:
        return renderLevel8();
    }
  };

  return (
    <div className={styles.game}>
      {/* HEADER */}

      <div className={styles.header}>
        <div>
          <span className={styles.gameLabel}>RATIONAL NUMBER BUILDER</span>

          <h2>
            Level {level} ·{" "}
            {level === 1
              ? "Fraction Builder"
              : level === 2
                ? "Shade the Fraction"
                : level === 3
                  ? "Read the Picture"
                  : level === 4
                    ? "Equivalent Fractions"
                    : level === 5
                      ? "Build an Equivalent Fraction"
                      : level === 6
                        ? "Positive or Negative"
                        : level === 7
                          ? "Real-World Challenge"
                          : "Final Challenge"}
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
          <span>Level {level} of 8</span>

          <span>{Math.round(progress)}%</span>
        </div>

        <div className={styles.progressBar}>
          <div
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* LEVEL */}

      {renderLevel()}

      {/* FEEDBACK FOR LEVELS 1-7 */}

      {answered && level !== 8 && (
        <div
          className={correct ? styles.correctFeedback : styles.wrongFeedback}
        >
          <strong>{correct ? "Correct! 🎉" : "Not quite! 💡"}</strong>

          <span>
            {level === 1 &&
              (correct
                ? "1 out of 2 equal parts represents 1/2."
                : "You need to shade exactly one of the two pieces.")}

            {level === 2 &&
              (correct
                ? "3 out of 4 equal pieces represents 3/4."
                : "You need to shade exactly three pieces.")}

            {level === 3 &&
              (correct
                ? "Two out of four pieces are shaded, so the fraction is 2/4."
                : "Look at the number of shaded pieces compared with the total.")}

            {level === 4 &&
              (correct
                ? "1/2 and 2/4 represent the same amount."
                : "Try comparing how much of each shape is shaded.")}

            {level === 5 &&
              (correct
                ? "2/3 is equivalent to 4/6."
                : "You need to select four of the six pieces.")}

            {level === 6 &&
              (correct
                ? "-3/2 is a negative rational number."
                : "Look carefully at the negative sign.")}

            {level === 7 &&
              (correct
                ? "5 out of 8 sections are filled, so the answer is 5/8."
                : "Count the filled sections and compare them with the total.")}
          </span>
        </div>
      )}

      {/* CONTROLS FOR LEVELS 1-7 */}

      {answered && level !== 8 && (
        <div className={styles.controls}>
          {!correct ? (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel}
            >
              Try Again
            </button>
          ) : (
            <button
              type="button"
              className={styles.nextButton}
              onClick={nextLevel}
            >
              {level === 7 ? "Final Challenge →" : "Next Level →"}
            </button>
          )}
        </div>
      )}

      {!answered &&
        level !== 8 &&
        (level === 1 || level === 2 || level === 5) && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.checkButton}
              disabled={selectedPieces.length === 0}
              onClick={checkAnswer}
            >
              Check Answer ✓
            </button>
          </div>
        )}

      {!answered &&
        level !== 8 &&
        (level === 3 || level === 4 || level === 6 || level === 7) && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.checkButton}
              disabled={
                level === 3
                  ? !pictureAnswer
                  : level === 4
                    ? !equivalentAnswer
                    : level === 6
                      ? !temperatureAnswer
                      : !tankAnswer
              }
              onClick={checkAnswer}
            >
              Check Answer ✓
            </button>
          </div>
        )}
    </div>
  );
}
