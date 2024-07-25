import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mailer from "../utils/Mailer.js";
import { log } from "../../../client/src/log.js";
import { Post } from "../db/post.model.js";

//Upload Post

const uploadPost = asyncHandler(async (req, res) => {
  const { content, title, description } = req.body;
  const user_id = req.user._id;
  if (!content || !title || !description) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  console.log(user_id);
  const post = await Post.create({
    user_id: user_id,
    title,
    content,
    description,
  });
  if (!post) {
    throw new ApiError(300, "Post not created");
  }
  return res.status(200).json(new ApiResponse(200,post,"Post created successfully"))
});

export {
  uploadPost
}