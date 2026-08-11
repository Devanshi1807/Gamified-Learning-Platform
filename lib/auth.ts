import crypto from "crypto";
import { cookies } from "next/headers";
import pool from "@/lib/db";

const SESSION_COOKIE_NAME = "school_session";

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function hashSessionToken(token: string): string {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
}

export async function getAuthenticatedSchool() {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get(
    SESSION_COOKIE_NAME
  )?.value;

  if (!sessionToken) {
    return null;
  }

  const sessionTokenHash =
    hashSessionToken(sessionToken);

  const result = await pool.query(
    `SELECT
       s.id,
       s.school_id,
       s.school_name,
       s.principal_name,
       s.school_email,
       s.contact_number,
       s.address,
       ss.expires_at
     FROM school_sessions ss
     JOIN schools s
       ON s.id = ss.school_id
     WHERE ss.session_token_hash = $1
       AND ss.expires_at > NOW()`,
    [sessionTokenHash]
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}