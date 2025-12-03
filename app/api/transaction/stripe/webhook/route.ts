import { NextResponse } from "next/server";
import { headers } from "next/headers";
import dbConnection from "@/lib/dbConnection";
import Stripe from "stripe";
import TransactionModel from "@/model/Transaction";
import UserModel from "@/model/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover",
});

export async function POST(req: Request) {
  await dbConnection();

  const body = await req.text();
  const header = await headers();
  const signature = header.get("stripe-signature")!;

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        const transactionId = session.client_reference_id;
        const userId = session.metadata?.userId;
        const credits = session.metadata?.credits;

        if (!transactionId || !userId || !credits) break;

        //successful transaction
        const tx = await TransactionModel.findById(transactionId);

        if (!tx) break;

        // 2️⃣ Prevent double credit updates
        if (tx.status === "success") break; // already handled

        // 3️⃣ Update transaction
        tx.status = "success";
        tx.stripeId = session.id;
        await tx.save();

        //update user credit value
        await UserModel.findByIdAndUpdate(userId, {
          $inc: { credit: credits },
        });

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const stripeId = session.id;

        await TransactionModel.findOneAndUpdate(
          { stripeId },
          { status: "failed" }
        );

        break;
      }
    }
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("webhook failed: ", error);
    return NextResponse.json({ status: 500 });
  }
}
