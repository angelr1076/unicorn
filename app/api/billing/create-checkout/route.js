import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import User from '@/models/User';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const { successUrl, cancelUrl } = await req.json();

    if (!successUrl || !cancelUrl) {
      return NextResponse.json({ error: 'Missing URLs' }, { status: 400 });
    }

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user._id.toString(),
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 });
  }
}
