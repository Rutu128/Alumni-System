import mongoose, { Schema } from "mongoose";    

const alumniInfoSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["EMPLOYED", "STUDIES", "NAN"],
            required: true,
            default: "NAN",
        },
        graduationYear: {
            type: Number,
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
        location: {
            type: String,
            required: true,
        },
        currentJob: {
            type: String,
        },
        currentPosition: {
            type: String,
        },
        currentCompany: {
            type: String,
        },
        currentCollage: {
            type: String,
        },
        currentDegree: {
            type: String,
        },
        currentYear: {
            type: Number,
        },
        currentMajor: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const AlumniInfo = mongoose.model("AlumniInfo", alumniInfoSchema);
