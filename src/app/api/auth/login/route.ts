import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from '@/lib/admin';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabaseConfigured = supabaseUrl && supabaseKey && supabaseUrl !== 'your_supabase_url';

    if (supabaseConfigured) {
      // Production: use Supabase auth
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(supabaseUrl!, supabaseKey!);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }

      const userEmail = data.user?.email || email;
      const adminStatus = isAdmin(userEmail);

      const response = NextResponse.json({
        user: { email: userEmail, isAdmin: adminStatus },
        plan: adminStatus ? 'admin' : 'free',
      });

      // Set admin cookie for client-side checks
      if (adminStatus) {
        response.cookies.set('admin_email', userEmail, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        });
      }

      return response;
    }

    // Dev mode: allow admin login without Supabase
    const adminStatus = isAdmin(email);

    if (adminStatus) {
      const response = NextResponse.json({
        user: { email, isAdmin: true },
        plan: 'admin',
      });

      response.cookies.set('admin_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      return response;
    }

    // Non-admin without Supabase configured
    if (!supabaseConfigured) {
      return NextResponse.json(
        { error: 'Authentication not configured. Please set up Supabase.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
