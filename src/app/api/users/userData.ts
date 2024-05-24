
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function GET(request: NextRequest) {
  const userData = getDataFromToken(request);

  if (!userData) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
   
    const user = await User.findById(userData.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Return user data
    return NextResponse.json({
      message: "User data fetched successfully",
      user: {
        id: user._id,
        email: user.email,
        user: user.user, 
      }
    });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
