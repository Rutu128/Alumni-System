import mongoose, { Schema } from "mongoose";

const followSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        followings: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                }
            }
        ],
        followers: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                }
            }
        ],
    },
    {
        timestamps: true,
    }
);

export const Follow = mongoose.model("Follow", followSchema);
