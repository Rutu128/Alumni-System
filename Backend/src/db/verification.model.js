import mongoose, { Schema } from "mongoose";

const verificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

export const Verification = mongoose.model('Verification',verificationSchema)