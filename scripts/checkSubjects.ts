import fs from "fs";
import path from "path";
import pg from "pg";

const { Pool } = pg;

function getDatabaseUrl() {
  const envPath = path.join(process.cwd(), ".env.local");
  const envText = fs.readFileSync(envPath, "utf8");

  const match = envText.match(/^DATABASE_URL=(.*)$/m);

  if (!match?.[1]?.trim()) {
    throw new Error("DATABASE_URL is missing from .env.local");
  }

  return match[1].trim().replace(/^"(.*)"$/, "$1");
}

async function main() {
  const databaseUrl = getDatabaseUrl();

  const pool = new Pool({
    connectionString: databaseUrl,
  });

  const result = await pool.query(`
    SELECT
      id,
      name,
      class_number,
      code,
      textbook_name
    FROM subjects
    ORDER BY id ASC;
  `);

  console.table(result.rows);

  await pool.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});