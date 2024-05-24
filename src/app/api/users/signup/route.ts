// pages/api/signup.js

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt); // Fix typo here

    const newUser = new User({
      user: username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser
    }); // Remove unnecessary comma and indentation
    
  } catch (error:any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
