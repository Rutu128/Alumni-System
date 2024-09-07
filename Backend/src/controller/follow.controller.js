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
            const deleteRequest = await Request.findOneAndDelete({
                userId: userId,
                senderId: senderId,
            });
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
        }

        const newRequest = await Request.create({ userId, senderId });
        let follow = await Follow.findOne({ userId });
        if (!follow) {
            follow = await Follow.create({
                userId,
                followings: [],
                followers: [],
            });
        }
        follow.followings.push(senderId);
        follow = await follow.save();
        let senderFollow = await Follow.findOne({ userId: senderId });
        if (!senderFollow) {
            senderFollow = await Follow.create({
                userId: senderId,
                followings: [],
                followers: [],
            });
        }
        senderFollow.followers.push(userId);
        senderFollow = await senderFollow.save();

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { newRequest, follow, senderFollow },
                    "Request sent successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const showRequest = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const requests = await Request.find({ senderId: userId }).select(
            "-status"
        );
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
        request.status = "accepted";
        let follow = await Follow.findOne({ userId: req.user._id });
        if (!follow) {
            follow = await Follow.create({
                userId: req.user._id,
                followings: [],
                followers: [],
            });
        }
        follow.followings.push(request.userId);
        follow = await follow.save();
        let senderFollow = await Follow.findOne({ userId: request.userId });
        if (!senderFollow) {
            throw new ApiError(404, "User not found");
        }
        senderFollow.followers.push(req.user._id);
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

export { followRequest, showRequest, acceptRequest, rejectRequest };
