import mongoose, { Schema, Document, Types } from "mongoose";

export interface Transaction extends Document {
  userId: Types.ObjectId;
  stripeId: string;
  amount: number;
  creditsAdded: number;
  status: "pending" | "success" | "failed";
  currency: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<Transaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripeId: {
      type: String,
      required: false,
      default: null,
    },
    amount: {
      type: Number,
      required: true,
    },
    creditsAdded: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    currency: { type: String, default: "CAD" },
  },
  { timestamps: true }
);

const TransactionModel =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", TransactionSchema);

export default TransactionModel;
