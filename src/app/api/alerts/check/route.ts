import { NextResponse } from 'next/server';

// This would be a cron job in production
// For MVP, this is a manual trigger endpoint
export async function POST() {
  try {
    // In production this would:
    // 1. Query Supabase for all watchlist items with alert_on_change = true
    // 2. For each, pull current rate from USITC
    // 3. Compare to last_known_rate
    // 4. If changed, send email via Resend and log to alert_log

    return NextResponse.json({
      message: 'Alert check completed',
      checked: 0,
      alerts_triggered: 0,
    });
  } catch (error) {
    console.error('Alert check error:', error);
    return NextResponse.json(
      { error: 'Alert check failed' },
      { status: 500 }
    );
  }
}
