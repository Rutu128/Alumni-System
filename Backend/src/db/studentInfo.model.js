import mongoose, { Schema } from "mongoose";

const studentInfoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        c_id: {
            type: Number,
            required: true,
        },
        c_email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        batch: {
            type: Number,
            required: true,
        },
        collage: {
            type: String,
            required: true,
        },
        branch: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const StudentInfo = mongoose.model("StudentInfo", studentInfoSchema);
