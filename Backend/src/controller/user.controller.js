import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";
import { Verification } from "../db/verification.model.js";
import mailer from "../utils/Mailer.js";
import { randomBytes } from "crypto";
import mongoose from "mongoose";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "something went wrong during generating access token and refresh token"
        );
    }
};

const generateRandomHex = (length) => {
    return randomBytes(length).toString("hex");
};

const registerUser = asyncHandler(async (req, res) => {
    const { firstName, lastName, c_id, email, password, passingYear, dob } =
        req.body;

    if (
        [firstName, lastName, email, c_id, dob, passingYear, password].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const existedUser = await User.findOne({
        $or: [{ c_id }, { email }],
    });
    // console.log('Existed user:', existedUser);
    if (existedUser) {
        console.log(existedUser);
        throw new ApiError(
            409,
            "User with email address or charusat id is already exists "
        );
    }

    const user_initials = firstName[0] + lastName[0];
    if (!user_initials) {
        throw new ApiError(403, "User initials are not setedIn");
    }
    const avatarUrl = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
    const user = await User.create({
        firstName,
        lastName,
        email,
        c_id,
        dob,
        initials: user_initials,
        avatar: avatarUrl,
        passingYear,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -dob -c_id -passingYear -isVerified -createdAt -updatedAt -_id"
    );
    // console.log(createdUser)

    if (!createdUser) {
        throw new ApiError(500, "something went wrong");
    }
    const token = generateRandomHex(20);
    const verificationToken = Verification.create({
        userId: user._id,
        token,
        expiresAt: Date.now() + 300,
    });
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;
    await mailer.sendVerificationLink(email, verificationLink);

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "user registered Successfully")
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if ([email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const user = await User.findOne({ email });
    // const isverified = user.isVerified
    // if (!isverified) {
    //     throw new ApiError(401, "please verify your email")
    // }

    if (!user) {
        throw new ApiError(404, "user not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -dob -c_id -passingYear -isVerified -createdAt -updatedAt -_id"
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 604800000,
    };

    // const user_info = await Info.findOne({ user: user._id })
    // if (!user_info) {
    //     return res.status(202).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken).json(new ApiResponse(202, { user: loggedInUser, accessToken, refreshToken }, "Add Information"))
    // }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "loggedin Successfully"
            )
        );
});

const verify = asyncHandler(async (req, res) => {
    const { token } = req.params;
    // console.log(token);
    // console.log(typeof token);

    if (!token) {
        throw new ApiError(404, "Token not found");
    }

    const verification = await Verification.findOne({ token: token });
    if (!verification) {
        throw new ApiError(404, "Verification not found");
    }

    const user = await User.findById(verification.userId);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.isVerified = true;
    await user.save({ validateBeforeSave: false });
    await Verification.deleteOne({ token: token });

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Email verified successfully"));
});

const changePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Give Old and New Password Both!!!");
    }
    const user_id = req.user?._id;
    if (!user_id) {
        throw new ApiError(404, "User dosen't fetch");
    }
    const user = await User.findById(user_id);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid password");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    //remove cookies
    //reset refresh token
    await User.findById(
        req.user._id,
        {
            unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );
    const options = {
        httpOnly: true,
        secure: true,
    };
    // console.log(hii)
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"));
});

