import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
        return res
            .status(200)
            .json(
                new ApiResponse(200, newRequest, "Request sent successfully")
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const showRequest = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    try {
        const requests = await Request.find({ senderId: userId });
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
export { followRequest,showRequest };
