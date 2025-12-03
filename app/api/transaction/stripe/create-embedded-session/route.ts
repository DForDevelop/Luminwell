import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnection";
import TransactionModel from "@/model/Transaction";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(req: Request) {
  await dbConnection();

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user._id) {
      return NextResponse.json(
        { success: false, message: "Unauthorised" },
        { status: 401 }
      );
    }

    const { credits, amount, currency = "cad" } = await req.json();
    if (!credits || !amount) {
      return NextResponse.json(
        { success: false, message: "Missing credits or amount" },
        { status: 400 }
      );
    }

    const existingPending = await TransactionModel.findOne({
      userId: session.user._id,
      amount,
      creditsAdded: credits,
      status: "pending",
    });

    if (existingPending && existingPending.stripeId) {
      // return the same client_secret so Stripe Embedded Checkout continues
      const existingSession = await stripe.checkout.sessions.retrieve(
        existingPending.stripeId
      );

      return NextResponse.json({
        success: true,
        clientSecret: existingSession.client_secret,
        reused: true, // optional: helps debugging
      });
    }

    //pending transaction Creation
    const transaction = await TransactionModel.create({
      userId: session.user._id,
      stripeId: null,
      amount,
      creditsAdded: credits,
      status: "pending",
      currency: currency.toUpperCase(),
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      currency,
      client_reference_id: transaction._id.toString(),
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: amount * 100,
            product_data: {
              name: `${credits} Credits Pack`,
            },
          },
        },
      ],
      metadata: {
        userId: session.user._id.toString(),
        credits: credits.toString(),
      },
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-status?session_id={CHECKOUT_SESSION_ID}`,
    });

    transaction.stripeId = checkoutSession.id;
    await transaction.save();

    return NextResponse.json({
      success: true,
      clientSecret: checkoutSession.client_secret,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
