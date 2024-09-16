import { ApiError } from "./ApiError";

export const isAlumni = async (req, res, next) => {
    const user = req.user;
    if (user && user.role === "ALUMNI") {
        next();
    }
    throw new ApiError(401, "Unauthorized request");
};

export const isStudent = async (req, res, next) => {
    const user = req.user;
    if (user && user.role === "FACULTY") {
        next();
    }
    throw new ApiError(401, "Unauthorized request");
}

export const isFaculty = async (req, res, next) => {
    const user = req.user;
    if (user && user.role === "STUDENT") {
        next();
    }
    throw new ApiError(401, "Unauthorized request");
}

export const isVerified = async(req,res,next)=>{
    const user = req.user;
    if(user && user.isVerified){
        next();
    }
    throw new ApiError(401,"User not verified");
}