import mongoose, { Schema, Document, Types } from "mongoose";

export interface Messages extends Document {
  _id: Types.ObjectId;
  conversationId: Types.ObjectId; // Reference to the conversation
  sender: Types.ObjectId; // Reference to the user who sent the message
  receiver: Types.ObjectId; // Reference to the user who is the receiver of the message
  text: string; // Message content (this is only text message not media)
  createdAt: Date;
  updatedAt: Date;
}

const MessagesSchema: Schema<Messages> = new Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
  },
  { timestamps: true }
);

const MessagesModel =
  mongoose.models.Messages ||
  mongoose.model<Messages>("Messages", MessagesSchema);

export default MessagesModel;