import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // Check which PostgreSQL database we're connected to
    const connection = await pool.query(`
      SELECT current_database(), current_user, current_schema()
    `);

    // Check schools stored in this database
    const schools = await pool.query(`
      SELECT school_id, school_name, school_email
      FROM schools
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      connection: connection.rows[0],
      schools: schools.rows,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
      },
      { status: 500 }
    );
  }
}