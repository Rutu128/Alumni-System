import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../db/user.model.js";
import { JobPost } from "../db/jobPost.model.js";

import mongoose from "mongoose";

const uploadJobPost = asyncHandler(async (req, res) => {
    try {
        const user_Id = req.user._id;

        const user = await User.findById(user_Id);

        if (
            user.role === "ALUMNI" ||
            user.role === "FACULTY" ||
            user.role === "ADMIN"
        ) {
            const {
                title,
                description,
                location,
                salary,
                requirements,
                type,
                status,
                remote,
                company,
            } = req.body;

            if (
                !title ||
                !description ||
                !location ||
                !salary ||
                !requirements ||
                !type ||
                !status ||
                !remote ||
                !company
            ) {
                throw new ApiError(
                    400,
                    "Please provide all the required fields"
                );
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
                company,
            });

            if (!jobPost) {
                throw new ApiError(300, "Post not created");
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        jobPost,
                        "Job Post created successfully"
                    )
                );
        } else {
            throw new ApiError(
                400,
                "Only alumni and faculty can upload job posts"
            );
        }
    } catch (error) {
        throw new ApiError(400, error, "Error while uploading job post");
    }
});

const deleteJobPost = asyncHandler(async (req, res) => {
    try {
        const user_Id = req.user._id;
        const jobPostId = req.params.id;

        if (!jobPostId) {
            throw new ApiError(400, "job Post id not provided");
        }

        const deleteJobPost = await JobPost.findByIdAndDelete({
            _id: jobPostId,
            userId: user_Id,
        });

        if (!deleteJobPost) {
            throw new ApiError(400, "job Post not deleted");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Job Post deleted successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while deleting job post");
    }
});

const showJobs = asyncHandler(async (req, res) => {
    try {
        const jobs = await JobPost.aggregate([
            {
                $lookup: {
                    from: 'users', 
                    localField: 'userId', 
                    foreignField: '_id', 
                    as: 'user', 
                },
            },
            {
                $unwind: '$user', 
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    location: 1,
                    salary: 1,
                    requirements: 1,
                    type: 1,
                    status: 1,
                    remote: 1,
                    company: 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.email': 1,
                },
            },])
        return res
            .status(200)
            .json(new ApiResponse(200, jobs, "Jobs fetched successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while fetching jobs");
    }
});

const getJob = asyncHandler(async (req, res) => {
    try {
        const job_id = req.params.id;

        if (!job_id) {
            throw new ApiError(400, "job Post id not provided");
        }

        const job = await JobPost.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(job_id), // Match the specific job by its ID
                },
            },
            {
                $lookup: {
                    from: 'users', // Name of the users collection
                    localField: 'userId', // Field in JobPost referencing the user
                    foreignField: '_id', // Field in the User collection being referenced
                    as: 'user', // Name for the joined data
                },
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true, // Keep the job even if no user is found
                },
            },
            {
                $project: {
                    title: 1,
                    description: 1,
                    location: 1,
                    salary: 1,
                    requirements: 1,
                    type: 1,
                    status: 1,
                    remote: 1,
                    company: 1,
                    'user.firstName': 1,
                    'user.lastName': 1,
                    'user.email': 1,
                },
            },
        ]);

        if (!job) {
            throw new ApiError(400, "Job not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, job, "Job fetched successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while fetching job");
    }
});

const updateJob = asyncHandler(async (req, res) => {
    try {
        const user_Id = req.user._id;
        const jobPostId = req.params.id;

        if (!jobPostId) {
            throw new ApiError(400, "job Post id not provided");
        }

        const jobPost = await JobPost.findById({ _id: jobPostId });

        if (!jobPost.userId.equals(user_Id)) {
            throw new ApiError(
                400,
                "You are not authorized to update this job post"
            );
        }

        const updateFields = Object.fromEntries(
            Object.entries(req.body).filter(([_, value]) => value !== undefined)
        );

        if (Object.keys(updateFields).length === 0) {
            throw new ApiError(400, "No fields provided to update");
        }

        const updateJob = await JobPost.findByIdAndUpdate(
            {
                _id: jobPostId,
                userId: user_Id,
            },
            {
                $set: updateFields,
            }
        );

        if (!updateJob) {
            throw new ApiError(400, "job Post not updated");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "Job Post updated successfully"));
    } catch (error) {
        throw new ApiError(400, error, "Error while updating job post");
    }
});

export { uploadJobPost, deleteJobPost, showJobs, getJob, updateJob };