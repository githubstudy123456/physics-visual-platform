import { NextResponse } from 'next/server'
import { createStripeClient } from '../../../lib/stripe'

export async function POST() {
  try {
    const stripe = createStripeClient()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://127.0.0.1:5174'}/?checkout=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://127.0.0.1:5174'}/?checkout=cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json(
      { error: 'Stripe is not configured yet. Add STRIPE_SECRET_KEY and product price configuration first.' },
      { status: 503 },
    )
  }
}
