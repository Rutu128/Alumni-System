import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { likePost, uploadPost } from "../controller/post.controller.js";

const router = Router();

router.route("/uploadPost").post(verifyJWT,uploadPost);
router.route("/like/:id").post(verifyJWT,likePost);

export default router;

