import mongoose, { Schema } from "mongoose";

const commentLikeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


export const CommentLike = mongoose.model('Commentlike',commentLikeSchema)
