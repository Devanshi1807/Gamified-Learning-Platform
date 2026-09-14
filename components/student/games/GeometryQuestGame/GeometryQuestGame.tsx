"use client";

import { useState } from "react";

import styles from "./GeometryQuestGame.module.css";

export default function GeometryQuestGame() {
  /* =========================
     LEVEL
  ========================= */

  const [level, setLevel] = useState(1);

  /* =========================
     ROUND
  ========================= */

  const [round, setRound] = useState(1);

  /* =========================
     LEVEL 1
  ========================= */

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState<boolean | null>(null);

  /* =========================
     LEVEL 2
  ========================= */

  const [selectedRays, setSelectedRays] = useState<string[]>([]);

  const [roundAnswered, setRoundAnswered] = useState(false);
  const [roundCorrect, setRoundCorrect] = useState(false);

  const level2Rounds = [
    {
      target: ["OA", "OB"],
      angle: "∠AOB",
    },
    {
      target: ["OA", "OD"],
      angle: "∠AOD",
    },
    {
      target: ["OC", "OD"],
      angle: "∠COD",
    },
    {
      target: ["OC", "OB"],
      angle: "∠COB",
    },
  ];

  /* LEVEL 3 */

  const [level3Selected, setLevel3Selected] = useState<string | null>(null);

  const [level3Answered, setLevel3Answered] = useState(false);

  const [level3Correct, setLevel3Correct] = useState(false);

  const level3Rounds = [
    {
      question: "Which angle is formed by rays OC and OB?",
      correct: "∠COB",
      options: ["∠COB", "∠AOC", "∠AOB", "∠AOD"],
    },
    {
      question: "Which angle is formed by rays OA and OC?",
      correct: "∠AOC",
      options: ["∠AOB", "∠AOC", "∠COD", "∠BOC"],
    },
    {
      question: "Which angle is formed by rays OA and OD?",
      correct: "∠AOD",
      options: ["∠AOD", "∠AOB", "∠COD", "∠BOC"],
    },
    {
      question: "Which angle is formed by rays OC and OD?",
      correct: "∠COD",
      options: ["∠AOC", "∠AOD", "∠COD", "∠AOB"],
    },
  ];

  const checkLevel3Round = () => {
    if (!level3Selected) return;

    const current = level3Rounds[round - 1];

    const isCorrect = level3Selected === current.correct;

    setLevel3Correct(isCorrect);
    setLevel3Answered(true);
  };

  const resetLevel3Round = () => {
    setLevel3Selected(null);
    setLevel3Answered(false);
    setLevel3Correct(false);
  };

  const nextLevel3Round = () => {
    if (round < level3Rounds.length) {
      setRound((previous) => previous + 1);
      resetLevel3Round();
    }
  };

  /*
  LEVEL 4
  */

  const [level4SelectedPoints, setLevel4SelectedPoints] = useState<number[]>(
    [],
  );

  const [level4Answered, setLevel4Answered] = useState(false);

  const [level4Correct, setLevel4Correct] = useState(false);

  const level4Rounds = [
    {
      type: "segment",
      instruction: "Construct a line segment from A to B.",
      correct: [0, 1],
    },
    {
      type: "ray",
      instruction: "Construct a ray starting at A and passing through C.",
      correct: [0, 2],
    },
    {
      type: "line",
      instruction: "Construct a line passing through B and D.",
      correct: [1, 3],
    },
    {
      type: "ray",
      instruction: "Construct a ray starting at B and passing through C.",
      correct: [1, 2],
    },
  ];

  const handleLevel4Point = (index: number) => {
    if (level4Answered) return;

    setLevel4SelectedPoints((previous) => {
      if (previous.includes(index)) {
        return previous.filter((point) => point !== index);
      }

      if (previous.length >= 2) {
        return previous;
      }

      return [...previous, index];
    });
  };

  const resetLevel4Round = () => {
    setLevel4SelectedPoints([]);
    setLevel4Answered(false);
    setLevel4Correct(false);
  };

  const checkLevel4Round = () => {
    if (level4SelectedPoints.length !== 2) return;

    const target = level4Rounds[round - 1].correct;

    const isCorrect =
      level4SelectedPoints[0] === target[0] &&
      level4SelectedPoints[1] === target[1];

    setLevel4Correct(isCorrect);
    setLevel4Answered(true);
  };

  /*
LEVEL 5 
*/

  const [level5Angle, setLevel5Angle] = useState(0);

  const [level5Answered, setLevel5Answered] = useState(false);

  const [level5Correct, setLevel5Correct] = useState(false);

  const level5Rounds = [
    {
      targetX: 480,
      targetY: 220,
      targetAngle: -3,
    },
    {
      targetX: 450,
      targetY: 100,
      targetAngle: -41,
    },
    {
      targetX: 390,
      targetY: 80,
      targetAngle: -52,
    },
    {
      targetX: 190,
      targetY: 100,
      targetAngle: -130,
    },
  ];

  const resetLevel5Round = () => {
    setLevel5Angle(0);
    setLevel5Answered(false);
    setLevel5Correct(false);
  };

  const checkLevel5Round = () => {
    const target = level5Rounds[round - 1].targetAngle;

    const difference = Math.abs(level5Angle - target);

    const normalizedDifference = Math.min(difference, 360 - difference);

    const isCorrect = normalizedDifference <= 8;

    setLevel5Correct(isCorrect);
    setLevel5Answered(true);
  };

  /*

LEVEL 6

 */

  const [level6Angle, setLevel6Angle] = useState(0);

  const [level6Answered, setLevel6Answered] = useState(false);

  const [level6Correct, setLevel6Correct] = useState(false);

  const level6Rounds = [
    {
      type: "acute",
      instruction: "Create an acute angle.",
      min: 20,
      max: 70,
    },
    {
      type: "obtuse",
      instruction: "Create an obtuse angle.",
      min: 110,
      max: 160,
    },
    {
      type: "near-right",
      instruction:
        "Create an angle closer to a right angle than to a straight angle.",
      min: 70,
      max: 110,
    },
    {
      type: "obtuse-boss",
      instruction: "Create an obtuse angle in the target zone.",
      min: 120,
      max: 150,
    },
  ];

  const resetLevel6Round = () => {
    setLevel6Angle(0);
    setLevel6Answered(false);
    setLevel6Correct(false);
  };

  const checkLevel6Round = () => {
    const current = level6Rounds[round - 1];

    const angle = Math.abs(level6Angle);

    const isCorrect = angle >= current.min && angle <= current.max;

    setLevel6Correct(isCorrect);
    setLevel6Answered(true);
  };

  /*
LEVEL 7 
*/

  const [level7Selected, setLevel7Selected] = useState<string[]>([]);
  const [level7Answered, setLevel7Answered] = useState(false);
  const [level7Correct, setLevel7Correct] = useState(false);

  const level7Rounds = [
    {
      question: "Select rays OA and OD.",
      correct: ["OA", "OD"],
      options: ["OA", "OB", "OC", "OD"],
    },
    {
      question: "Select the line segment connecting A and C.",
      correct: ["AC"],
      options: ["AB", "AC", "AD", "BC"],
    },
    {
      question: "Select all angles that have O as their vertex.",
      correct: ["∠AOB", "∠BOC", "∠COD"],
      options: ["∠AOB", "∠BOC", "∠COD", "∠ABC"],
    },
    {
      question: "Which three geometric objects are correctly identified?",
      correct: ["OA", "BC", "∠COD"],
      options: ["OA", "BD", "BC", "∠COD"],
    },
  ];

  const handleLevel7Selection = (item: string) => {
    if (level7Answered) return;

    setLevel7Selected((previous) => {
      if (previous.includes(item)) {
        return previous.filter((value) => value !== item);
      }

      return [...previous, item];
    });
  };

  const checkLevel7Round = () => {
    const current = level7Rounds[round - 1];

    const selected = [...level7Selected].sort();
    const correct = [...current.correct].sort();

    const isCorrect =
      selected.length === correct.length &&
      selected.every((value, index) => value === correct[index]);

    setLevel7Correct(isCorrect);
    setLevel7Answered(true);
  };

  const resetLevel7Round = () => {
    setLevel7Selected([]);
    setLevel7Answered(false);
    setLevel7Correct(false);
  };

  const nextLevel7Round = () => {
    if (round < level7Rounds.length) {
      setRound((previous) => previous + 1);

      resetLevel7Round();
    }
  };

  /**
   * LEVEL 8
   */

  const [level8Answers, setLevel8Answers] = useState<Record<number, string>>(
    {},
  );

  const [level8Answered, setLevel8Answered] = useState(false);

  const [level8Correct, setLevel8Correct] = useState(false);

  const level8Rounds = [
    {
      type: "parallel",
      instruction: "These two lines never meet. How are they related?",
      correct: "parallel",
    },
    {
      type: "intersecting",
      instruction: "These two lines cross each other. How are they related?",
      correct: "intersecting",
    },
    {
      type: "parallel-slanted",
      instruction:
        "These slanted lines remain the same distance apart. Classify them.",
      correct: "parallel",
    },
    {
      type: "mixed",
      instruction: "Classify all four diagrams correctly.",
      correct: "mixed",
    },
  ];

  const checkLevel8Round = () => {
    const current = level8Rounds[round - 1];

    if (current.type === "mixed") {
      const correctAnswers = {
        0: "parallel",
        1: "intersecting",
        2: "parallel",
        3: "intersecting",
      };

      const isCorrect =
        level8Answers[0] === correctAnswers[0] &&
        level8Answers[1] === correctAnswers[1] &&
        level8Answers[2] === correctAnswers[2] &&
        level8Answers[3] === correctAnswers[3];

      setLevel8Correct(isCorrect);
      setLevel8Answered(true);

      return;
    }

    const isCorrect = level8Answers[0] === current.correct;

    setLevel8Correct(isCorrect);
    setLevel8Answered(true);
  };

  const resetLevel8Round = () => {
    setLevel8Answers({});
    setLevel8Answered(false);
    setLevel8Correct(false);
  };

  const handleLevel8Answer = (diagramIndex: number, answer: string) => {
    if (level8Answered) return;

    setLevel8Answers((previous) => ({
      ...previous,
      [diagramIndex]: answer,
    }));
  };

  /*
LEVEL 9

*/

  const [level9Answer, setLevel9Answer] = useState("");

  const [level9Answered, setLevel9Answered] = useState(false);

  const [level9Correct, setLevel9Correct] = useState(false);

  const level9Rounds = [
    {
      question: "If ∠AOC = 120°, what is ∠COB?",
      answer: 60,
      relationship: "straight-line",
    },
    {
      question: "If ∠AOC = 35° and ∠AOB is a right angle, what is ∠COB?",
      answer: 55,
      relationship: "right-angle",
    },
    {
      question: "If ∠AOC = 72° and AOB is a straight line, what is ∠COB?",
      answer: 108,
      relationship: "straight-line",
    },
    {
      question:
        "Around point O, the angles are 90°, 120° and ?. Find the missing angle.",
      answer: 150,
      relationship: "around-point",
    },
  ];

  const checkLevel9Round = () => {
    const current = level9Rounds[round - 1];

    const answer = Number(level9Answer);

    const isCorrect = answer === current.answer;

    setLevel9Correct(isCorrect);
    setLevel9Answered(true);
  };

  const resetLevel9Round = () => {
    setLevel9Answer("");
    setLevel9Answered(false);
    setLevel9Correct(false);
  };

  const renderLevel9Diagram = (relationship: string) => {
    if (relationship === "straight-line") {
      return (
        <>
          <line
            x1="100"
            y1="230"
            x2="500"
            y2="230"
            className={styles.geometryLine}
          />

          <line
            x1="300"
            y1="230"
            x2="210"
            y2="110"
            className={styles.geometryLine}
          />

          <circle cx="300" cy="230" r="7" className={styles.vertexPoint} />

          <text x="85" y="225" className={styles.pointLabel}>
            A
          </text>

          <text x="505" y="225" className={styles.pointLabel}>
            B
          </text>

          <text x="195" y="100" className={styles.pointLabel}>
            C
          </text>

          <text x="310" y="220" className={styles.vertexLabel}>
            O
          </text>
        </>
      );
    }

    if (relationship === "right-angle") {
      return (
        <>
          <line
            x1="300"
            y1="230"
            x2="300"
            y2="90"
            className={styles.geometryLine}
          />

          <line
            x1="300"
            y1="230"
            x2="500"
            y2="230"
            className={styles.geometryLine}
          />

          <line
            x1="300"
            y1="230"
            x2="415"
            y2="135"
            className={styles.geometryLine}
          />

          <circle cx="300" cy="230" r="7" className={styles.vertexPoint} />

          <text x="290" y="80" className={styles.pointLabel}>
            A
          </text>

          <text x="505" y="225" className={styles.pointLabel}>
            B
          </text>

          <text x="420" y="125" className={styles.pointLabel}>
            C
          </text>

          <text x="310" y="220" className={styles.vertexLabel}>
            O
          </text>
        </>
      );
    }

    return (
      <>
        <line
          x1="300"
          y1="230"
          x2="500"
          y2="230"
          className={styles.geometryLine}
        />

        <line
          x1="300"
          y1="230"
          x2="110"
          y2="230"
          className={styles.geometryLine}
        />

        <line
          x1="300"
          y1="230"
          x2="180"
          y2="100"
          className={styles.geometryLine}
        />

        <line
          x1="300"
          y1="230"
          x2="430"
          y2="100"
          className={styles.geometryLine}
        />

        <circle cx="300" cy="230" r="7" className={styles.vertexPoint} />

        <text x="95" y="225" className={styles.pointLabel}>
          C
        </text>

        <text x="505" y="225" className={styles.pointLabel}>
          B
        </text>

        <text x="165" y="90" className={styles.pointLabel}>
          A
        </text>

        <text x="435" y="90" className={styles.pointLabel}>
          D
        </text>

        <text x="310" y="220" className={styles.vertexLabel}>
          O
        </text>
      </>
    );
  };

  /*

LEVEL 10

 */

  const [level10Stage, setLevel10Stage] = useState(1);

  const [level10Vertex, setLevel10Vertex] = useState<string | null>(null);

  const [level10Points, setLevel10Points] = useState<number[]>([]);

  const [level10Answer, setLevel10Answer] = useState("");

  const [level10Answered, setLevel10Answered] = useState(false);

  const [level10Correct, setLevel10Correct] = useState(false);

  const checkLevel10Stage1 = () => {
    const isCorrect = level10Vertex === "O";

    setLevel10Correct(isCorrect);
    setLevel10Answered(true);
  };

  const resetLevel10Stage1 = () => {
    setLevel10Vertex(null);
    setLevel10Answered(false);
    setLevel10Correct(false);
  };

  const checkLevel10Stage2 = () => {
    const isCorrect =
      level10Points.length === 2 &&
      level10Points[0] === 1 &&
      level10Points[1] === 2;

    setLevel10Correct(isCorrect);
    setLevel10Answered(true);
  };

  const resetLevel10Stage2 = () => {
    setLevel10Points([]);
    setLevel10Answered(false);
    setLevel10Correct(false);
  };

  const checkLevel10Stage3 = () => {
    const isCorrect = Number(level10Answer) === 60;

    setLevel10Correct(isCorrect);
    setLevel10Answered(true);
  };

  /* =========================
     LEVEL 1 FUNCTIONS
  ========================= */

  const handlePointClick = (point: string) => {
    if (answered) return;

    setSelectedPoint(point);
  };

  const checkLevel1 = () => {
    if (!selectedPoint) return;

    const isCorrect = selectedPoint === "O";

    setCorrect(isCorrect);
    setAnswered(true);
  };

  const resetLevel1 = () => {
    setSelectedPoint(null);
    setAnswered(false);
    setCorrect(null);
  };

  /* =========================
     LEVEL 2 FUNCTIONS
  ========================= */

  const handleRayClick = (ray: string) => {
    if (roundAnswered) return;

    setSelectedRays((previous) => {
      if (previous.includes(ray)) {
        return previous.filter((item) => item !== ray);
      }

      if (previous.length >= 2) {
        return previous;
      }

      return [...previous, ray];
    });
  };

  const checkLevel2Round = () => {
    if (selectedRays.length !== 2) return;

    const target = level2Rounds[round - 1].target;

    const sortedSelected = [...selectedRays].sort();
    const sortedTarget = [...target].sort();

    const isCorrect =
      sortedSelected[0] === sortedTarget[0] &&
      sortedSelected[1] === sortedTarget[1];

    setRoundCorrect(isCorrect);
    setRoundAnswered(true);
  };

  const resetLevel2Round = () => {
    setSelectedRays([]);
    setRoundAnswered(false);
    setRoundCorrect(false);
  };

  const nextLevel2Round = () => {
    if (round < level2Rounds.length) {
      setRound((previous) => previous + 1);
      resetLevel2Round();
    }
  };

  /* =========================
     LEVEL 1 UI
  ========================= */

  const renderLevel1 = () => {
    return (
      <>
        {/* =========================
            INSTRUCTION
        ========================= */}

        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🔎</div>

          <div>
            <strong>Find the vertex</strong>

            <p>
              The highlighted angle is shown in the diagram. Click the point
              where the two arms of the angle meet.
            </p>
          </div>
        </div>

        {/* =========================
            DIAGRAM
        ========================= */}

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>ANGLE DIAGRAM</div>

          <svg
            viewBox="0 0 600 400"
            className={styles.diagram}
            role="img"
            aria-label="Angle diagram"
          >
            {/* ANGLE HIGHLIGHT */}

            <path
              d="M 300 210 L 300 150 A 60 60 0 0 1 360 210 Z"
              className={styles.angleHighlight}
            />

            {/* MAIN LINES / RAYS */}

            <line
              x1="120"
              y1="210"
              x2="480"
              y2="210"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="180"
              y2="90"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="420"
              y2="90"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="210"
              y2="330"
              className={styles.geometryLine}
            />

            {/* A */}

            <g
              className={`${styles.pointGroup} ${
                selectedPoint === "A" ? styles.selectedPoint : ""
              }`}
              onClick={() => handlePointClick("A")}
            >
              <circle cx="180" cy="90" r="24" className={styles.hitArea} />

              <circle cx="180" cy="90" r="5" className={styles.point} />

              <text x="164" y="75" className={styles.pointLabel}>
                A
              </text>
            </g>

            {/* B */}

            <g
              className={`${styles.pointGroup} ${
                selectedPoint === "B" ? styles.selectedPoint : ""
              }`}
              onClick={() => handlePointClick("B")}
            >
              <circle cx="480" cy="210" r="24" className={styles.hitArea} />

              <circle cx="480" cy="210" r="5" className={styles.point} />

              <text x="488" y="203" className={styles.pointLabel}>
                B
              </text>
            </g>

            {/* C */}

            <g
              className={`${styles.pointGroup} ${
                selectedPoint === "C" ? styles.selectedPoint : ""
              }`}
              onClick={() => handlePointClick("C")}
            >
              <circle cx="210" cy="330" r="24" className={styles.hitArea} />

              <circle cx="210" cy="330" r="5" className={styles.point} />

              <text x="195" y="355" className={styles.pointLabel}>
                C
              </text>
            </g>

            {/* O — VERTEX */}

            <g
              className={`${styles.pointGroup} ${
                selectedPoint === "O" ? styles.selectedPoint : ""
              }`}
              onClick={() => handlePointClick("O")}
            >
              <circle cx="300" cy="210" r="30" className={styles.hitArea} />

              <circle cx="300" cy="210" r="7" className={styles.vertexPoint} />

              <text x="310" y="202" className={styles.vertexLabel}>
                O
              </text>
            </g>

            {/* D */}

            <g
              className={`${styles.pointGroup} ${
                selectedPoint === "D" ? styles.selectedPoint : ""
              }`}
              onClick={() => handlePointClick("D")}
            >
              <circle cx="420" cy="90" r="24" className={styles.hitArea} />

              <circle cx="420" cy="90" r="5" className={styles.point} />

              <text x="430" y="75" className={styles.pointLabel}>
                D
              </text>
            </g>
          </svg>
        </div>

        {/* =========================
            SELECTION
        ========================= */}

        <div className={styles.selectionArea}>
          <span>Your selection</span>

          <strong>
            {selectedPoint ? `Point ${selectedPoint}` : "Select a point"}
          </strong>
        </div>

        {/* =========================
            FEEDBACK
        ========================= */}

        {answered && (
          <div
            className={correct ? styles.correctFeedback : styles.wrongFeedback}
          >
            <span>{correct ? "✓" : "!"}</span>

            <div>
              <strong>{correct ? "Correct!" : "Not quite!"}</strong>

              <p>
                {correct
                  ? "O is the vertex because the two arms of the highlighted angle meet at O."
                  : "Look for the point where the two arms of the highlighted angle meet."}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            CONTROLS
        ========================= */}

        <div className={styles.controls}>
          {!answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={!selectedPoint}
              onClick={checkLevel1}
            >
              Check Answer →
            </button>
          ) : correct ? (
            <button
              type="button"
              className={styles.nextButton}
              onClick={() => {
                setLevel(2);
                setRound(1);

                setSelectedPoint(null);
                setAnswered(false);
                setCorrect(null);

                setSelectedRays([]);
                setRoundAnswered(false);
                setRoundCorrect(false);
              }}
            >
              Next Level →
            </button>
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel1}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  /* =========================
     LEVEL 2 UI
  ========================= */

  const renderLevel2 = () => {
    const currentRound = level2Rounds[round - 1];

    return (
      <>
        {/* =========================
            INSTRUCTION
        ========================= */}

        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🔦</div>

          <div>
            <strong>Ray Hunter</strong>

            <p>
              Select the two rays that form{" "}
              <strong>{currentRound.angle}</strong>. Click a ray to select it.
            </p>
          </div>
        </div>

        {/* =========================
            DIAGRAM
        ========================= */}

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>RAY DIAGRAM</div>

          <svg
            viewBox="0 0 600 400"
            className={styles.diagram}
            role="img"
            aria-label="Ray diagram"
          >
            {/* OA */}

            <line
              x1="300"
              y1="210"
              x2="170"
              y2="90"
              className={`${styles.geometryLine} ${
                selectedRays.includes("OA") ? styles.selectedRayLine : ""
              }`}
            />

            <line
              x1="300"
              y1="210"
              x2="470"
              y2="210"
              className={`${styles.geometryLine} ${
                selectedRays.includes("OB") ? styles.selectedRayLine : ""
              }`}
            />

            <line
              x1="300"
              y1="210"
              x2="190"
              y2="330"
              className={`${styles.geometryLine} ${
                selectedRays.includes("OC") ? styles.selectedRayLine : ""
              }`}
            />

            <line
              x1="300"
              y1="210"
              x2="430"
              y2="90"
              className={`${styles.geometryLine} ${
                selectedRays.includes("OD") ? styles.selectedRayLine : ""
              }`}
            />

            {/* RAY OA HIT AREA */}

            <line
              x1="300"
              y1="210"
              x2="170"
              y2="90"
              className={styles.rayHitArea}
              onClick={() => handleRayClick("OA")}
            />

            {/* RAY OB HIT AREA */}

            <line
              x1="300"
              y1="210"
              x2="470"
              y2="210"
              className={styles.rayHitArea}
              onClick={() => handleRayClick("OB")}
            />

            {/* RAY OC HIT AREA */}

            <line
              x1="300"
              y1="210"
              x2="190"
              y2="330"
              className={styles.rayHitArea}
              onClick={() => handleRayClick("OC")}
            />

            {/* RAY OD HIT AREA */}

            <line
              x1="300"
              y1="210"
              x2="430"
              y2="90"
              className={styles.rayHitArea}
              onClick={() => handleRayClick("OD")}
            />

            {/* LABELS */}

            <text x="155" y="80" className={styles.pointLabel}>
              A
            </text>

            <text x="480" y="215" className={styles.pointLabel}>
              B
            </text>

            <text x="175" y="350" className={styles.pointLabel}>
              C
            </text>

            <text x="435" y="80" className={styles.pointLabel}>
              D
            </text>

            <circle cx="300" cy="210" r="7" className={styles.vertexPoint} />

            <text x="310" y="202" className={styles.vertexLabel}>
              O
            </text>
          </svg>
        </div>

        {/* =========================
            SELECTION
        ========================= */}

        <div className={styles.selectionArea}>
          <span>Selected rays</span>

          <strong>
            {selectedRays.length > 0
              ? selectedRays.join(" , ")
              : "Select two rays"}
          </strong>
        </div>

        {/* =========================
            FEEDBACK
        ========================= */}

        {roundAnswered && (
          <div
            className={
              roundCorrect ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{roundCorrect ? "✓" : "!"}</span>

            <div>
              <strong>{roundCorrect ? "Correct!" : "Not quite!"}</strong>

              <p>
                {roundCorrect
                  ? `The two rays forming ${currentRound.angle} are ${currentRound.target[0]} and ${currentRound.target[1]}.`
                  : `Look at the two arms that form ${currentRound.angle}.`}
              </p>
            </div>
          </div>
        )}

        {/* =========================
            CONTROLS
        ========================= */}

        <div className={styles.controls}>
          {!roundAnswered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={selectedRays.length !== 2}
              onClick={checkLevel2Round}
            >
              Check Answer →
            </button>
          ) : roundCorrect ? (
            round < level2Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={nextLevel2Round}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(3);
                  setRound(1);

                  setSelectedRays([]);
                  setRoundAnswered(false);
                  setRoundCorrect(false);
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel2Round}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel3 = () => {
    const current = level3Rounds[round - 1];

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🧩</div>

          <div>
            <strong>Angle Match</strong>

            <p>
              Study the diagram and select the name of the angle described in
              the question.
            </p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>GEOMETRY DIAGRAM</div>

          <svg viewBox="0 0 600 400" className={styles.diagram}>
            <line
              x1="300"
              y1="210"
              x2="150"
              y2="90"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="480"
              y2="210"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="190"
              y2="330"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="210"
              x2="430"
              y2="330"
              className={styles.geometryLine}
            />

            <circle cx="300" cy="210" r="7" className={styles.vertexPoint} />

            <text x="312" y="202" className={styles.vertexLabel}>
              O
            </text>

            <text x="135" y="80" className={styles.pointLabel}>
              A
            </text>

            <text x="490" y="215" className={styles.pointLabel}>
              B
            </text>

            <text x="175" y="350" className={styles.pointLabel}>
              C
            </text>

            <text x="440" y="350" className={styles.pointLabel}>
              D
            </text>
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>{round}</span>

            <div>
              <h3>{current.question}</h3>

              <p>Choose the correct angle name.</p>
            </div>
          </div>

          <div className={styles.angleOptions}>
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  level3Selected === option
                    ? styles.angleOptionSelected
                    : styles.angleOption
                }
                onClick={() => {
                  if (level3Answered) return;

                  setLevel3Selected(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {level3Answered && (
          <div
            className={
              level3Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level3Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level3Correct ? "Correct!" : "Not quite!"}</strong>

              <p>
                {level3Correct
                  ? `${current.correct} is the correct angle name.`
                  : "Remember that the vertex must always be the middle letter."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level3Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={!level3Selected}
              onClick={checkLevel3Round}
            >
              Check Answer →
            </button>
          ) : level3Correct ? (
            round < level3Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={nextLevel3Round}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(4);
                  setRound(1);
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel3Round}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  const constructionPoints = [
    { x: 100, y: 100, label: "A" },
    { x: 250, y: 100, label: "B" },
    { x: 400, y: 100, label: "C" },
    { x: 500, y: 250, label: "D" },
    { x: 250, y: 350, label: "E" },
  ];

  const currentLevel4Round = level4Rounds[round - 1];

  const renderLevel4 = () => {
    const current = level4Rounds[round - 1];

    const selectedPoints = level4SelectedPoints.map(
      (index) => constructionPoints[index],
    );

    return (
      <>
        {/* =========================
          INSTRUCTION
      ========================= */}

        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🏗️</div>

          <div>
            <strong>Geometry Builder</strong>

            <p>
              {current.instruction}
              Select the required points on the board.
            </p>
          </div>
        </div>

        {/* =========================
          CONSTRUCTION BOARD
      ========================= */}

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>CONSTRUCTION BOARD</div>

          <svg
            viewBox="0 0 600 450"
            className={styles.constructionBoard}
            role="img"
            aria-label="Geometry construction board"
          >
            {/* GRID */}

            {Array.from({ length: 6 }).map((_, index) => {
              const position = 50 + index * 100;

              return (
                <g key={`grid-${index}`}>
                  <line
                    x1={position}
                    y1="50"
                    x2={position}
                    y2="400"
                    className={styles.gridLine}
                  />

                  <line
                    x1="50"
                    y1={position}
                    x2="550"
                    y2={position}
                    className={styles.gridLine}
                  />
                </g>
              );
            })}

            {/* =====================
              CONSTRUCTED GEOMETRY
          ===================== */}

            {selectedPoints.length === 2 && current.type === "segment" && (
              <line
                x1={selectedPoints[0].x}
                y1={selectedPoints[0].y}
                x2={selectedPoints[1].x}
                y2={selectedPoints[1].y}
                className={styles.constructedLine}
              />
            )}

            {selectedPoints.length === 2 && current.type === "ray" && (
              <line
                x1={selectedPoints[0].x}
                y1={selectedPoints[0].y}
                x2={selectedPoints[1].x}
                y2={selectedPoints[1].y}
                className={styles.constructedRay}
                markerEnd="url(#arrow)"
              />
            )}

            {selectedPoints.length === 2 && current.type === "line" && (
              <line
                x1={selectedPoints[0].x}
                y1={selectedPoints[0].y}
                x2={selectedPoints[1].x}
                y2={selectedPoints[1].y}
                className={styles.constructedLine}
              />
            )}

            {/* =====================
              ARROW MARKER
          ===================== */}

            <defs>
              <marker
                id="arrow"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
                orient="auto"
              >
                <polygon
                  points="0,0 10,5 0,10"
                  className={styles.arrowMarker}
                />
              </marker>
            </defs>

            {/* =====================
              POINTS
          ===================== */}

            {constructionPoints.map((point, index) => {
              const selected = level4SelectedPoints.includes(index);

              return (
                <g
                  key={point.label}
                  className={styles.constructionPoint}
                  onClick={() => handleLevel4Point(index)}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="28"
                    className={styles.pointHitArea}
                  />

                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={selected ? 9 : 6}
                    className={
                      selected
                        ? styles.selectedConstructionPoint
                        : styles.constructionDot
                    }
                  />

                  <text
                    x={point.x + 10}
                    y={point.y - 12}
                    className={styles.constructionLabel}
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* =========================
          SELECTION
      ========================= */}

        <div className={styles.selectionArea}>
          <span>Selected points</span>

          <strong>
            {selectedPoints.length === 0
              ? "Select two points"
              : selectedPoints.map((point) => point.label).join(" → ")}
          </strong>
        </div>

        {/* =========================
          FEEDBACK
      ========================= */}

        {level4Answered && (
          <div
            className={
              level4Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level4Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level4Correct ? "Correct!" : "Not quite!"}</strong>

              <p>
                {level4Correct
                  ? current.type === "segment"
                    ? "A line segment has two endpoints."
                    : current.type === "ray"
                      ? "A ray starts at one endpoint and continues in one direction."
                      : "A line continues in both directions."
                  : "Check which points the construction should start from and pass through."}
              </p>
            </div>
          </div>
        )}

        {/* =========================
          CONTROLS
      ========================= */}

        <div className={styles.controls}>
          {!level4Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={level4SelectedPoints.length !== 2}
              onClick={checkLevel4Round}
            >
              Check Construction →
            </button>
          ) : level4Correct ? (
            round < level4Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setRound((previous) => previous + 1);

                  resetLevel4Round();
                }}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(5);
                  setRound(1);

                  resetLevel4Round();
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel4Round}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel5 = () => {
    const current = level5Rounds[round - 1];

    const centerX = 300;
    const centerY = 230;
    const beamLength = 190;

    const radians = (level5Angle * Math.PI) / 180;

    const beamEndX = centerX + beamLength * Math.cos(radians);

    const beamEndY = centerY + beamLength * Math.sin(radians);

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🔦</div>

          <div>
            <strong>Laser Beam Challenge</strong>

            <p>Rotate the laser so that the beam reaches the target.</p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>LASER TARGET</div>

          <svg viewBox="0 0 600 450" className={styles.constructionBoard}>
            {/* Target zone */}

            <circle
              cx={current.targetX}
              cy={current.targetY}
              r="24"
              className={styles.targetZone}
            />

            <circle
              cx={current.targetX}
              cy={current.targetY}
              r="7"
              className={styles.targetPoint}
            />

            <text
              x={current.targetX + 12}
              y={current.targetY - 12}
              className={styles.targetLabel}
            >
              TARGET
            </text>

            {/* Origin */}

            <circle
              cx={centerX}
              cy={centerY}
              r="8"
              className={styles.vertexPoint}
            />

            <text
              x={centerX + 12}
              y={centerY - 12}
              className={styles.vertexLabel}
            >
              O
            </text>

            {/* Laser */}

            <line
              x1={centerX}
              y1={centerY}
              x2={beamEndX}
              y2={beamEndY}
              className={styles.laserBeam}
            />

            <circle
              cx={beamEndX}
              cy={beamEndY}
              r="9"
              className={styles.laserTip}
            />
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>1</span>

            <div>
              <h3>Rotate the laser</h3>

              <p>
                Adjust the direction until the beam reaches the target zone.
              </p>
            </div>
          </div>

          <div className={styles.angleControl}>
            <div className={styles.angleValue}>{Math.round(level5Angle)}°</div>

            <input
              type="range"
              min="-180"
              max="180"
              step="1"
              value={level5Angle}
              onChange={(event) => {
                setLevel5Angle(Number(event.target.value));

                setLevel5Answered(false);
                setLevel5Correct(false);
              }}
            />
          </div>
        </div>

        {level5Answered && (
          <div
            className={
              level5Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level5Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level5Correct ? "Target Hit!" : "Missed!"}</strong>

              <p>
                {level5Correct
                  ? "Excellent control. Your laser reached the target zone."
                  : "Adjust the laser direction and try again."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level5Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              onClick={checkLevel5Round}
            >
              Fire Laser →
            </button>
          ) : level5Correct ? (
            round < level5Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setRound((previous) => previous + 1);

                  resetLevel5Round();
                }}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(6);
                  setRound(1);

                  resetLevel5Round();
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => {
                setLevel5Answered(false);
                setLevel5Correct(false);
              }}
            >
              Adjust Laser
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel6 = () => {
    const current = level6Rounds[round - 1];

    const centerX = 300;
    const centerY = 250;
    const rayLength = 190;

    const radians = (level6Angle * Math.PI) / 180;

    const rayEndX = centerX + rayLength * Math.cos(radians);

    const rayEndY = centerY - rayLength * Math.sin(radians);

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🎯</div>

          <div>
            <strong>Angle Target</strong>

            <p>{current.instruction}</p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>ANGLE TARGET</div>

          <svg viewBox="0 0 600 450" className={styles.constructionBoard}>
            {/* BASE RAY */}

            <line
              x1={centerX}
              y1={centerY}
              x2={centerX + rayLength}
              y2={centerY}
              className={styles.geometryLine}
            />

            {/* ROTATING RAY */}

            <line
              x1={centerX}
              y1={centerY}
              x2={rayEndX}
              y2={rayEndY}
              className={styles.angleRay}
            />

            {/* VERTEX */}

            <circle
              cx={centerX}
              cy={centerY}
              r="8"
              className={styles.vertexPoint}
            />

            <text
              x={centerX + 12}
              y={centerY + 20}
              className={styles.vertexLabel}
            >
              O
            </text>

            {/* ANGLE ARC */}

            <path
              d={`M ${centerX + 65} ${centerY}
                A 65 65 0 0 0
                ${centerX + 65 * Math.cos(radians)}
                ${centerY - 65 * Math.sin(radians)}`}
              className={styles.angleArc}
            />
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>1</span>

            <div>
              <h3>Adjust the angle</h3>

              <p>
                Use the slider to rotate the ray. Decide when the angle matches
                the target.
              </p>
            </div>
          </div>

          <div className={styles.angleControl}>
            <div className={styles.angleValue}>
              {Math.round(Math.abs(level6Angle))}°
            </div>

            <input
              type="range"
              min="0"
              max="180"
              step="1"
              value={Math.abs(level6Angle)}
              onChange={(event) => {
                setLevel6Angle(Number(event.target.value));

                setLevel6Answered(false);
                setLevel6Correct(false);
              }}
            />
          </div>
        </div>

        {level6Answered && (
          <div
            className={
              level6Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level6Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level6Correct ? "Great angle!" : "Try again!"}</strong>

              <p>
                {level6Correct
                  ? "Your angle matches the required range."
                  : "Think about whether the angle is acute, right, or obtuse."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level6Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              onClick={checkLevel6Round}
            >
              Check Angle →
            </button>
          ) : level6Correct ? (
            round < level6Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setRound((previous) => previous + 1);

                  resetLevel6Round();
                }}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(7);
                  setRound(1);

                  resetLevel6Round();
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => {
                setLevel6Answered(false);
                setLevel6Correct(false);
              }}
            >
              Adjust Angle
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel7 = () => {
    const current = level7Rounds[round - 1];

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🕵️</div>

          <div>
            <strong>Geometry Crime Scene</strong>

            <p>
              Inspect the diagram carefully and identify the geometric objects
              requested.
            </p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>CRIME SCENE</div>

          <svg viewBox="0 0 600 420" className={styles.diagram}>
            {/* AB */}

            <line
              x1="120"
              y1="210"
              x2="480"
              y2="210"
              className={styles.geometryLine}
            />

            {/* OA */}

            <line
              x1="300"
              y1="210"
              x2="180"
              y2="80"
              className={styles.geometryLine}
            />

            {/* OC */}

            <line
              x1="300"
              y1="210"
              x2="190"
              y2="330"
              className={styles.geometryLine}
            />

            {/* OD */}

            <line
              x1="300"
              y1="210"
              x2="430"
              y2="80"
              className={styles.geometryLine}
            />

            {/* O */}

            <circle cx="300" cy="210" r="7" className={styles.vertexPoint} />

            <text x="310" y="202" className={styles.vertexLabel}>
              O
            </text>

            {/* Labels */}

            <text x="165" y="70" className={styles.pointLabel}>
              A
            </text>

            <text x="490" y="215" className={styles.pointLabel}>
              B
            </text>

            <text x="175" y="350" className={styles.pointLabel}>
              C
            </text>

            <text x="438" y="70" className={styles.pointLabel}>
              D
            </text>
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>{round}</span>

            <div>
              <h3>{current.question}</h3>

              <p>Select all the objects that satisfy the instruction.</p>
            </div>
          </div>

          <div className={styles.angleOptions}>
            {current.options.map((option) => (
              <button
                key={option}
                type="button"
                className={
                  level7Selected.includes(option)
                    ? styles.angleOptionSelected
                    : styles.angleOption
                }
                onClick={() => handleLevel7Selection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.selectionArea}>
          <span>Selected</span>

          <strong>
            {level7Selected.length > 0
              ? level7Selected.join(", ")
              : "Nothing selected"}
          </strong>
        </div>

        {level7Answered && (
          <div
            className={
              level7Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level7Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level7Correct ? "Case solved!" : "Not quite!"}</strong>

              <p>
                {level7Correct
                  ? "You correctly identified the geometric objects."
                  : "Re-examine the diagram and the definition of the requested object."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level7Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={level7Selected.length === 0}
              onClick={checkLevel7Round}
            >
              Solve Case →
            </button>
          ) : level7Correct ? (
            round < level7Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={nextLevel7Round}
              >
                Next Case →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(8);
                  setRound(1);

                  resetLevel7Round();
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel7Round}
            >
              Investigate Again
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel8 = () => {
    const current = level8Rounds[round - 1];

    const renderDiagram = (diagramType: string) => {
      if (diagramType === "parallel") {
        return (
          <>
            <line
              x1="70"
              y1="80"
              x2="230"
              y2="80"
              className={styles.geometryLine}
            />

            <line
              x1="70"
              y1="145"
              x2="230"
              y2="145"
              className={styles.geometryLine}
            />
          </>
        );
      }

      if (diagramType === "intersecting") {
        return (
          <>
            <line
              x1="70"
              y1="50"
              x2="230"
              y2="180"
              className={styles.geometryLine}
            />

            <line
              x1="70"
              y1="180"
              x2="230"
              y2="50"
              className={styles.geometryLine}
            />
          </>
        );
      }

      if (diagramType === "slanted-parallel") {
        return (
          <>
            <line
              x1="65"
              y1="175"
              x2="220"
              y2="50"
              className={styles.geometryLine}
            />

            <line
              x1="110"
              y1="195"
              x2="265"
              y2="70"
              className={styles.geometryLine}
            />
          </>
        );
      }

      if (diagramType === "mixed-parallel") {
        return (
          <>
            <line
              x1="65"
              y1="65"
              x2="230"
              y2="65"
              className={styles.geometryLine}
            />

            <line
              x1="65"
              y1="135"
              x2="230"
              y2="135"
              className={styles.geometryLine}
            />
          </>
        );
      }

      if (diagramType === "mixed-intersecting") {
        return (
          <>
            <line
              x1="65"
              y1="45"
              x2="230"
              y2="155"
              className={styles.geometryLine}
            />

            <line
              x1="65"
              y1="155"
              x2="230"
              y2="45"
              className={styles.geometryLine}
            />
          </>
        );
      }

      return null;
    };

    return (
      <>
        {/* INSTRUCTION */}

        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>↔️</div>

          <div>
            <strong>Parallel or Intersecting?</strong>

            <p>
              Study the lines carefully. Decide whether they are parallel or
              intersecting.
            </p>
          </div>
        </div>

        {/* NORMAL ROUNDS */}

        {current.type !== "mixed" && (
          <div className={styles.diagramCard}>
            <div className={styles.diagramLabel}>LINE RELATIONSHIP</div>

            <svg viewBox="0 0 300 220" className={styles.smallGeometryDiagram}>
              {renderDiagram(
                current.type === "parallel-slanted"
                  ? "slanted-parallel"
                  : current.type,
              )}
            </svg>
          </div>
        )}

        {/* MIXED ROUND */}

        {current.type === "mixed" && (
          <div className={styles.mixedDiagramGrid}>
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className={styles.mixedDiagramCard}>
                <span>DIAGRAM {index + 1}</span>

                <svg
                  viewBox="0 0 300 220"
                  className={styles.smallGeometryDiagram}
                >
                  {renderDiagram(
                    [
                      "mixed-parallel",
                      "mixed-intersecting",
                      "slanted-parallel",
                      "mixed-intersecting",
                    ][index],
                  )}
                </svg>

                <div className={styles.classificationOptions}>
                  {["parallel", "intersecting"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={
                        level8Answers[index] === option
                          ? styles.angleOptionSelected
                          : styles.angleOption
                      }
                      onClick={() => handleLevel8Answer(index, option)}
                    >
                      {option === "parallel" ? "Parallel" : "Intersecting"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* NORMAL ANSWERS */}

        {current.type !== "mixed" && (
          <div className={styles.workspace}>
            <div className={styles.sectionTitle}>
              <span>1</span>

              <div>
                <h3>Choose the relationship</h3>

                <p>How are these two lines related?</p>
              </div>
            </div>

            <div className={styles.angleOptions}>
              {["parallel", "intersecting"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={
                    level8Answers[0] === option
                      ? styles.angleOptionSelected
                      : styles.angleOption
                  }
                  onClick={() => handleLevel8Answer(0, option)}
                >
                  {option === "parallel" ? "Parallel" : "Intersecting"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FEEDBACK */}

        {level8Answered && (
          <div
            className={
              level8Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level8Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level8Correct ? "Correct!" : "Not quite!"}</strong>

              <p>
                {level8Correct
                  ? "Excellent observation. You correctly identified the relationship between the lines."
                  : "Look carefully at whether the lines meet or remain the same distance apart."}
              </p>
            </div>
          </div>
        )}

        {/* CONTROLS */}

        <div className={styles.controls}>
          {!level8Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={
                current.type === "mixed"
                  ? Object.keys(level8Answers).length !== 4
                  : !level8Answers[0]
              }
              onClick={checkLevel8Round}
            >
              Check Classification →
            </button>
          ) : level8Correct ? (
            round < level8Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setRound((previous) => previous + 1);

                  resetLevel8Round();
                }}
              >
                Next Round →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(9);
                  setRound(1);

                  resetLevel8Round();
                }}
              >
                Next Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={resetLevel8Round}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel9 = () => {
    const current = level9Rounds[round - 1];

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🧠</div>

          <div>
            <strong>Missing Angle Puzzle</strong>

            <p>
              Study the diagram, identify the angle relationship, and calculate
              the missing angle.
            </p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>ANGLE PUZZLE</div>

          <svg viewBox="0 0 600 450" className={styles.diagram}>
            {renderLevel9Diagram(current.relationship)}
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>{round}</span>

            <div>
              <h3>{current.question}</h3>

              <p>Enter the missing angle in degrees.</p>
            </div>
          </div>

          <div className={styles.finalAnswer}>
            <span>Answer:</span>

            <input
              type="number"
              value={level9Answer}
              onChange={(event) => {
                setLevel9Answer(event.target.value);

                setLevel9Answered(false);
                setLevel9Correct(false);
              }}
              aria-label="Missing angle answer"
            />

            <strong>°</strong>
          </div>
        </div>

        {level9Answered && (
          <div
            className={
              level9Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level9Correct ? "✓" : "!"}</span>

            <div>
              <strong>{level9Correct ? "Correct!" : "Not quite!"}</strong>

              <p>
                {level9Correct
                  ? "Excellent reasoning. You used the angle relationship correctly."
                  : "Think about whether the angles form a straight line, a right angle, or go around a point."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level9Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={!level9Answer}
              onClick={checkLevel9Round}
            >
              Check Angle →
            </button>
          ) : level9Correct ? (
            round < level9Rounds.length ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setRound((previous) => previous + 1);

                  resetLevel9Round();
                }}
              >
                Next Puzzle →
              </button>
            ) : (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel(10);
                  setRound(1);

                  resetLevel9Round();
                }}
              >
                Final Level →
              </button>
            )
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => {
                setLevel9Answered(false);
                setLevel9Correct(false);
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  const renderLevel10 = () => {
    /*
     * =========================
     * STAGE 1
     * =========================
     */

    if (level10Stage === 1) {
      return (
        <>
          <div className={styles.instruction}>
            <div className={styles.instructionIcon}>👑</div>

            <div>
              <strong>Geometry Master — Stage 1</strong>

              <p>Identify the vertex of the highlighted angle.</p>
            </div>
          </div>

          <div className={styles.diagramCard}>
            <div className={styles.diagramLabel}>FINAL BOSS — IDENTIFY</div>

            <svg viewBox="0 0 600 400" className={styles.diagram}>
              <path
                d="M 300 210 L 300 150 A 60 60 0 0 1 360 210 Z"
                className={styles.angleHighlight}
              />

              <line
                x1="120"
                y1="210"
                x2="500"
                y2="210"
                className={styles.geometryLine}
              />

              <line
                x1="300"
                y1="210"
                x2="170"
                y2="90"
                className={styles.geometryLine}
              />

              <line
                x1="300"
                y1="210"
                x2="210"
                y2="330"
                className={styles.geometryLine}
              />

              {/* A */}

              <g
                className={styles.pointGroup}
                onClick={() => !level10Answered && setLevel10Vertex("A")}
              >
                <circle cx="170" cy="90" r="26" className={styles.hitArea} />

                <circle cx="170" cy="90" r="5" className={styles.point} />

                <text x="155" y="75" className={styles.pointLabel}>
                  A
                </text>
              </g>

              {/* B */}

              <g
                className={styles.pointGroup}
                onClick={() => !level10Answered && setLevel10Vertex("B")}
              >
                <circle cx="500" cy="210" r="26" className={styles.hitArea} />

                <circle cx="500" cy="210" r="5" className={styles.point} />

                <text x="510" y="205" className={styles.pointLabel}>
                  B
                </text>
              </g>

              {/* C */}

              <g
                className={styles.pointGroup}
                onClick={() => !level10Answered && setLevel10Vertex("C")}
              >
                <circle cx="210" cy="330" r="26" className={styles.hitArea} />

                <circle cx="210" cy="330" r="5" className={styles.point} />

                <text x="195" y="350" className={styles.pointLabel}>
                  C
                </text>
              </g>

              {/* O */}

              <g
                className={styles.pointGroup}
                onClick={() => !level10Answered && setLevel10Vertex("O")}
              >
                <circle cx="300" cy="210" r="32" className={styles.hitArea} />

                <circle
                  cx="300"
                  cy="210"
                  r="7"
                  className={styles.vertexPoint}
                />

                <text x="310" y="202" className={styles.vertexLabel}>
                  O
                </text>
              </g>
            </svg>
          </div>

          <div className={styles.selectionArea}>
            <span>Selected vertex</span>

            <strong>
              {level10Vertex ? `Point ${level10Vertex}` : "Select a point"}
            </strong>
          </div>

          {level10Answered && (
            <div
              className={
                level10Correct ? styles.correctFeedback : styles.wrongFeedback
              }
            >
              <span>{level10Correct ? "✓" : "!"}</span>

              <div>
                <strong>
                  {level10Correct ? "Stage Complete!" : "Not quite!"}
                </strong>

                <p>
                  {level10Correct
                    ? "O is the vertex because the arms of the angle meet there."
                    : "Remember: the vertex is where the two arms meet."}
                </p>
              </div>
            </div>
          )}

          <div className={styles.controls}>
            {!level10Answered ? (
              <button
                type="button"
                className={styles.checkButton}
                disabled={!level10Vertex}
                onClick={checkLevel10Stage1}
              >
                Check Answer →
              </button>
            ) : level10Correct ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel10Stage(2);
                  setLevel10Answered(false);
                  setLevel10Correct(false);
                  setLevel10Points([]);
                }}
              >
                Stage 2 →
              </button>
            ) : (
              <button
                type="button"
                className={styles.retryButton}
                onClick={resetLevel10Stage1}
              >
                Try Again
              </button>
            )}
          </div>
        </>
      );
    }

    /*
     * =========================
     * STAGE 2
     * =========================
     */

    if (level10Stage === 2) {
      const points = [
        { x: 100, y: 100, label: "A" },
        { x: 250, y: 100, label: "B" },
        { x: 400, y: 100, label: "C" },
        { x: 500, y: 250, label: "D" },
      ];

      return (
        <>
          <div className={styles.instruction}>
            <div className={styles.instructionIcon}>🏗️</div>

            <div>
              <strong>Geometry Master — Stage 2</strong>

              <p>Construct a ray starting at B and passing through C.</p>
            </div>
          </div>

          <div className={styles.diagramCard}>
            <div className={styles.diagramLabel}>FINAL BOSS — CONSTRUCT</div>

            <svg viewBox="0 0 600 400" className={styles.constructionBoard}>
              {/* Grid */}

              {Array.from({ length: 6 }).map((_, index) => {
                const position = 50 + index * 100;

                return (
                  <g key={index}>
                    <line
                      x1={position}
                      y1="50"
                      x2={position}
                      y2="350"
                      className={styles.gridLine}
                    />

                    <line
                      x1="50"
                      y1={position}
                      x2="550"
                      y2={position}
                      className={styles.gridLine}
                    />
                  </g>
                );
              })}

              {/* Constructed ray */}

              {level10Points.length === 2 && (
                <line
                  x1={points[level10Points[0]].x}
                  y1={points[level10Points[0]].y}
                  x2={points[level10Points[1]].x}
                  y2={points[level10Points[1]].y}
                  className={styles.constructedRay}
                  markerEnd="url(#arrow)"
                />
              )}

              <defs>
                <marker
                  id="arrow"
                  markerWidth="10"
                  markerHeight="10"
                  refX="8"
                  refY="5"
                  orient="auto"
                >
                  <polygon
                    points="0,0 10,5 0,10"
                    className={styles.arrowMarker}
                  />
                </marker>
              </defs>

              {/* Points */}

              {points.map((point, index) => {
                const selected = level10Points.includes(index);

                return (
                  <g
                    key={point.label}
                    className={styles.constructionPoint}
                    onClick={() => {
                      if (level10Answered) return;

                      setLevel10Points((previous) => {
                        if (previous.includes(index)) {
                          return previous.filter((item) => item !== index);
                        }

                        if (previous.length >= 2) {
                          return previous;
                        }

                        return [...previous, index];
                      });
                    }}
                  >
                    <circle
                      cx={point.x}
                      cy={point.y}
                      r="28"
                      className={styles.pointHitArea}
                    />

                    <circle
                      cx={point.x}
                      cy={point.y}
                      r={selected ? 9 : 6}
                      className={
                        selected
                          ? styles.selectedConstructionPoint
                          : styles.constructionDot
                      }
                    />

                    <text
                      x={point.x + 10}
                      y={point.y - 12}
                      className={styles.constructionLabel}
                    >
                      {point.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className={styles.selectionArea}>
            <span>Selected points</span>

            <strong>
              {level10Points.length
                ? level10Points.map((index) => points[index].label).join(" → ")
                : "Select two points"}
            </strong>
          </div>

          {level10Answered && (
            <div
              className={
                level10Correct ? styles.correctFeedback : styles.wrongFeedback
              }
            >
              <span>{level10Correct ? "✓" : "!"}</span>

              <div>
                <strong>
                  {level10Correct ? "Stage Complete!" : "Not quite!"}
                </strong>

                <p>
                  {level10Correct
                    ? "A ray has one endpoint and continues in one direction."
                    : "The ray must start at B and pass through C."}
                </p>
              </div>
            </div>
          )}

          <div className={styles.controls}>
            {!level10Answered ? (
              <button
                type="button"
                className={styles.checkButton}
                disabled={level10Points.length !== 2}
                onClick={checkLevel10Stage2}
              >
                Check Construction →
              </button>
            ) : level10Correct ? (
              <button
                type="button"
                className={styles.nextButton}
                onClick={() => {
                  setLevel10Stage(3);
                  setLevel10Answered(false);
                  setLevel10Correct(false);
                  setLevel10Answer("");
                }}
              >
                Final Puzzle →
              </button>
            ) : (
              <button
                type="button"
                className={styles.retryButton}
                onClick={resetLevel10Stage2}
              >
                Try Again
              </button>
            )}
          </div>
        </>
      );
    }

    /*
     * =========================
     * STAGE 3
     * =========================
     */

    return (
      <>
        <div className={styles.instruction}>
          <div className={styles.instructionIcon}>🧠</div>

          <div>
            <strong>Geometry Master — Final Puzzle</strong>

            <p>
              Use your knowledge of straight angles to calculate the missing
              angle.
            </p>
          </div>
        </div>

        <div className={styles.diagramCard}>
          <div className={styles.diagramLabel}>FINAL BOSS — REASON</div>

          <svg viewBox="0 0 600 400" className={styles.diagram}>
            <line
              x1="100"
              y1="220"
              x2="500"
              y2="220"
              className={styles.geometryLine}
            />

            <line
              x1="300"
              y1="220"
              x2="190"
              y2="90"
              className={styles.geometryLine}
            />

            <circle cx="300" cy="220" r="7" className={styles.vertexPoint} />

            <text x="85" y="215" className={styles.pointLabel}>
              A
            </text>

            <text x="505" y="215" className={styles.pointLabel}>
              B
            </text>

            <text x="175" y="80" className={styles.pointLabel}>
              C
            </text>

            <text x="310" y="212" className={styles.vertexLabel}>
              O
            </text>

            {/* Given angle */}

            <path
              d="M 235 220 A 65 65 0 0 1 255 165"
              className={styles.angleArc}
            />

            <text x="230" y="175" className={styles.angleValueLabel}>
              120°
            </text>
          </svg>
        </div>

        <div className={styles.workspace}>
          <div className={styles.sectionTitle}>
            <span>3</span>

            <div>
              <h3>If ∠AOC = 120°, find ∠COB.</h3>

              <p>Remember that angles on a straight line add up to 180°.</p>
            </div>
          </div>

          <div className={styles.finalAnswer}>
            <span>Missing angle:</span>

            <input
              type="number"
              value={level10Answer}
              onChange={(event) => {
                setLevel10Answer(event.target.value);

                setLevel10Answered(false);
                setLevel10Correct(false);
              }}
            />

            <strong>°</strong>
          </div>
        </div>

        {level10Answered && (
          <div
            className={
              level10Correct ? styles.correctFeedback : styles.wrongFeedback
            }
          >
            <span>{level10Correct ? "✓" : "!"}</span>

            <div>
              <strong>
                {level10Correct ? "Geometry Master!" : "Not quite!"}
              </strong>

              <p>
                {level10Correct
                  ? "You successfully identified, constructed and reasoned through the final challenge."
                  : "A straight angle is 180°. Subtract the given 120°."}
              </p>
            </div>
          </div>
        )}

        <div className={styles.controls}>
          {!level10Answered ? (
            <button
              type="button"
              className={styles.checkButton}
              disabled={!level10Answer}
              onClick={checkLevel10Stage3}
            >
              Complete Final Puzzle →
            </button>
          ) : level10Correct ? (
            <button type="button" className={styles.nextButton}>
              Geometry Quest Complete →
            </button>
          ) : (
            <button
              type="button"
              className={styles.retryButton}
              onClick={() => {
                setLevel10Answered(false);
                setLevel10Correct(false);
              }}
            >
              Try Again
            </button>
          )}
        </div>
      </>
    );
  };

  /* =========================
     MAIN GAME
  ========================= */

  return (
    <div className={styles.game}>
      {/* =========================
          HEADER
      ========================= */}

      <div className={styles.gameHeader}>
        <div>
          <span className={styles.gameLabel}>GEOMETRY QUEST</span>

          <h2>{level === 1 ? "Angle Detective" : "Ray Hunter"}</h2>
        </div>

        <div className={styles.levelInfo}>
          <span>LEVEL</span>

          <strong>{level} / 10</strong>
        </div>
      </div>

      {/* =========================
          PROGRESS
      ========================= */}

      <div className={styles.progressArea}>
        <div className={styles.progressText}>
          <span>Level {level} of 10</span>

          <span>{level * 10}%</span>
        </div>

        <div className={styles.progressBar}>
          <div
            style={{
              width: `${level * 10}%`,
            }}
          />
        </div>
      </div>

      {/* =========================
          LEVEL CONTENT
      ========================= */}

      {level === 1
        ? renderLevel1()
        : level === 2
          ? renderLevel2()
          : level === 3
            ? renderLevel3()
            : level === 4
              ? renderLevel4()
              : level === 5
                ? renderLevel5()
                : level === 6
                  ? renderLevel6()
                  : level === 7
                    ? renderLevel7()
                    : level === 8
                      ? renderLevel8()
                      : level === 9
                        ? renderLevel9()
                        : renderLevel10()}
    </div>
  );
}
