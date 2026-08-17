import pool from "@/lib/db";

export async function getModuleProgress(
  studentId: number,
  moduleId: number
) {
  const result = await pool.query(
    `
    SELECT
      id,
      student_id,
      module_id,
      status,
      progress,
      started_at,
      completed_at,
      updated_at
    FROM student_module_progress
    WHERE student_id = $1
      AND module_id = $2
    `,
    [studentId, moduleId]
  );

  return result.rows[0] ?? null;
}


export async function startModule(
  studentId: number,
  moduleId: number
) {
  const result = await pool.query(
    `
    INSERT INTO student_module_progress
      (
        student_id,
        module_id,
        status,
        progress,
        started_at,
        updated_at
      )
    VALUES
      ($1, $2, 'in-progress', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

    ON CONFLICT (student_id, module_id)
    DO UPDATE SET
      status = CASE
        WHEN student_module_progress.status = 'completed'
        THEN 'completed'
        ELSE 'in-progress'
      END,
      updated_at = CURRENT_TIMESTAMP

    RETURNING *
    `,
    [studentId, moduleId]
  );

  return result.rows[0];
}


export async function updateModuleProgress(
  studentId: number,
  moduleId: number,
  progress: number
) {
  const safeProgress = Math.max(
    0,
    Math.min(100, progress)
  );

  const status =
    safeProgress >= 100
      ? "completed"
      : "in-progress";

  const result = await pool.query(
    `
    INSERT INTO student_module_progress
      (
        student_id,
        module_id,
        status,
        progress,
        started_at,
        completed_at,
        updated_at
      )
    VALUES
      (
        $1,
        $2,
        $3,
        $4,
        CURRENT_TIMESTAMP,
        CASE
          WHEN $4 >= 100
          THEN CURRENT_TIMESTAMP
          ELSE NULL
        END,
        CURRENT_TIMESTAMP
      )

    ON CONFLICT (student_id, module_id)
    DO UPDATE SET
      status = $3,
      progress = $4,
      completed_at = CASE
        WHEN $4 >= 100
        THEN CURRENT_TIMESTAMP
        ELSE student_module_progress.completed_at
      END,
      updated_at = CURRENT_TIMESTAMP

    RETURNING *
    `,
    [
      studentId,
      moduleId,
      status,
      safeProgress,
    ]
  );

  return result.rows[0];
}


export async function completeModule(
  studentId: number,
  moduleId: number
) {
  return updateModuleProgress(
    studentId,
    moduleId,
    100
  );
}