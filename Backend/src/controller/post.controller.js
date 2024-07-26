import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import mailer from "../utils/Mailer.js";
// import { log } from "../../../client/src/log.js";
import { Post } from "../db/post.model.js";
import { PostLike } from "../db/likes.model.js";

//Upload Post

const uploadPost = asyncHandler(async (req, res) => {
  const { content, description } = req.body;
  const user_id = req.user._id;
  if (!content || !description) {
    throw new ApiError(400, "Please provide all the required fields");
  }
  console.log(user_id);
  const post = await Post.create({
    userId: user_id,
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
  // console.log(post_id);
  const user_id = req.user._id;
  if (!post_id) {
    throw new ApiError(400, "Invalid post id");
  }
  if (!user_id) {
    throw new ApiError(400, "Invalid user id");
  }
  // const post = await Post.findById(post_id);
  const isLiked = await PostLike.findOne({ postId: post_id });
  if (isLiked) {
    const postLike = await PostLike.findOneAndDelete({
      postId: post_id,
      userId: user_id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, postLike, "Post disliked successfully"));
  }
  const postLike = await PostLike.create({
    postId: post_id,
    userId: user_id,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, postLike, "Post liked successfully"));
});

const deletePost = asyncHandler(async (req, res) => {
  const post_id = req.params.id;
  const user_id = req.user._id;
  if (!post_id) {
    throw new ApiError(400, "Post is not fetched");
  }

  const deletePost = await Post.findOneAndDelete({
    _id: post_id,
    userId: user_id,
  });
  if (!deletePost) {
    throw new ApiError(402, "Some happend while deleting post");
  }
  const deleteLikes = await PostLike.findOneAndDelete({
    postId: post_id,
    userId: user_id,
  });
  if (!deleteLikes) {
    throw new ApiError(402, "Some happend while deleting likes");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Delete post successfully"));
});

const showPosts = asyncHandler(async (req, res) => {
  try {
    var page = Number(req.params.page);
    var post_data;
    post_data = await Post.aggregate([{}]);
  } catch (error) {
    throw new ApiError(400, error);
  }
});
export { uploadPost, likePost, deletePost };
