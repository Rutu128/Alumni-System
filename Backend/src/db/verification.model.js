import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    createdAt: {
      type: Date,
      expires: 300,
      default: Date.now,
    },
  }
);

export const Verification = mongoose.model("Verification", verificationSchema);
