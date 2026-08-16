import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import {
  generateSessionToken,
  hashSessionToken,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const schoolId = body.schoolId?.trim();
    const password = body.password;

    // 1. Validate input
    if (!schoolId || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "School ID and password are required.",
        },
        { status: 400 }
      );
    }

    // 2. Find school
    const result = await pool.query(
      `SELECT
        id,
        school_id,
        school_name,
        school_email,
        password_hash
       FROM schools
       WHERE school_id = $1`,
      [schoolId]
    );

    console.log("LOGIN SCHOOL ID:", schoolId);
    console.log("SCHOOL FOUND:", result.rows.length);

    // 3. Don't reveal whether the School ID exists
    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid School ID or password.",
        },
        { status: 401 }
      );
    }

    const school = result.rows[0];

    console.log("PASSWORD HASH EXISTS:", !!school.password_hash);

    // 4. Verify password
    const passwordMatches = await bcrypt.compare(
      password,
      school.password_hash
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid School ID or password.",
        },
        { status: 401 }
      );
    }

    // 5. Generate session token
    const sessionToken = generateSessionToken();

    // 6. Hash token before storing in database
    const sessionTokenHash =
      hashSessionToken(sessionToken);

    // Session expires in 7 days
    const expiresAt = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    // 7. Store session
    await pool.query(
      `INSERT INTO school_sessions
        (session_token_hash, school_id, expires_at)
       VALUES ($1, $2, $3)`,
      [
        sessionTokenHash,
        school.id,
        expiresAt,
      ]
    );

    // 8. Create response
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful.",
        school: {
          schoolId: school.school_id,
          schoolName: school.school_name,
          schoolEmail: school.school_email,
        },
      },
      { status: 200 }
    );

    // 9. Store session token in HTTP-only cookie
    response.cookies.set({
      name: "school_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error("School login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      { status: 500 }
    );
  }
}