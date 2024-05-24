import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  email: string;
  user: string; 
}

export function getDataFromToken(request: NextRequest): TokenPayload | null {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      console.error("Token not found in cookies.");
      return null;
    }

 

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
