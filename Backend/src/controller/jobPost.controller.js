import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../db/user.model.js";
import { JobPost } from "../db/jobPost.model.js";

import mongoose from "mongoose";


const uploadJobPost = asyncHandler(async (req, res) => {

    const user_Id = req.user._id;

    const user = await User.findById(user_Id);

    console.log("out");
    if(user.role === "ALUMNI" || user.role === "FACULTY" || user.role === "ADMIN"){
        console.log("in");
        
        const { title, description, location, salary, requirements, type, status, remote, company } = req.body;

        if(!title || !description || !location || !salary || !requirements || !type || !status || !remote || !company){
            throw new ApiError(400, "Please provide all the required fields");
        }
    
        const jobPost = await JobPost.create({
            userId: user_Id,
            title,
            description,
            location,
            salary,
            requirements,
            type,
            status,
            remote,
            company
        });
    
        if(!jobPost){
            throw new ApiError(300, "Post not created");
        }

        return res
        .status(200)
        .json(new ApiResponse(200, jobPost, "Job Post created successfully"));
    }else{
        throw new ApiError(400, "Only alumni and faculty can upload job posts");
    }
})

const deleteJobPost = asyncHandler(async (req, res) => {

    const user_Id = req.user._id;
    const jobPostId = req.params.id;

    if(!jobPostId){
        throw new ApiError(400, "job Post id not provided");
    }

    const deleteJobPost = await JobPost.findByIdAndDelete({
        _id: jobPostId,
        userId: user_Id
    });

    if(!deleteJobPost){
        throw new ApiError(400, "job Post not deleted");
    }

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Job Post deleted successfully"));
})

export { 
    uploadJobPost,
    deleteJobPost
}