import mongoose, { Schema } from "mongoose";

const followerSchema = new Schema(
    {
        members: Array,
    },
    {
        timestamps: true,
    }
);

export const Follower = mongoose.model("Follower", followerSchema);
