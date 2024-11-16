import bodyParser from "body-parser";
import mongoose, { Schema } from "mongoose";
// import { type } from "os";

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
            type: String,
            required: true,
        },
        degreeName: {
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
        workExperience: [
            {
                company: {
                    type: String,
                    required: true,
                },
                position: {
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
                isCurrentlyWorking: {
                    type: Boolean,
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
