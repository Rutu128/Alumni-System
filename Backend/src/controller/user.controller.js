import asyncHandler from "express-async-handler";
import { User } from "../db/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { Verification } from "../db/verification.model.js";
import mailer from "../utils/Mailer.js";

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
  if (existedUser) {
    console.log(existedUser);
    throw new ApiError(
      409,
      "User with email address or charusat id is already exists "
    );
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    c_id,
    dob,
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
  const token = crypto.randomUUID();
  const verificationToken = Verification.create({
    userId: user._id,
    token,
    expireAfterSeconds: 300,
  });
  const verificationLink = `${process.env.BASE_URL}/api/auth/verify-email/${token}`;
  await mailer.sendVerificationLink(email, verificationLink);

  return res
    .status(200)
    .json(new ApiResponse(200,  createdUser, "user registered Successfully"));
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
    maxAge: 3000000,
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

export { registerUser, loginUser };
