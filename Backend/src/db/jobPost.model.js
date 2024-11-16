import mongoose, { Schema } from "mongoose";

const jobPostSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          location: {
            type: String,
            required: true,
          },
          salary: {
            type: String,
            required: true,
          },
          requirements: {
            type: String,
            required: true,
          },
          type: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            required: true,
          },
          remote: {
            type: Boolean,
            required: true,
          },
          company: {
            type: String,
            required: true,
          }
    },
    {
        timestamps: true
    }
)

export const JobPost = mongoose.model("JobPost", jobPostSchema)