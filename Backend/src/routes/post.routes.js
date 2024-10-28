import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    addComment,
    deleteComment,
    deletePost,
    getComments,
    getPost,
    likeComment,
    likePost,
    myPosts,
    showPosts,
    uploadPost,
} from "../controller/post.controller.js";
import { isPermited } from "../utils/Authenticate.js";

const router = Router();

router.route("/uploadPost").post(verifyJWT, isPermited, uploadPost);
router.route("/like/:id").put(verifyJWT, likePost);
router.route("/delete/:id").delete(verifyJWT, deletePost);
router.route("/getPost/:page").get(verifyJWT, showPosts);
router.route("/findPost/:id").get(verifyJWT, getPost);

router.route("/addComment/:id").post(verifyJWT, addComment);
router.route("/likeComment/:id").put(verifyJWT, likeComment);
router.route("/deleteComment/:id").delete(verifyJWT, deleteComment);
router.route("/getComments/:id").get(verifyJWT, getComments);

export default router;


