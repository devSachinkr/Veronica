import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user) return NextResponse.json({ status: 401, message: "Unauthorized" });
  const priceId = process.env.STRIPE_SUBSCRIPTION_PRICE_ID as string;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_VERONICA_URL}/payment?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_VERONICA_URL}/payment/cancel=true`,
  });
  if (session) {
    return NextResponse.json({ status: 200, session_url: session.url });
  }

  return NextResponse.json({ status: 500, message: "Something went wrong" });
}
