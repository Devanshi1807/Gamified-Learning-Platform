import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";

function generateSchoolId(schoolName: string): string {
  const schoolCode = schoolName
    .replace(/[^a-zA-Z]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");

  const randomNumber = Math.floor(
    100000 + Math.random() * 900000
  );

  return `NOIS-${schoolCode}-${randomNumber}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      schoolName,
      principalName,
      schoolEmail,
      contactNumber,
      address,
      password,
    } = body;

    // 1. Validate required fields
    if (
      !schoolName ||
      !principalName ||
      !schoolEmail ||
      !contactNumber ||
      !address ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // 2. Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(schoolEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // 3. Validate password
    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must contain at least 8 characters.",
        },
        { status: 400 }
      );
    }

    // 4. Check whether email already exists
    const existingSchool = await pool.query(
      "SELECT id FROM schools WHERE school_email = $1",
      [schoolEmail.trim().toLowerCase()]
    );

    if (existingSchool.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "A school with this email already exists.",
        },
        { status: 409 }
      );
    }

    // 5. Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // 6. Generate school ID
    const schoolId = generateSchoolId(schoolName);

    // 7. Insert school into PostgreSQL
    const result = await pool.query(
      `INSERT INTO schools (
        school_id,
        school_name,
        principal_name,
        school_email,
        contact_number,
        address,
        password_hash
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING school_id, school_name, school_email, created_at`,
      [
        schoolId,
        schoolName.trim(),
        principalName.trim(),
        schoolEmail.trim().toLowerCase(),
        contactNumber.trim(),
        address.trim(),
        passwordHash,
      ]
    );

    // 8. Return successful response
    return NextResponse.json(
      {
        success: true,
        message: "School registered successfully.",
        school: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("School registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong while registering the school.",
      },
      { status: 500 }
    );
  }
}