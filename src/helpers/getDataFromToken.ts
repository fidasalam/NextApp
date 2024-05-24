import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  user: string; // Adjust this according to your actual schema
}

export function getDataFromToken(request: NextRequest): TokenPayload | null {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.error("Token not found in cookies.");
      return null;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
