"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./PatternDetectiveGame.module.css";

type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export default function PatternDetectiveGame() {
  const [level, setLevel] = useState<Level>(1);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [gameCompleted, setGameCompleted] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);

  // LEVEL 1
  const [level1Diffs, setLevel1Diffs] = useState<string[]>(Array(4).fill(""));
  const [level1NextDiff, setLevel1NextDiff] = useState("");
  const [level1Answer, setLevel1Answer] = useState("");

  // LEVEL 2
  const [level2Diffs, setLevel2Diffs] = useState<string[]>(Array(4).fill(""));
  const [level2Missing, setLevel2Missing] = useState("");

  // LEVEL 3
  const [level3Differences, setLevel3Differences] = useState<string[]>(
    Array(4).fill(""),
  );
  const [level3NextDifference, setLevel3NextDifference] = useState("");
  const [level3Answer, setLevel3Answer] = useState("");

  // LEVEL 4
  const [level4Answer, setLevel4Answer] = useState("");

  // LEVEL 5
  const [level5Answer, setLevel5Answer] = useState("");

  // LEVEL 6
  const [selectedCells, setSelectedCells] = useState<number[]>([]);

  // LEVEL 7
  const [level7Answer, setLevel7Answer] = useState("");
  const [hintUsed, setHintUsed] = useState(false);

  // LEVEL 8
  const [level8Answer1, setLevel8Answer1] = useState("");
  const [level8Answer2, setLevel8Answer2] = useState("");
  const [level8Answer3, setLevel8Answer3] = useState("");

  const resetMessage = () => {
    setMessage("");
    setIsCorrect(null);
  };

  const completeLevel = (earnedXP: number) => {
    setIsCorrect(true);
    setMessage("Excellent! You solved the pattern.");

    setScore((previous) => previous + earnedXP);
  };

  const nextLevel = () => {
    if (level < 8) {
      setLevel((previous) => (previous + 1) as Level);
      setMessage("");
      setIsCorrect(null);
    }
  };

  /*
   * LEVEL 1
   */

  const checkLevel1 = () => {
    const correctDiffs = [4, 6, 8, 10];

    const diffsCorrect = level1Diffs.every(
      (value, index) => Number(value) === correctDiffs[index],
    );

    if (!diffsCorrect) {
      setIsCorrect(false);
      setMessage(
        "Look at the gaps between consecutive numbers. The differences themselves form a pattern.",
      );
      return;
    }

    if (Number(level1NextDiff) !== 12) {
      setIsCorrect(false);
      setMessage("The differences increase regularly. What comes after +10?");
      return;
    }

    if (Number(level1Answer) !== 47) {
      setIsCorrect(false);
      setMessage("Apply your next difference to 35.");
      return;
    }

    completeLevel(100);
  };

  /*
   * LEVEL 2
   *
   * 2 → 5 → ? → 17 → 26 → 37
   *
   * +3 +5 +7 +9 +11
   *
   * Missing = 10
   */

  const checkLevel2 = () => {
    const correctDiffs = [3, 5, 7, 9, 11];

    const firstFourCorrect = level2Diffs.every(
      (value, index) => Number(value) === correctDiffs[index],
    );

    if (!firstFourCorrect) {
      setIsCorrect(false);
      setMessage(
        "Find the difference between each pair of numbers. The differences are changing.",
      );
      return;
    }

    if (Number(level2Missing) !== 10) {
      setIsCorrect(false);
      setMessage(
        "The missing number comes after 5 using the second difference.",
      );
      return;
    }

    completeLevel(120);
  };

  /*
   * LEVEL 3
   *
   * 3 → 6 → 11 → 18 → 27 → ?
   *
   * Differences:
   * 3,5,7,9,11
   *
   * Answer = 38
   */

  const checkLevel3 = () => {
    const correct = [3, 5, 7, 9];

    const differencesCorrect = level3Differences.every(
      (value, index) => Number(value) === correct[index],
    );

    if (!differencesCorrect) {
      setIsCorrect(false);
      setMessage(
        "The original sequence is hiding a second pattern. Find its differences.",
      );
      return;
    }

    if (Number(level3NextDifference) !== 11) {
      setIsCorrect(false);
      setMessage("Look at how the differences themselves are changing.");
      return;
    }

    if (Number(level3Answer) !== 38) {
      setIsCorrect(false);
      setMessage("Apply the next difference to 27.");
      return;
    }

    completeLevel(140);
  };

  /*
   * LEVEL 4
   *
   * 6 → 9 → 18 → 21 → 42 → 45 → ?
   *
   * +3, ×2, +3, ×2, +3, ×2
   *
   * Answer = 90
   */

  const checkLevel4 = () => {
    if (Number(level4Answer) !== 90) {
      setIsCorrect(false);
      setMessage(
        "Look carefully at what happens between each pair of numbers. The rule alternates.",
      );
      return;
    }

    completeLevel(160);
  };

  /*
   * LEVEL 5
   *
   * 10 → 15 → 30 → 35 → 70 → 75 → ?
   *
   * +5, ×2, +5, ×2, +5, ×2
   *
   * Answer = 150
   */

  const checkLevel5 = () => {
    if (Number(level5Answer) !== 150) {
      setIsCorrect(false);
      setMessage(
        "Look carefully at what happens between the numbers. Two operations are alternating.",
      );
      return;
    }

    completeLevel(180);
  };

  /*
   * LEVEL 6
   *
   * Visual pattern.
   *
   * The student constructs the next step.
   *
   * Expected cells:
   *
   * ■ ■ ■
   * ■ ■ □
   * ■ □ □
   *
   * We use a 3x3 grid.
   */

  const correctLevel6 = [6, 7, 8, 11, 13];

  const checkLevel6 = () => {
    const sorted = [...selectedCells].sort((a, b) => a - b);

    const correct =
      sorted.length === correctLevel6.length &&
      sorted.every((value, index) => value === correctLevel6[index]);

    if (!correct) {
      setIsCorrect(false);

      setMessage(
        "Look at how the same shape rotates from one step to the next.",
      );

      return;
    }

    completeLevel(200);
  };

  /*
   * LEVEL 7
   *
   * 5 → 11 → 19 → 29 → 41 → ?
   *
   * Differences:
   * 6,8,10,12
   *
   * Next = +14
   *
   * Answer = 55
   */

  const checkLevel7 = () => {
    if (Number(level7Answer) !== 55) {
      setIsCorrect(false);
      setMessage("Try examining the differences between consecutive numbers.");
      return;
    }

    completeLevel(hintUsed ? 160 : 220);
  };

  /*
   * LEVEL 8
   *
   * Three final challenges.
   */

  const checkLevel8 = () => {
  const firstCorrect =
    Number(level8Answer1) === 49;

  const secondCorrect =
    Number(level8Answer2) === 158;

  const thirdCorrect =
    Number(level8Answer3) === 37;

  if (
    !firstCorrect ||
    !secondCorrect ||
    !thirdCorrect
  ) {
    setIsCorrect(false);

    setMessage(
      "Not all three patterns are correct. Think carefully about the rule behind each one."
    );

    return;
  }

  completeLevel(300);

  setGameCompleted(true);
};

  const toggleCell = (index: number) => {
    if (selectedCells.includes(index)) {
      setSelectedCells(selectedCells.filter((cell) => cell !== index));
    } else {
      setSelectedCells([...selectedCells, index]);
    }

    resetMessage();
  };

  const renderLevel = () => {
    switch (level) {
      case 1:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>NUMBER SEQUENCE</div>

              <div className={styles.sequence}>
                {[7, 11, 17, 25, 35].map((number, index) => (
                  <div key={number} className={styles.sequenceGroup}>
                    <div className={styles.number}>{number}</div>

                    {index < 4 && <div className={styles.arrow}>→</div>}
                  </div>
                ))}

                <div className={styles.question}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Find the differences</h3>
                  <p>What is added each time?</p>
                </div>
              </div>

              <div className={styles.differenceRow}>
                {level1Diffs.map((value, index) => (
                  <div key={index} className={styles.differenceBox}>
                    <span>Difference {index + 1}</span>

                    <div className={styles.inputWrapper}>
                      <span>+</span>

                      <input
                        type="number"
                        value={value}
                        onChange={(event) => {
                          const updated = [...level1Diffs];

                          updated[index] = event.target.value;

                          setLevel1Diffs(updated);
                          resetMessage();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Continue the difference pattern</h3>

                  <p>What should the next difference be?</p>
                </div>
              </div>

              <div className={styles.singleInput}>
                <span>Next difference</span>

                <div className={styles.inputWrapper}>
                  <span>+</span>

                  <input
                    type="number"
                    value={level1NextDiff}
                    onChange={(event) => {
                      setLevel1NextDiff(event.target.value);
                      resetMessage();
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>3</span>

                <div>
                  <h3>Predict the next number</h3>

                  <p>Apply your next difference to 35.</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>35 +</span>

                <strong>{level1NextDiff || "?"}</strong>

                <span>=</span>

                <input
                  type="number"
                  value={level1Answer}
                  onChange={(event) => {
                    setLevel1Answer(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>
                FIND THE MISSING NUMBER
              </div>

              <div className={styles.sequence}>
                <div className={styles.number}>2</div>
                <div className={styles.arrow}>→</div>
                <div className={styles.number}>5</div>
                <div className={styles.arrow}>→</div>

                <div className={styles.question}>?</div>

                <div className={styles.arrow}>→</div>
                <div className={styles.number}>17</div>
                <div className={styles.arrow}>→</div>
                <div className={styles.number}>26</div>
                <div className={styles.arrow}>→</div>
                <div className={styles.number}>37</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Discover the difference pattern</h3>
                  <p>Enter the five differences.</p>
                </div>
              </div>

              <div className={styles.differenceRow}>
                {level2Diffs.map((value, index) => (
                  <div key={index} className={styles.differenceBox}>
                    <span>Difference {index + 1}</span>

                    <div className={styles.inputWrapper}>
                      <span>+</span>

                      <input
                        type="number"
                        value={value}
                        onChange={(event) => {
                          const updated = [...level2Diffs];

                          updated[index] = event.target.value;

                          setLevel2Diffs(updated);
                          resetMessage();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Find the missing number</h3>
                  <p>What number belongs in the missing postion ?</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>Missing number:</span>

                <input
                  type="number"
                  value={level2Missing}
                  onChange={(event) => {
                    setLevel2Missing(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>SECOND-LEVEL PATTERN</div>

              <div className={styles.sequence}>
                {[3, 6, 11, 18, 27].map((number, index) => (
                  <div key={number} className={styles.sequenceGroup}>
                    <div className={styles.number}>{number}</div>

                    {index < 4 && <div className={styles.arrow}>→</div>}
                  </div>
                ))}

                <div className={styles.question}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Reveal the first pattern</h3>
                  <p>Find the differences.</p>
                </div>
              </div>

              <div className={styles.differenceRow}>
                {level3Differences.map((value, index) => (
                  <div key={index} className={styles.differenceBox}>
                    <span>Difference {index + 1}</span>

                    <div className={styles.inputWrapper}>
                      <span>+</span>

                      <input
                        type="number"
                        value={value}
                        onChange={(event) => {
                          const updated = [...level3Differences];

                          updated[index] = event.target.value;

                          setLevel3Differences(updated);
                          resetMessage();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Find the second pattern</h3>
                  <p>The differences are changing too.</p>
                </div>
              </div>

              <div className={styles.singleInput}>
                <span>Next difference</span>

                <div className={styles.inputWrapper}>
                  <span>+</span>

                  <input
                    type="number"
                    value={level3NextDifference}
                    onChange={(event) => {
                      setLevel3NextDifference(event.target.value);
                      resetMessage();
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>3</span>

                <div>
                  <h3>Predict the next number</h3>
                  <p>Apply the next difference to 27.</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>27 +</span>

                <strong>{level3NextDifference || "?"}</strong>

                <span>=</span>

                <input
                  type="number"
                  value={level3Answer}
                  onChange={(event) => {
                    setLevel3Answer(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>COMPOUND RULE</div>

              <div className={styles.sequence}>
                {[6, 9, 18, 21, 42, 45].map((number, index) => (
                  <div key={number} className={styles.sequenceGroup}>
                    <div className={styles.number}>{number}</div>

                    {index < 5 && <div className={styles.arrow}>→</div>}
                  </div>
                ))}

                <div className={styles.question}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>What comes next?</h3>

                  <p>Find the hidden rule and predict the next number.</p>
                </div>
              </div>

              
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Predict the next number</h3>
                  <p>What comes after 45?</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>45 →</span>

                <input
                  type="number"
                  value={level4Answer}
                  onChange={(event) => {
                    setLevel4Answer(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>ALTERNATING RULE</div>

              <div className={styles.sequence}>
                {[10, 15, 30, 35, 70, 75].map((number, index) => (
                  <div key={number} className={styles.sequenceGroup}>
                    <div className={styles.number}>{number}</div>

                    {index < 5 && <div className={styles.arrow}>→</div>}
                  </div>
                ))}

                <div className={styles.question}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>What comes next?</h3>

                  <p>
                    Find the two alternating rules and predict the next number.
                  </p>
                </div>
              </div>

              
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Predict the next number</h3>
                  <p>Apply the next operation to 75.</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>75 →</span>

                <input
                  type="number"
                  value={level5Answer}
                  onChange={(event) => {
                    setLevel5Answer(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 6:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>VISUAL TRANSFORMATION</div>

              <div className={styles.visualSequence}>
                {/* STEP 1 */}
                <div className={styles.visualStep}>
                  <span>STEP 1</span>

                  <div className={styles.patternMiniGrid}>
                    {Array.from({ length: 25 }).map((_, index) => (
                      <div
                        key={index}
                        className={
                          [6, 7, 11, 16, 17].includes(index)
                            ? styles.miniFilled
                            : styles.miniEmpty
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.arrow}>→</div>

                {/* STEP 2 */}
                <div className={styles.visualStep}>
                  <span>STEP 2</span>

                  <div className={styles.patternMiniGrid}>
                    {Array.from({ length: 25 }).map((_, index) => (
                      <div
                        key={index}
                        className={
                          [11, 13, 16, 17, 18].includes(index)
                            ? styles.miniFilled
                            : styles.miniEmpty
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.arrow}>→</div>

                {/* STEP 3 */}
                <div className={styles.visualStep}>
                  <span>STEP 3</span>

                  <div className={styles.patternMiniGrid}>
                    {Array.from({ length: 25 }).map((_, index) => (
                      <div
                        key={index}
                        className={
                          [7, 8, 13, 17, 18].includes(index)
                            ? styles.miniFilled
                            : styles.miniEmpty
                        }
                      />
                    ))}
                  </div>
                </div>

                <div className={styles.arrow}>→</div>

                <div className={styles.questionVisual}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Construct Step 4</h3>

                  <p>
                    The same shape rotates 90° each time. Construct the next
                    position.
                  </p>
                </div>
              </div>

              <div className={styles.largePatternGrid}>
                {Array.from({ length: 25 }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Grid cell ${index + 1}`}
                    className={
                      selectedCells.includes(index)
                        ? styles.gridCellSelected
                        : styles.gridCell
                    }
                    onClick={() => toggleCell(index)}
                  />
                ))}
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>HIDDEN RULE</div>

              <div className={styles.sequence}>
                {[5, 11, 19, 29, 41].map((number, index) => (
                  <div key={number} className={styles.sequenceGroup}>
                    <div className={styles.number}>{number}</div>

                    {index < 4 && <div className={styles.arrow}>→</div>}
                  </div>
                ))}

                <div className={styles.question}>?</div>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Find the hidden rule</h3>

                  <p>Predict the next number. No difference table is given.</p>
                </div>
              </div>

              {!hintUsed ? (
                <button
                  type="button"
                  className={styles.hintButton}
                  onClick={() => {
                    setHintUsed(true);

                    setHintsUsed((previous) => previous + 1);

                    setScore((previous) => Math.max(0, previous - 20));
                  }}
                >
                  🔍 Reveal a hint
                </button>
              ) : (
                <div className={styles.hintBox}>
                  <strong>Hint</strong>

                  <p>Look at the differences between consecutive numbers.</p>

                  <p>They are increasing by 2 each time.</p>
                </div>
              )}
            </div>

            <div className={styles.workspace}>
              <div className={styles.finalAnswer}>
                <span>Next number:</span>

                <input
                  type="number"
                  value={level7Answer}
                  onChange={(event) => {
                    setLevel7Answer(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );

      case 8:
        return (
          <>
            <div className={styles.sequenceCard}>
              <div className={styles.sequenceLabel}>👑 PATTERN MASTER</div>

              <div className={styles.bossIntro}>
                <h3>Three patterns. One final challenge.</h3>

                <p>Solve all three to complete the Pattern Detective module.</p>
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>1</span>

                <div>
                  <h3>Square Pattern</h3>

                  <p>4 → 9 → 16 → 25 → 36 → ?</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>Answer:</span>

                <input
                  type="number"
                  value={level8Answer1}
                  onChange={(event) => {
                    setLevel8Answer1(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>2</span>

                <div>
                  <h3>Compound Pattern</h3>

                  <p>3 → 8 → 18 → 38 → 78 → ?</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>Answer:</span>

                <input
                  type="number"
                  value={level8Answer2}
                  onChange={(event) => {
                    setLevel8Answer2(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>

            <div className={styles.workspace}>
              <div className={styles.sectionTitle}>
                <span>3</span>

                <div>
                  <h3>Growing Difference</h3>

                  <p>2 → 5 → 10 → 17 → 26 → ?</p>
                </div>
              </div>

              <div className={styles.finalAnswer}>
                <span>Answer:</span>

                <input
                  type="number"
                  value={level8Answer3}
                  onChange={(event) => {
                    setLevel8Answer3(event.target.value);
                    resetMessage();
                  }}
                />
              </div>
            </div>
          </>
        );
    }
  };

  if (gameCompleted) {
  return (
    <div className={styles.game}>
      <div className={styles.gameComplete}>

        <div className={styles.trophy}>
          🏆
        </div>

        <span className={styles.completeLabel}>
          PATTERN MASTER
        </span>

        <h1>
          Game Complete!
        </h1>

        <p className={styles.completeSubtitle}>
          You successfully completed all 8
          Pattern Detective levels.
        </p>


        {/* XP */}

        <div className={styles.xpResult}>

          <span className={styles.xpStar}>
            ⭐
          </span>

          <div>
            <span className={styles.xpLabel}>
              TOTAL XP EARNED
            </span>

            <strong>
              {score} XP
            </strong>
          </div>

        </div>


        {/* STATS */}

        <div className={styles.resultStats}>

          <div className={styles.resultStat}>
            <strong>8 / 8</strong>

            <span>
              Levels Completed
            </span>
          </div>

          <div className={styles.resultStat}>
            <strong>100%</strong>

            <span>
              Completion
            </span>
          </div>

          <div className={styles.resultStat}>
            <strong>
              {hintsUsed}
            </strong>

            <span>
              Hints Used
            </span>
          </div>

        </div>


        {/* MESSAGE */}

        <div className={styles.completeMessage}>

          <span>🎉</span>

          <div>
            <strong>
              Excellent Work!
            </strong>

            <p>
              You discovered number patterns,
              difference patterns, compound rules
              and visual transformations.
            </p>
          </div>

        </div>


        {/* BACK TO MODULE */}

        <Link
          href="/student/subjects/mathematics/chapters/1"
          className={styles.backToModule}
        >
          ← Back to Chapter
        </Link>

      </div>
    </div>
  );
}

  return (
    <div className={styles.game}>
      <div className={styles.gameHeader}>
        <div>
          <span className={styles.levelLabel}>LEVEL {level}</span>

          <h2>Pattern Detective</h2>
        </div>

        <div className={styles.score}>
          <span>⭐</span>

          <strong>{score} XP</strong>
        </div>
      </div>

      <div className={styles.instruction}>
        <span className={styles.instructionIcon}>🔎</span>

        <div>
          <strong>
            {level === 8 ? "Final challenge" : "Find the hidden pattern"}
          </strong>

          <p>Study the pattern carefully. Do not just guess the next number.</p>
        </div>
      </div>

      {renderLevel()}

      {message && (
        <div
          className={`${styles.message} ${
            isCorrect ? styles.success : styles.error
          }`}
        >
          <span>{isCorrect ? "✓" : "!"}</span>

          <p>{message}</p>
        </div>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.resetButton}
          onClick={() => window.location.reload()}
        >
          Reset
        </button>

        <button
          type="button"
          className={styles.checkButton}
          onClick={() => {
            switch (level) {
              case 1:
                checkLevel1();
                break;

              case 2:
                checkLevel2();
                break;

              case 3:
                checkLevel3();
                break;

              case 4:
                checkLevel4();
                break;

              case 5:
                checkLevel5();
                break;

              case 6:
                checkLevel6();
                break;

              case 7:
                checkLevel7();
                break;

              case 8:
                checkLevel8();
                break;
            }
          }}
        >
          {level === 8 ? "Complete Challenge →" : "Check Pattern →"}
        </button>
      </div>

      {isCorrect && (
        <div className={styles.successPanel}>
          <div className={styles.successIcon}>✓</div>

          <div>
            <strong>
              {level === 8
                ? "Pattern Detective Complete!"
                : `Level ${level} Complete!`}
            </strong>

            <p>
              {level === 8
                ? "You mastered all eight levels."
                : "Excellent reasoning. The next challenge is harder."}
            </p>
          </div>

          {level < 8 && (
            <button type="button" onClick={nextLevel}>
              Next Level →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
