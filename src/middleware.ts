import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    const adminEmail = request.cookies.get('admin_email')?.value;
    const supabaseAuth = request.cookies.getAll().some(c => c.name.includes('supabase') && c.name.includes('auth'));

    // Allow if admin cookie or supabase session exists
    if (!adminEmail && !supabaseAuth) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // Pass admin info to API routes via headers
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth/')) {
    const adminEmail = request.cookies.get('admin_email')?.value;
    const requestHeaders = new Headers(request.headers);

    if (adminEmail) {
      requestHeaders.set('x-user-email', adminEmail);
      requestHeaders.set('x-user-plan', 'admin');
    }

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
};
