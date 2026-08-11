import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import pool from "@/lib/db";
import { hashSessionToken } from "@/lib/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();

    const sessionToken =
      cookieStore.get("school_session")?.value;

    if (sessionToken) {
      const sessionTokenHash =
        hashSessionToken(sessionToken);

      await pool.query(
        `DELETE FROM school_sessions
         WHERE session_token_hash = $1`,
        [sessionTokenHash]
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    response.cookies.delete("school_session");

    return response;
  } catch (error) {
    console.error("School logout error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to log out.",
      },
      { status: 500 }
    );
  }
}