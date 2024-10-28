import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";


const ping = asyncHandler(async (req, res) => {
    const user = req.user._id;
    // console.log(user);
    if (!user) {
        throw new ApiError(401, "User not logged in");
    }
    const loggedInUser = await User.findById(user).select(
        "-password -refreshToken -createdAt -updatedAt "
    );
    return res
        .status(200)
        .json(new ApiResponse(200, loggedInUser, "User logged in"));
});

const addInfo = asyncHandler(async (req, res) => {
    const user_id = req.user?._id;
    if (!user_id) {
        throw new ApiError(404, "User dosen't fetch");
    }
    const { headline, designation, description, avatar } = req.body;
    let user = await User.findById(user_id);

    const updated_user = await User.findByIdAndUpdate(user_id, {
        $set: {
            headline: headline ? headline : user.headline,
            designation: designation ? designation : user.designation,
            description: description ? description : user.description,
            avatar: avatar ? avatar : user.avatar,
        },
    }).select(
        "-password -refreshToken -dob -c_id -passingYear -isVerified -createdAt -updatedAt -_id"
    );
    if (!updated_user) {
        throw new ApiError(500, "Failed to add info");
    }
    user = await User.findById({ _id: user_id }).select(
        "-password -refreshToken -isVerified -createdAt -updatedAt -_id"
    );
    return res
        .status(200)
        .json(new ApiResponse(200, user, "info successfully added "));
});

const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const user_id = req.params.id;
        const id = new mongoose.Types.ObjectId(user_id);
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const userDetails = await User.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "userId",
                    as: "follow",
                },
            },
            {
                $addFields: {
                    followings: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$follow.followings", 0],
                            },
                            [],
                        ],
                    },

                    followers: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$follow.followers", 0],
                            },
                            [],
                        ],
                    },
                },
            },
            {
                $addFields: {
                    isRequested: {
                        $cond: {
                            if: {
                                $in: [userId, "$followers.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    isAccepted: {
                        $cond: {
                            if: {
                                $in: [userId, "$followings.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    avatar: 1,
                    headline: 1,
                    designation: 1,
                    passingYear: 1,
                    description: 1,
                    isRequested: 1,
                    isAccepted: 1,
                    followings: {
                        $size: "$followings",
                    },
                    followers: {
                        $size: "$followers",
                    },
                },
            },
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "userId",
                    as: "follower",
                },
            },
            {
                $addFields: {
                    followers: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$follower.followers", 0],
                            },
                            [],
                        ],
                    },
                    followings: {
                        $ifNull: [
                            {
                                $arrayElemAt: ["$follower.followings", 0],
                            },
                            [],
                        ],
                    },
                },
            },
            {
                $addFields: {
                    isRequested: {
                        $cond: {
                            if: {
                                $in: [userId, "$followers.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    isAccepted: {
                        $cond: {
                            if: {
                                $in: [userId, "$followings.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                },
            },
            {
                $project: {
                    follower: {
                        $size: "$followers",
                    },
                    following: {
                        $size: "$followings",
                    },
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    avatar: 1,
                    headline: 1,
                    designation: 1,
                    passingYear: 1,
                    description: 1,
                    isRequested: 1,
                    isAccepted: 1,


                },
            },
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, userDetails, "User details"));
        
    } catch (error) {
        throw new ApiError(400, error, "Failed to fetch user details");
    }
});

const me = asyncHandler(async (req, res) => {
    try {
        const user_id = req.user._id;
        const userDetails = await User.findById(user_id).select(
            "firstName lastName email avatar headline designation passingYear description c_id"
        );
        return res
            .status(200)
            .json(new ApiResponse(200, userDetails, "User details"));
    } catch (error) {
        throw new ApiError(400, error, "Failed to get user details");
    }
});
// User Completely
const updateProfile = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        c_id,
        email,
        passingYear,
        dob,
        designation,
        headline,
        avatar,
        description,
    } = req.body;
    const user_id = req.user?._id;
    if (!user_id) {
        throw new ApiError(404, "User dosen't exist");
    }
    let user = await User.findById(user_id);

    const updatedUser = await User.findByIdAndUpdate(user_id, {
        $set: {
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            c_id: c_id ? c_id : user.c_id,
            email: email ? email : user.email,
            passingYear: passingYear ? passingYear : user.passingYear,
            dob: dob ? dob : user.dob,
            designation: designation ? designation : user.designation,
            avatar: avatar ? avatar : user.avatar,
            headline: headline ? headline : user.headline,
            description: description ? description : user.description,
        },
    }).select("-password -_id -refreshToken -createdAt -updatedAt");
    user = await User.findById(user_id).select(
        "-password -_id -refreshToken -createdAt -updatedAt -isverified"
    );

    return res.status(200).json(new ApiResponse(200, user, "success"));
});

const updateAvatar = asyncHandler(async (req, res) => {
    try {
        const { avatar } = req.body;
        const user_id = req.user._id;
        let user = await User.findById(user_id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const updateAvatar = await User.findByIdAndUpdate(user._id, {
            $set: {
                avatar: avatar ? avatar : user.avatar,
            },
        });
        user = await User.findById(user_id).select(
            "-password -_id -refreshToken -createdAt -updatedAt -isVerified -dob -c_id -passingYear"
        );
        return res
            .status(200)
            .json(new ApiResponse(200, user, "Avatar updated successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Failed to update avatar");
    }
});

const findUser = asyncHandler(async (req, res) => {
    try {
        const { search } = req.params;
        const users = await User.find({
            $or: [
                { firstName: { $regex: `${search}`, $options: "i" } },
                { lastName: { $regex: `${search}`, $options: "i" } },
            ],
        }).select("_id firstName lastName avatar");
        return res.status(200).json(new ApiResponse(200, users, "Success"));
    } catch (error) {
        throw new ApiError(400, error, "Failed to find user");
    }
});
export {
    ping,
    addInfo,
    getUserDetails,
    me,
    updateProfile,
    updateAvatar,
    findUser,
};
