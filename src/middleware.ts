import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Middleware function to handle authentication
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || '';

  if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  if (isPublicPath && token) {
       return NextResponse.redirect(new URL('/profile', request.nextUrl));
  }

  }


export const config = {
  matcher: [
    '/',            // Root path
    '/profile/(.*)',   // All profile-related paths
    '/login',       // Login page
    '/signup'       // Signup page
  ],
};
