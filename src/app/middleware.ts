import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  // Get the user's token from the request
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  
  // Get the path the user is trying to access
  const { pathname } = req.nextUrl;

  // --- Define Your Routes ---
  
  // Routes that require the user to be an ADMIN
  const adminRoutes = [
    '/admin-dashboard', // Example: a new admin page
    // Add any other admin-only paths here
  ];

  const merchantRoutes = [
    '/merchant-dashboard',
    '/products',
    '/store-settings',
  ];

  // Routes that require the user to be logged in (any role)
  const protectedUserRoutes = [
    '/profile', //
    '/orders', //
    '/settings', //
    // Add any other paths that require login
  ];

  // --- Logic ---

  // 1. Check Admin Routes
  if (adminRoutes.some(path => pathname.startsWith(path))) {
    if (!token) {
      // Not logged in, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
    if (token.role !== 'admin') {
      // Logged in, but NOT an admin. Redirect to an "unauthorized" page.
      // You can create a page at /unauthorized
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  if (merchantRoutes.some(path => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    // Allow *either* merchant or admin to access
    if (token.role !== 'merchant' && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // 2. Check Protected User Routes
  if (protectedUserRoutes.some(path => pathname.startsWith(path))) {
    if (!token) {
      // Not logged in, redirect to home
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // 3. If no rules match, allow the request to continue
  return NextResponse.next();
}

// 4. Matcher: Define which routes to run the middleware on.
// This is crucial for performance.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicons (favicon files)
     * - images (your static images)
     */
    '/((?!api/auth|_next/static|_next/image|favicons|images).*)',
  ],
};