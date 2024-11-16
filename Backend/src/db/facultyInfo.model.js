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
                degree: {
                    type: String,
                    required: true,
                },
                startYear: {
                    type: String,
                    required: true,
                },
                endYear: {
                    type: String,
                    required: true,
                },
                major: {
                    type: String,
                    required: true,
                },
                isPursuing: {
                    type: Boolean,
                    required: true,
                },
                college:{
                    type: String,
                    required: true,
                }
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const FacultyInfo = mongoose.model("FacultyInfo", facultyInfoSchema);
