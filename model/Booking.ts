import { Status } from "@/types/status";
import mongoose, { Document, Schema, Types } from "mongoose";

export interface Booking extends Document {
    _id: Types.ObjectId;
    userId: Types.ObjectId;
    ambassadorId: Types.ObjectId;
    appointmentDate: Date;
    description: string;
    status: Status;
    createdAt: Date;
}

const BookingSchema: Schema<Booking> = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        ambassadorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ambassador",
            required: true,
        },
        appointmentDate: {
            type: Date,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }
)

const BookingModel = mongoose.models.Booking || mongoose.model<Booking>("Booking", BookingSchema);