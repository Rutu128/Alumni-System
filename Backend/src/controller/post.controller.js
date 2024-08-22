import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import mailer from "../utils/Mailer.js";
// import { log } from "../../../client/src/log.js";
import { Post } from "../db/post.model.js";
import { PostLike } from "../db/likes.model.js";
import { CommentLike } from "../db/likesComment.model.js";
import { Comment } from "../db/comment.model.js";
import mongoose from "mongoose";

//Upload Post

const uploadPost = asyncHandler(async (req, res) => {
    const { content, description } = req.body;
    const user_id = req.user._id;
    if (!content || !description) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    // console.log(user_id);
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
    const user_id = req.user._id;
    const post = await Post.findById({ _id: post_id });
    if (!post) {
        throw new ApiError(400, "Invalid post id");
    }
    if (!user_id) {
        throw new ApiError(400, "Invalid user id");
    }
    // const post = await Post.findById(post_id);
    const isLiked = await PostLike.findOne({
        postId: post_id,
        userId: user_id,
    });
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

    const deleteComments = await Comment.deleteMany({ postId: post_id });

    const deleteCommentLikes = await CommentLike.deleteMany({
        postId: post_id,
    });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Delete post successfully"));
});

const showPosts = asyncHandler(async (req, res) => {
    try {
        const user_id = req.user._id;
        var page = Number(req.params.page);
        var post_data;
        const id = new mongoose.Types.ObjectId(user_id);
        post_data = await Post.aggregate([
            {
                $lookup: {
                    from: "postlikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    isLiked: {
                        $cond: {
                            if: {
                                $in: [id, "$likes.userId"], // Check if loggedInUserId exists in likes.userId array
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    likes: {
                        $size: "$likes",
                    },
                    comments: {
                        $size: "$comments",
                    },
                    content: 1,
                    description: 1,
                    createdAt: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.initials": 1,
                    "user.avatar": 1,
                    "user._id": 1,
                    isLiked: 1,
                },
            },

            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $skip: 10 * (page - 1),
            },
            {
                $limit: 10,
            },
        ]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    post_data,
                    "Post data fetched successfully"
                )
            );
    } catch (error) {
        throw new ApiError(400, error);
    }
});

const addComment = asyncHandler(async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.user._id;
    const { comment } = req.body;
    if (!post_id || !user_id || !comment) {
        throw new ApiError(400, "Please provide all the required fields");
    }
    const newComment = await Comment.create({
        userId: user_id,
        postId: post_id,
        comment,
    });
    if (!newComment) {
        throw new ApiError(300, "Comment not created");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, newComment, "Comment Added Succesfully"));
});

