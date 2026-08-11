// import { NextResponse } from "next/server";
// import pool from "@/lib/db";

// export async function GET() {
//   try {
//     const result = await pool.query("SELECT NOW()");

//     return NextResponse.json({
//       success: true,
//       message: "Database connected successfully!",
//       time: result.rows[0].now,
//     });
//   } catch (error) {
//     console.error("Database connection error:", error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Database connection failed",
//       },
//       { status: 500 }
//     );
//   }
// }



import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
  console.log(
    "DATABASE_URL length:",
    process.env.DATABASE_URL?.length
  );

  try {
    const result = await pool.query("SELECT NOW()");

    return NextResponse.json({
      success: true,
      message: "Database connected successfully!",
      time: result.rows[0].now,
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