import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        followings: Array,
        followers: Array,
    },
    {
        timestamps: true,
    }
);

export const Follow = mongoose.model("Follow", followSchema);
