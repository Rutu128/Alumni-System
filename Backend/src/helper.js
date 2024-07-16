export const DB_NAME = "Rutu"
// import { ApiError } from "./utils/ApiError.js";
// import asyncHandler  from "express-async-handler";
// import jwt from "jsonwebtoken"
// import { User } from "./db/user.model.js";

// export const getname = asyncHandler(async(req,_) => {
//     try {
//         const accessToken = req.cookies.accessToken
//         const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
//         console.log(user);
//         return await (user?.fullName || "Guest")
    
//     } catch (error) {
//         throw new ApiError(401, "Error" || "Invalid access token")
//     }
// })