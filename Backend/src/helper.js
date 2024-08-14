export const DB_NAME = "Rutu";

import { ApiError } from "./utils/ApiError.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User } from "./db/user.model.js";

export const getname = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  try {
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    req.userName = user ? user.firstName : "Guest";
  } catch (error) {
    req.userName = "Guest";
  }
  next();
});
