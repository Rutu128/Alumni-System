import mongoose, { Schema } from "mongoose";

const facultyInfoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        f_id: {
            type: Number,
            required: true,
        },
        f_email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        position: {
            type: String,
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
        degree: [
            {
                degreeName: {
                    type: String,
                    required: true,
                },
                year: {
                    type: Number,
                    required: true,
                },
                collage: {
                    type: String,
                    required: true,
                },
                major: {
                    type: String,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const FacultyInfo = mongoose.model("FacultyInfo", facultyInfoSchema);
