import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // In production, verify the webhook signature with Stripe
    // and handle subscription events:
    // - customer.subscription.created
    // - customer.subscription.updated
    // - customer.subscription.deleted
    // - invoice.payment_succeeded
    // - invoice.payment_failed

    console.log('Stripe webhook received:', body.slice(0, 100));

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
