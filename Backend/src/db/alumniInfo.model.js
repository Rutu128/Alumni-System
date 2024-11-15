import mongoose, { Schema } from "mongoose";
import { type } from "os";

const alumniInfoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        c_id: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["EMPLOYED", "STUDIES", "NAN"],
            required: true,
            default: "NAN",
        },
        batch: {
            type: Number,
            required: true,
        },
        degreeName: {
            type: String,
            required: true,
        },
        collage: {
            typeof: String,
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
                year: {
                    type: Number,
                    required: true,
                },
                major: {
                    type: String,
                    required: true,
                },
            },
        ],
        workExperience: [
            {
                companyName: {
                    type: String,
                    required: true,
                },
                role: {
                    type: String,
                    required: true,
                },
                duration: {
                    type: Number,
                    required: true,
                },
                location: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const AlumniInfo = mongoose.model("AlumniInfo", alumniInfoSchema);