const googleLogin = asyncHandler(async (req, res) => {
    const { code } = req.query;

    try {
        // Exchange authorization code for access token
        const { data } = await axios.post(
            "https://oauth2.googleapis.com/token",
            {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                code,
                redirect_uri: process.env.GOOGLE_REDIRECT_URI,
                grant_type: "authorization_code",
            }
        );

        const { access_token, id_token } = data;
        const { data: profile } = await axios.get(
            "https://www.googleapis.com/oauth2/v1/userinfo",
            {
                headers: { Authorization: `Bearer ${access_token}` },
            }
        );
        let user = await User.findOne({ email: profile.email.toLowerCase() });

        if (!user) {
            user = await User.create({
                firstName: profile.given_name,
                lastName: profile.family_name,
                email: profile.email.toLowerCase(),
                isVerified: true,
            });
            if (!user) {
                throw new ApiError(500, "Failed to create user");
            }
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken -dob -c_id -passingYear -isVerified -createdAt -updatedAt -_id"
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3000000,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken)
            .json(
                new ApiResponse(
                    200,
                    { user: loggedInUser, accessToken, refreshToken },
                    "loggedin Successfully"
                )
            )
            .redirect(`${process.env.BASE_URL}/`);
    } catch (error) {
        throw new ApiError(500, "Failed to authenticate with Google");
    }
});

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
    const { headline, designation } = req.body;

    const user = await User.findByIdAndUpdate(user_id, {
        $set: {
            headline,
            designation,
        },
    }).select(
        "-password -refreshToken -dob -c_id -passingYear -isVerified -createdAt -updatedAt -_id"
    );
    if (!user) {
        throw new ApiError(500, "Failed to add info");
    }
    const updated_user = await User.findById({ _id: user_id }).select(
        "-password -refreshToken -isVerified -createdAt -updatedAt -_id"
    );
    return res
        .status(200)
        .json(new ApiResponse(200, updated_user, "info successfully added "));
});

const getUserDetails = asyncHandler(async (req, res) => {
    try {
        const user_id = req.params.id;
        const id = new mongoose.Types.ObjectId(user_id);
        const userDetails = await User.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "posts",
                },
            },
            {
                $unwind: "$posts",
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "posts._id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "posts._id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $addFields: {
                    "posts.isLiked": {
                        $cond: {
                            if: {
                                $in: [id, "$likes.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    "posts.likesCount": { $size: "$likes" },
                    "posts.commentsCount": { $size: "$comments" },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    posts: { $push: "$posts" },
                    firstName: { $first: "$firstName" },
                    lastName: { $first: "$lastName" },
                    email: { $first: "$email" },
                    avatar: { $first: "$avatar" },
                    headline: { $first: "$headline" },
                    designation: { $first: "$designation" },
                    passingYear: { $first: "$passingYear" },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    posts: 1,
                    avatar: 1,
                    headline: 1,
                    designation: 1,
                    passingYear: 1,
                },
            },
        ]);

        return res
            .status(200)
            .json(new ApiResponse(200, userDetails, "User details"));
    } catch (error) {
        throw new ApiError(400, error, "Failed to get user details");
    }
});

const me = asyncHandler(async (req, res) => {
    try {
        const user_id = req.user._id;
        const id = new mongoose.Types.ObjectId(user_id);
        const userDetails = await User.aggregate([
            {
                $match: {
                    _id: id,
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "_id",
                    foreignField: "userId",
                    as: "posts",
                },
            },
            {
                $unwind: "$posts",
            },
            {
                $lookup: {
                    from: "postlikes",
                    localField: "posts._id",
                    foreignField: "postId",
                    as: "likes",
                },
            },
            {
                $lookup: {
                    from: "comments",
                    localField: "posts._id",
                    foreignField: "postId",
                    as: "comments",
                },
            },
            {
                $addFields: {
                    "posts.isLiked": {
                        $cond: {
                            if: {
                                $in: [id, "$likes.userId"],
                            },
                            then: true,
                            else: false,
                        },
                    },
                    "posts.likesCount": { $size: "$likes" },
                    "posts.commentsCount": { $size: "$comments" },
                },
            },
            {
                $group: {
                    _id: "$_id",
                    posts: { $push: "$posts" },
                    firstName: { $first: "$firstName" },
                    lastName: { $first: "$lastName" },
                    email: { $first: "$email" },
                    avatar: { $first: "$avatar" },
                    headline: { $first: "$headline" },
                    designation: { $first: "$designation" },
                    passingYear: { $first: "$passingYear" },
                },
            },
            {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    posts: 1,
                    avatar: 1,
                    headline: 1,
                    designation: 1,
                    passingYear: 1,
                },
            },
        ]);
        return res
            .status(200)
            .json(new ApiResponse(200, userDetails, "User details"));
    } catch (error) {
        throw new ApiError(400, error, "Failed to get user details");
    }
});

export {
    registerUser,
    loginUser,
    verify,
    changePassword,
    logoutUser,
    googleLogin,
    ping,
    addInfo,
    getUserDetails,
    me
};
