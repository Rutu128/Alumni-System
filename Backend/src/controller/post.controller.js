import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mailer from "../utils/Mailer.js";
import { log } from "../../../client/src/log.js";
import { Post } from "../db/post.model.js";
import { PostLike } from "../db/likes.model.js";

//Upload Post

const uploadPost = asyncHandler(async (req, res) => {
  const { content, title, description } = req.body;
  const user_id = req.user._id;
  if (!content || !description) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  console.log(user_id);
  const post = await Post.create({
    user_id: user_id,
    content,
    description,
  });
  if (!post) {
    throw new ApiError(300, "Post not created");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post created successfully"));
});

const likePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user._id;
  if (!post_id) {
    throw new ApiError(400, "Invalid post id");
  }
  if(!user_id){
    throw new ApiError(400, "Invalid user id");
  }
  // const post = await Post.findById(post_id);
  const isLiked = await PostLike.findOne({ post_id });
  if (isLiked) {
    const postLike = await PostLike.findOneAndDelete({ post_id, user_id });
    return res
     .status(200)
     .json(new ApiResponse(200, postLike, "Post disliked successfully"));
  }
  const postLike = await PostLike.create({ post_id, user_id });
  return res
    .status(200)
    .json(new ApiResponse(200, postLike, "Post liked successfully"));
})

export { uploadPost,likePost };
