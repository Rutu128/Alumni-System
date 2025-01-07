import mongoose, { Schema } from 'mongoose';

const userNotificationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification', 
    }],
}, { timestamps: true });

export const UserNotification = mongoose.model('UserNotification', userNotificationSchema);
