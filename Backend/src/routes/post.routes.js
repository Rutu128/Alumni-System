import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadPost } from "../controller/post.controller.js";

const router = Router();

router.route("/uploadPost").post(verifyJWT,uploadPost)

export default router;

