import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import connectDB from '@/libs/mongoose';
import User from '@/models/User';

export const runtime = 'nodejs';

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_API_KEY);
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    const obj = event.data.object;

    await connectDB();

    if (event.type === 'checkout.session.completed') {
      await User.findByIdAndUpdate(obj.client_reference_id, {
        $set: { customerId: obj.customer },
      });
    }

    if (event.type === 'invoice.paid') {
      await User.findOneAndUpdate(
        { customerId: obj.customer },
        { $set: { hasAccess: true } }
      );
    }

    if (
      event.type === 'customer.subscription.deleted' ||
      event.type === 'invoice.payment_failed'
    ) {
      await User.findOneAndUpdate(
        { customerId: obj.customer },
        { $set: { hasAccess: false } }
      );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
