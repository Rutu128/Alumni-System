import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadJobPost } from "../controller/jobPost.controller.js";

const router = Router();

router.route("/upload-job-post").post(verifyJWT, uploadJobPost);

export default router