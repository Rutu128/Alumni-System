import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deleteJobPost, getJob, showJobs, updateJob, uploadJobPost } from "../controller/jobPost.controller.js";

const router = Router();

router.route("/upload-job-post").post(verifyJWT, uploadJobPost);
router.route("/show-jobs").get(verifyJWT, showJobs);
router.route("/delete-job-post/:id").delete(verifyJWT, deleteJobPost);
router.route("/find-job-post/:id").get(verifyJWT, getJob);
router.route("/update-job-post/:id").put(verifyJWT, updateJob);

export default router