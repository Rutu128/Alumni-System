import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: [
      {
        url: {
          type: String, //Image or video link
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("Post", postSchema);
