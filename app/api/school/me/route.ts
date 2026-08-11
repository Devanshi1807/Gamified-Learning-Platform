import { NextResponse } from "next/server";
import { getAuthenticatedSchool } from "@/lib/auth";

export async function GET() {
  try {
    const school = await getAuthenticatedSchool();

    if (!school) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      school: {
        schoolId: school.school_id,
        schoolName: school.school_name,
        principalName: school.principal_name,
        schoolEmail: school.school_email,
      },
    });
  } catch (error) {
    console.error("Authentication error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Authentication check failed.",
      },
      { status: 500 }
    );
  }
}