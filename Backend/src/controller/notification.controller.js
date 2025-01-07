import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.js";
import { Follow } from "../db/follow.model.js";
import { Post } from "../db/post.model.js";
import { Comment } from "../db/comment.model.js";
import { Postlike } from "../db/likes.model.js";
import { JobPost } from "../db/jobPost.model.js";
import { Notification } from "../db/notification.model.js";
import { UserNotification } from "../db/usernotification.model.js";
import mongoose from "mongoose";

const sendNotificationForPost = asyncHandler(async (req, res) => {
    try {
        const { post_id, sender_id } = req.body;

        if (!post_id || !sender_id) {
            throw new ApiError(400, "Post id and sender id are required");
        }

        const followdata = await Follow.findOne({ userId: sender_id }).populate('followers.userId');
        if (!followdata || followdata.followers.length == 0) {
            throw new ApiError(400, "No followers found for the sender");
        }

        const notifications = followdata.followers.map(follower => ({
            sender: sender_id,
            receiver: follower.userId._id,
            type: 'post',
            relatedPost: post_id,
            message: `User ${sender_id} uploaded a new post!`,
        }));
        
        const insertedNotifications = await Notification.insertMany(notifications);

        insertedNotifications.forEach(async (notification) => {
            await UserNotification.findOneAndUpdate(
                { user: notification.receiver },
                { $push: { notifications: notification._id } },
                { upsert: true, new: true }
            );
        });
        
        return res
            .status(200)
            .json(new ApiResponse(true, "Notifications sent successfully", null));
    } catch (error) {
        throw new ApiError(400, "Error while sending a notification!", error);
    }
});

const sendNotificationForPostLike = asyncHandler(async (req, res) => {
    try {
        const { post_id, postauthor_id, sender_id } = req.body;

        if (!post_id || !postauthor_id || !sender_id) {
            throw new ApiError(400, "Post id, post author id and sender id are required");
        }

        if (sender_id === postauthor_id) {
            throw new ApiError(400, "You cannot like your own post!!");
        }

        const post = await Post.findById(post_id);
        if (!post) {
            throw new ApiError(400, "Post not found");
        }

        const followData = await Follow.findOne({ userId: postauthor_id }).populate('followers.userId');
        if (!followData || followData.followers.length === 0) {
            throw new ApiError(404, "Post author has no followers to notify");
        }

        const isFollower = followData.followers.filter(follower => follower.userId.toString() === sender_id);
        if (isFollower.length === 0) {
            throw new ApiError(400, "You are not a follower of post's Author to like post.");
        }

        const existinglike = await Postlike.findOne({postId : post_id , userId : sender_id});
        if(existinglike){
            throw new ApiError(400, "You have already liked this post");
        }

        const like = new Postlike({
            postId: post_id,
            userId: sender_id
        });

        await like.save();

        const notification = new Notification({
            sender: sender_id,
            receiver: postauthor_id,
            type: 'postlike', 
            relatedPost: post_id,
            message: `User ${sender_id} liked your post!`,
        });

        await notification.save();

        await UserNotification.findOneAndUpdate(
            { user: notification.receiver },
            { $push: { notifications: notification._id } },
            { upsert: true }
        );

        return res
        .status(201)
        .json(new ApiResponse(true, "Notification sent successfully", null));

    } catch (error) {
        throw new ApiError(400, "Error while sending a notification!", error);
    }
});

const sendNotificationForPostComment = asyncHandler(async(req,res) => {
    try {
        const {post_id , commenter_id , postauthor_id, comment_id} =  req.body;

        if(!post_id || !commenter_id || !comment_id || !postauthor_id){
            throw new ApiError(400, "All fields are required");
        }

        if(commenter_id === postauthor_id){
            throw new ApiError(400, "You can't comment on your own post");
        }

        const post = await Post.findById(post_id);
        if (!post) {
            throw new ApiError(404, "Post not Found!!");
        }

        const comment = await Comment.findById(comment_id);
        if (!comment) {
            throw new ApiError(404, "Comment not Found!!");
        }

        const followData = await Follow.findOne({userId : postauthor_id,}).populate('followers.userId');
        if (followData && followData.followers.length > 0) {
            const isFollower = followData.followers.some(follower => follower.userId.toString() === commenter_id);
            if (!isFollower) {
                throw new ApiError(400, "You must be a follower of the post author to comment.");
            }
        }

        const notification = new Notification({
            sender: commenter_id,
            receiver: postauthor_id,
            type: 'postcomment', 
            relatedPost: post_id,
            message: `User ${commenter_id} commented on your post!`,
        });

        await notification.save();

        await UserNotification.findOneAndUpdate(
            { user: postauthor_id },
            { $push: { notifications: notification._id } },
            { upsert: true }
        );

        return res
        .status(201)
        .json(new ApiResponse(true, "Notification sent successfully", null));
        
    } catch (error) {
        throw new ApiError(400, "Error while sending a notification!", error);
    }
});

const sendNotificationForJobPost = asyncHandler(async (req, res) => {
    try {
        const { jobpost_id, sender_id } = req.body;

        if (!jobpost_id || !sender_id) {
            throw new ApiError(400, "Invalid request");
        }

        const jobpost = await JobPost.findById(jobpost_id).populate('category');
        if (!jobpost) {
            throw new ApiError(404, "Job Post not Found!!");
        }

        const sender = await User.findById(sender_id).populate('followers');
        if (!sender) {
            throw new ApiError(404, "Sender not Found!!");
        }

        const usersToNotify = sender.followers;
        if (usersToNotify.length === 0) {
            return res
                .status(200)
                .json(new ApiResponse(true, "No followers to notify", null));
        }

        const notifications = usersToNotify.map(user => ({
            sender: sender_id,
            receiver: user._id,
            type: 'jobpost',
            relatedJobPost: jobpost_id,
            message: `${sender.username} posted a new job in ${jobpost.category.name}: ${jobpost.title}`,
        }));

        const insertedNotifications = await Notification.insertMany(notifications);

        await Promise.all(
            usersToNotify.map(user =>
                UserNotification.findOneAndUpdate(
                    { user: user._id },
                    { $push: { notifications: insertedNotifications.map(n => n._id) } },
                    { upsert: true }
                )
            )
        );

        return res
            .status(201)
            .json(new ApiResponse(true, "Job Post Notifications sent successfully!", null));

    } catch (error) {
        throw new ApiError(400, "Error while sending a notification!", error);
    }
});

export { sendNotificationForPost, sendNotificationForPostLike , sendNotificationForPostComment
    , sendNotificationForJobPost
};