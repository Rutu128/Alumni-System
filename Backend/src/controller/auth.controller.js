import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import jwt from "jsonwebtoken";

import mailer from "../utils/Mailer.js";
import { randomBytes } from "crypto";
import { StudentInfo } from "../db/studentInfo.model.js";
import { FacultyInfo } from "../db/facultyInfo.model.js";
import { Otp } from "../db/otp.model.js";
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
    const { firstName, lastName, email, password, dob, role } = req.body;

    if (
        [firstName, lastName, email, dob, password, role].some(
            (field) => field?.trim() === ""
        )
    ) {
        throw new ApiError(400, "Please fill all the fields");
    }
    const existedUser = await User.findOne({
        email: email,
    });
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
    const user = new User({
        firstName,
        lastName,
        email,
        dob,
        initials: user_initials,
        avatar: avatarUrl,
        password,
        role: role.toUpperCase(),
    });
    const createdUser = await user.save();
    let otp = new Otp({
        userId: createdUser._id,
        email: createdUser.email,
    });
    otp = await otp.save();

    return res
        .status(200)
        .json(
            new ApiResponse(200, createdUser, "user registered Successfully")
        );
});

const studentInfo = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const { c_id, c_email, batch, collage, branch } = req.body;
        if (
            [c_id, c_email, batch, collage, branch].some(
                (field) => field?.trim() === ""
            )
        ) {
            throw new ApiError(400, "Please fill all the fields");
        }
        const alreadyExist = await StudentInfo.findOne({
            $or: [{ c_id: c_id }, { c_email: c_email }],
        });
        if (alreadyExist) {
            throw new ApiError(409, "Student already exist");
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const studentInfo = new StudentInfo({
            userId,
            c_id,
            c_email,
            batch,
            collage,
            branch,
        });
        await studentInfo.save();
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    studentInfo,
                    "Student info added successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const facultyInfo = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const { f_id, f_email, position, collage, branch } = req.body;
        if (
            [f_id, f_email, position, collage, branch].some(
                (field) => field?.trim() === ""
            )
        ) {
            throw new ApiError(400, "Please fill all the fields");
        }
        const alreadyExist = await StudentInfo.findOne({
            $or: [f_email, f_id],
        });
        if (alreadyExist) {
            throw new ApiError(409, "Faculty already exist");
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const facultyInfo = new FacultyInfo({
            userId,
            f_id,
            f_email,
            position,
            collage,
            branch,
        });
        await facultyInfo.save();
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    facultyInfo,
                    "Faculty info added successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const alumniInfo = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const {
            status,
            graduationYear,
            location,
            degreeName,
            collage,
            branch,
        } = req.body;
        if (
            [
                c_id,
                status,
                graduationYear,
                location,
                degreeName,
                collage,
                branch,
            ].some((field) => field?.trim() === "")
        ) {
            throw new ApiError(400, "Please fill all the fields");
        }
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        let alumniInfo = new AlumniInfo({
            userId,
            status,
            graduationYear,
            location,
            degreeName,
            collage,
            branch,
            degree: [],
            workExperience: [],
        });
        alumniInfo.degree.push({ degree: degreeName, year, major: branch });
        alumniInfo = await alumniInfo.save();
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    alumniInfo,
                    "Alumni info added successfully"
                )
            );
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
});

const sendOtp = asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);
        let createOtp = await Otp.findOneAndUpdate(
            { userId: userId },
            { otp:otp }
        );
        if (!createOtp) {
            throw new ApiError(404, "Otp not found");
        }
        await mailer.sendVerificationOtp(createOtp.email, otp);
        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Otp sent successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
}); 



const verifyOtp = asyncHandler(async (req, res) => {
    const { userId, otp } = req.body;
    try {
        let user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        let otpData = await Otp.findOne({ userId });
        if (!otpData) {
            throw new ApiError(404, "Otp not found");
        }
        if (otpData.otp !== otp) {
            throw new ApiError(401, "Invalid otp");
        }
        user.isVerified = true;
        await user.save({ validateBeforeSave: false });
        return res.status(200).json(new ApiResponse(200, {}, "Otp verified"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error, "Server Error");
    }
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

// const verify = asyncHandler(async (req, res) => {
//     const { token } = req.params;

//     if (!token) {
//         throw new ApiError(404, "Token not found");
//     }

//     const verification = await Verification.findOne({ token: token });
//     if (!verification) {
//         throw new ApiError(404, "Verification not found");
//     }

//     const user = await User.findById(verification.userId);
//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     user.isVerified = true;
//     await user.save({ validateBeforeSave: false });
//     await Verification.deleteOne({ token: token });

//     return res
//         .status(200)
//         .json(new ApiResponse(200, user, "Email verified successfully"));
// });

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

export {
    registerUser,
    loginUser,
    changePassword,
    logoutUser,
    sendOtp,
    verifyOtp,
    studentInfo,
    facultyInfo,
    alumniInfo,
};