const likeComment = asyncHandler(async (req, res) => {
    const comment_id = req.params.id;
    const user_id = req.user._id;
    const comment = await Comment.findById({ _id: comment_id });
    if (!comment) {
        throw new ApiError(400, "Invalid comment id");
    }
    if (!user_id) {
        throw new ApiError(400, "Invalid user id");
    }
    const isLiked = await CommentLike.findOne({
        commentId: comment_id,
        userId: user_id,
    });
    if (isLiked) {
        const commentLike = await CommentLike.findOneAndDelete({
            commentId: comment_id,
            userId: user_id,
        });
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    commentLike,
                    "Comment disliked successfully"
                )
            );
    }
    const commentLike = await CommentLike.create({
        commentId: comment_id,
        userId: user_id,
    });
    return res
        .status(200)
        .json(new ApiResponse(200, commentLike, "Comment liked successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
    const comment_id = req.params.id;
    const user_id = req.user._id;
    if (!comment_id || !user_id) {
        throw new ApiError(400, "Please provide id");
    }
    const deleteComment = await Comment.findOneAndDelete({
        _id: comment_id,
        userId: user_id,
    });
    if (!deleteComment) {
        throw new ApiError(402, "Some happend while deleting comment");
    }
    const deleteLikes = await CommentLike.findOneAndDelete({
        commentId: comment_id,
        userId: user_id,
    });
    if (!deleteLikes) {
        throw new ApiError(402, "Some happend while deleting likes");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Delete comment successfully"));
});

const getComments = asyncHandler(async (req, res) => {
    const post_id = req.params.id;
    const user_id = req.user._id;
    const post = await Post.findById({ _id: post_id });
    if (!post) {
        throw new ApiError(404, "No Post available");
    }
    const id = new mongoose.Types.ObjectId(post_id);
    const uid = new mongoose.Types.ObjectId(user_id);
    const comments = await Comment.aggregate([
        {
            $match: {
                postId: id,
            },
        },
        {
            $lookup: {
                from: "commentlikes",
                localField: "_id",
                foreignField: "commentId",
                as: "likes",
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "users",
            },
        },
        {
            $addFields: {
                like: {
                    $size: "$likes",
                },
                users: {
                    $arrayElemAt: ["$users", 0],
                },
                isLiked: {
                    $cond: {
                        if: {
                            $in: [uid, "$likes.userId"], // Check if loggedInUserId exists in likes.userId array
                        },
                        then: true,
                        else: false,
                    },
                },
            },
        },
        {
            $project: {
                comment: 1,
                userId: 1,
                postId: 1,
                like: 1,
                isLiked: 1,
                createdAt: 1,
                "users.firstName": 1,
                "users.lastName": 1,
                "users.initials": 1,
                "users.avatar": 1,
                "users._id": 1,
            },
        },
    ]);
    if (!comments || comments.length === 0) {
        return res
            .status(202)
            .json(new ApiResponse(202, {}, "Comment not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, comments, "Comment fetched successfully"));
});

const myPosts = asyncHandler(async (req, res) => {
    try {
        const user_id = req.user._id;
        const id = new mongoose.Types.ObjectId(user_id);
        const posts = await Post.aggregate([
            {
                $match: {
                    userId: id,
                },
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: ["$users", 0],
                    },
                    isLiked: {
                        $cond: {
                            if: {
                                $in: [id, "$likes.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    likes: {
                        $size: "$likes",
                    },
                    comments: {
                        $size: "$comments",
                    },
                    content: 1,
                    description: 1,
                    createdAt: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.initials": 1,
                    "user.avatar": 1,
                    isLiked: 1,
                },
            },
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, posts, "My Posts fetched successfully"));
    } catch (error) {
        throw new Error(400, "Error fetching My posts");
    }
});

const myLikes = asyncHandler(async (req, res) => {
    try {
        const user_id = req.user._id;
        const id = new mongoose.Types.ObjectId(user_id);
        const likedPosts = await PostLike.aggregate([
            {
                $match: {
                    userId: id,
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "postId",
                    foreignField: "_id",
                    as: "post",
                },
            },
            {
                $unwind: "$post",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                },
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "post._id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $addFields: {
                    likes: {
                        $size: "$likes",
                    },
                    isLiked: {
                        $in: [id, "$likes.userId"], // Replace with the actual logged-in user ID
                    },
                },
            },
            {
                $project: {
                    "post.content": 1,
                    "post.description": 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.initials": 1,
                    "user.avatar": 1,
                    likes: 1,
                    isLiked: 1,
                },
            },
        ]);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    likedPosts,
                    "My Likes fetched successfully"
                )
            );
    } catch (error) {
        throw new ApiError(400, error, "Error while fetching my likes");
    }
});

const getUserPosts = asyncHandler(async (req, res) => {
    try {
        const user_id = req.params.id;
        const id = new mongoose.Types.ObjectId(user_id);
        const posts = await Post.aggregate([
            {
                $match: {
                    userId: id,
                },
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "users",
                },
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: ["$users", 0],
                    },
                    isLiked: {
                        $cond: {
                            if: {
                                $in: [id, "$likes.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    likes: {
                        $size: "$likes",
                    },
                    comments: {
                        $size: "$comments",
                    },
                    content: 1,
                    description: 1,
                    createdAt: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.initials": 1,
                    "user.avatar": 1,
                    "user._id": 1,
                    isLiked: 1,
                },
            },
        ]);
        return res
            .status(200)
            .json(new ApiResponse(200, posts, "Posts Fetched successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while fetching user posts");
    }
});

const getPost = asyncHandler(async (req, res) => {
    try {
        const post_id = req.params.id;
        const id = new mongoose.Types.ObjectId(post_id);
        const user_id = new mongoose.Types.ObjectId(req.user._id);
        const post_data = await Post.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "_id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    user: {
                        $arrayElemAt: ["$user", 0],
                    },
                    isLiked: {
                        $cond: {
                            if: {
                                $in: [user_id, "$likes.userId"], // Check if loggedInUserId exists in likes.userId array
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    likes: {
                        $size: "$likes",
                    },
                    comments: {
                        $size: "$comments",
                    },
                    content: 1,
                    description: 1,
                    createdAt: 1,
                    "user.firstName": 1,
                    "user.lastName": 1,
                    "user.initials": 1,
                    "user.avatar": 1,
                    "user._id": 1,
                    isLiked: 1,
                },
            },
        ]);
        if (!post_data || post_data.length === 0) {
            throw new ApiError(404, {}, "Post Not Found");
        }
        return res
            .status(200)
            .json(new ApiResponse(200, post_data, "Post fetched successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while fetching Post");
    }
});
export {
    uploadPost,
    likePost,
    deletePost,
    showPosts,
    addComment,
    likeComment,
    deleteComment,
    getComments,
    myPosts,
    myLikes,
    getUserPosts,
    getPost,
};
