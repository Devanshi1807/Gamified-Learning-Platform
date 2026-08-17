import pool from "@/lib/db";

interface Chapter {
  id: number;
  chapter_number: number;
  name: string;
  ncert_url: string | null;
}

interface Subject {
  id: number;
  name: string;
  class_number: number;
  code: string;
  textbook_name: string | null;
  chapters: Chapter[];
}

export async function getSubjectByCode(
  code: string
): Promise<Subject | null> {
  const subjectResult = await pool.query(
    `
    SELECT
      id,
      name,
      class_number,
      code,
      textbook_name
    FROM subjects
    WHERE code = $1
    `,
    [code]
  );

  if (subjectResult.rows.length === 0) {
    return null;
  }

  const subject = subjectResult.rows[0];

  const chaptersResult = await pool.query<Chapter>(
    `
    SELECT
      id,
      chapter_number,
      name,
      ncert_url
    FROM chapters
    WHERE subject_id = $1
    ORDER BY chapter_number ASC
    `,
    [subject.id]
  );

  return {
    ...subject,
    chapters: chaptersResult.rows,
  };
}

export async function getChapterById(
  subjectCode: string,
  chapterId: number
) {
  const subjectResult = await pool.query(
    `
    SELECT
      id,
      name,
      class_number,
      code,
      textbook_name
    FROM subjects
    WHERE code = $1
    `,
    [subjectCode]
  );

  if (subjectResult.rows.length === 0) {
    return null;
  }

  const subject = subjectResult.rows[0];

  const chapterResult = await pool.query(
    `
    SELECT
      id,
      chapter_number,
      name,
      ncert_url
    FROM chapters
    WHERE id = $1
      AND subject_id = $2
    `,
    [chapterId, subject.id]
  );

  if (chapterResult.rows.length === 0) {
    return null;
  }

  const chapter = chapterResult.rows[0];

  const modulesResult = await pool.query(
    `
    SELECT
      id,
      module_number,
      name,
      description,
      game_type
    FROM modules
    WHERE chapter_id = $1
    ORDER BY module_number ASC
    `,
    [chapter.id]
  );

  return {
    subject,
    chapter,
    modules: modulesResult.rows,
  };
}


export async function getModuleById(
  subjectCode: string,
  chapterId: number,
  moduleId: number
) {
  const result = await pool.query(
    `
    SELECT
      s.id AS subject_id,
      s.name AS subject_name,
      s.code AS subject_code,

      c.id AS chapter_id,
      c.name AS chapter_name,
      c.chapter_number,

      m.id AS module_id,
      m.module_number,
      m.name AS module_name,
      m.description,
      m.game_type

    FROM modules m

    JOIN chapters c
      ON m.chapter_id = c.id

    JOIN subjects s
      ON c.subject_id = s.id

    WHERE s.code = $1
      AND c.id = $2
      AND m.id = $3
    `,
    [subjectCode, chapterId, moduleId]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}