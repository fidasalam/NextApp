import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("Request Body:", reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Debugging: Log the user found by email
    console.log("User Found:", user);



    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    const payload = {
      id: user._id,
      email: user.email,
      user: user.user, // Assuming this should be 'user' based on your schema
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Debugging: Log the generated JWT token
    console.log("Generated Token:", token);

    // Set the JWT token as an HTTP-only cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 3600,
    
    });

    return response;

  } catch (error: any) {
    console.error("Login Error:", error); // Detailed error logging
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
