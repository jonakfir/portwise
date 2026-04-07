import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isAdmin, getEffectivePlan } from '@/lib/admin';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookie or header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      // Check for Supabase auth cookie
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey || supabaseUrl === 'your_supabase_url') {
        // Dev mode — check for admin email in cookie
        const adminEmail = request.cookies.get('admin_email')?.value;
        if (adminEmail && isAdmin(adminEmail)) {
          return NextResponse.json({
            email: adminEmail,
            plan: 'admin',
            isAdmin: true,
            lookupsToday: 0,
            unlimited: true,
          });
        }
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const cookieHeader = request.headers.get('cookie') || '';

      // Try to get session from cookies
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
      }

      const email = session.user.email || '';
      const adminStatus = isAdmin(email);
      const plan = getEffectivePlan(email, 'free');

      return NextResponse.json({
        email,
        plan,
        isAdmin: adminStatus,
        lookupsToday: 0,
        unlimited: adminStatus || plan === 'pro' || plan === 'team',
      });
    }

    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Auth check failed' }, { status: 500 });
  }
}
