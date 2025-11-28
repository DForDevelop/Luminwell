import mongoose, { Schema, Document, Types } from "mongoose";

export interface Conversation extends Document {
  _id: Types.ObjectId;
  participants: [Types.ObjectId, Types.ObjectId]; // Array of participant user IDs (this is only for two participants)
  lastMessage?: mongoose.Schema.Types.ObjectId; // Reference to the last message in the conversation
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema: Schema = new Schema<Conversation>(
  {
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: {
        validator: function (v: Types.ObjectId[]) {
          return v.length === 2; //must be two participants
        },
        message: "A conversation must have exactly two participants.",
      },
    },

    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  { timestamps: true }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model<Conversation>("Conversation", ConversationSchema);

export default ConversationModel;