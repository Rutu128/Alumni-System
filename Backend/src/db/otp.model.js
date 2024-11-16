import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,

        },
    },
    {
        expireAfterSeconds: 600,
    }
);
export const Otp = mongoose.model("Otp", otpSchema);
