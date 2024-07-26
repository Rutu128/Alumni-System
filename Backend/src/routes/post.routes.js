import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { deletePost, likePost, uploadPost } from "../controller/post.controller.js";

const router = Router();

router.route("/uploadPost").post(verifyJWT, uploadPost);
router.route("/like/:id").put(verifyJWT, likePost);
router.route("/delete/:id").delete(verifyJWT, deletePost);

export default router;
