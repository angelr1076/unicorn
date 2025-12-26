import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectDB from '@/libs/mongoose';
import User from '@/models/User';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.returnUrl) {
      return NextResponse.json(
        { error: 'Return URL is required' },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(session.user.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const stripe = new Stripe(process.env.STRIPE_API_KEY);

    const stripeCustomerPortal = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: body.returnUrl,
    });

    return NextResponse.json({ url: stripeCustomerPortal.url });
  } catch (error) {
    console.error(error.message);
    return NextResponse.json(
      { error: 'An error occurred in the customer portal' },
      { status: 500 }
    );
  }
}
