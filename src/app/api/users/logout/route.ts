import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Clear the token cookie by setting it to an empty string and expiring it
    const response = NextResponse.json({ message: "Logout successful", success: true });
    response.cookies.set('token', '', {
      httpOnly: true,
      maxAge: 0, 
    });

    return response;
  } catch (error: any) {
    console.error("Logout Error:", error); // Detailed error logging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
