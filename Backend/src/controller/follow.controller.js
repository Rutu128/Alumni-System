import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Request } from "../db/followRequest.model.js";
import { Follow } from "../db/follow.model.js";

const followRequest = asyncHandler(async (req, res) => {
    const { senderId } = req.params;
    try {
        const sender = await User.findById(senderId);
        if (!sender) {
            throw new ApiError(404, "User not found");
        }
        const userId = req.user._id;
        const existRequest = await Request.findOne({
            userId: userId,
            senderId: senderId,
        });
        if (existRequest) {
            const deleteRequest = await Request.deleteOne({
                userId: userId,
                senderId: senderId,
            });
            return res
                .status(200)
                .json(200, deleteRequest, "Request deleted Succesfully");
        }

        const alreadyFollow = await Follow.find({
            userId: req.user._id,
            followings: {
                $in: [{ userId: senderId }],
            },
        });
        if (alreadyFollow.length > 0) {
            throw new ApiError(400, "You are already following this user");
        }

        const newRequest = new Request({ userId, senderId });
        let follow = await Follow.findOne({ userId });
        if (!follow) {
            follow = new Follow({
                userId,
                followings: [],
                followers: [],
            });
        }
        follow.followings.push({ userId: senderId });
        let senderFollow = await Follow.findOne({ userId: senderId });
        if (!senderFollow) {
            senderFollow = await Follow.create({
                userId: senderId,
                followings: [],
                followers: [],
            });
        }
        const request = await newRequest.save();
        senderFollow.followers.push({ userId: userId });
        follow = await follow.save();
        senderFollow = await senderFollow.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { request, follow, senderFollow },
                    "Request sent successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const deleteRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    try {
        const request = await Request.findById(requestId);
        if (!request) {
            throw new ApiError(404, "Request not found");
        }
        if (request.status !== "pending") {
            throw new ApiError(400, "Request cannot be deleted in this status");
        }
        const deleteRequest = await Request.findByIdAndUpdate(requestId);
        if (!deleteRequest) {
            throw new ApiError(404, "Request not found");
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    deleteRequest,
                    "Request deleted successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const showRequest = asyncHandler(async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    try {
        const requests = await Request.aggregate([
            {
                $match: {
                    senderId: userId,
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
                    firstName: {
                        $arrayElemAt: ["$user.firstName", 0],
                    },
                    lastName: {
                        $arrayElemAt: ["$user.lastName", 0],
                    },
                    avatar: {
                        $arrayElemAt: ["$user.avatar", 0],
                    },
                    userId: {
                        $arrayElemAt: ["$user._id", 0],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    userId: 1,
                    status: 1,
                    updatedAt: 1,
                },
            },
        ]);
        return res
            .status(200)
            .json(
                new ApiResponse(200, requests, "Successfully fetched requests")
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const acceptRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    try {
        let request = await Request.findById(requestId);
        if (!request) {
            throw new ApiError(404, "Request not found");
        }
        if (request.status === "accepted") {
            throw new ApiError(400, "Request is already accepted");
        }
        if (!request.senderId.equals(req.user._id)) {
            throw new ApiError(401, "Unauthorized to accept this request");
        }
        const alreadyFollow = await Follow.find({
            userId: req.user._id,
            followings: {
                $in: [{ userId: request.userId }],
            },
        });
        if (alreadyFollow.length > 0) {
            throw new ApiError(400, "You are already following this user");
        }
        request.status = "accepted";
        let follow = await Follow.findOne({ userId: req.user._id });
        if (!follow) {
            follow = new Follow({
                userId: req.user._id,
                followings: [],
                followers: [],
            });
        }
        follow.followings.push({ userId: request.userId });
        let senderFollow = await Follow.findOne({ userId: request.userId });
        if (!senderFollow) {
            throw new ApiError(404, "User not found");
        }
        senderFollow.followers.push({ userId: req.user._id });
        follow = await follow.save();
        senderFollow = await senderFollow.save();
        request = await request.save();
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { request, follow, senderFollow },
                    "Request accepted successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const rejectRequest = asyncHandler(async (req, res) => {
    const { requestId } = req.params;
    try {
        let request = await Request.findById(requestId);
        if (!request) {
            throw new ApiError(404, "Request not found");
        }
        if (request.status === "accepted") {
            throw new ApiError(400, "Request is already accepted");
        }
        if (!request.senderId.equals(req.user._id)) {
            throw new ApiError(401, "Unauthorized to accept this request");
        }
        request.status = "rejected";
        request = await Request.findOneAndDelete({ _id: requestId });
        return res
            .status(200)
            .json(
                new ApiResponse(200, request, "Request rejected successfully")
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const showSendRequests = asyncHandler(async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const requests = await Request.aggregate([
            {
                $match: {
                    userId: userId,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "senderId",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $addFields: {
                    firstName: {
                        $arrayElemAt: ["$user.firstName", 0],
                    },
                    lastName: {
                        $arrayElemAt: ["$user.lastName", 0],
                    },
                    avatar: {
                        $arrayElemAt: ["$user.avatar", 0],
                    },
                    userId: {
                        $arrayElemAt: ["$user._id", 0],
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    userId: 1,
                    updatedAt: 1,
                },
            },
        ]);

        return res
            .status(200)
            .json(
                new ApiResponse(200, requests, "Successfully fetched requests")
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

export {
    followRequest,
    showRequest,
    acceptRequest,
    rejectRequest,
    deleteRequest,
    showSendRequests,
};
