import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User', // User triggering the notification
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User', // User receiving the notification
        required: true,
    },
    type: {
        type: String,
        enum: ['post', 'postlike', 'postcomment', 'message', 'jobpost'], // Type of notification
        required: true,
    },
    relatedJobPost: {
        type: Schema.Types.ObjectId,
        ref: 'JobPost', 
    },
    relatedPost: {
        type: Schema.Types.ObjectId,
        ref: 'Post', 
    },
    relatedLike: {
        type: Schema.Types.ObjectId,
        ref: 'Postlike', 
    },
    relatedComment: {
        type: Schema.Types.ObjectId,
        ref: 'Comment', 
    },
    message: {
        type: String, 
    },
    read: {
        type: Boolean,
        default: false, 
    },
    readAt: {
        type: Date, 
    },
}, { timestamps: true }); 

export const Notification = mongoose.model("Notification", notificationSchema);
