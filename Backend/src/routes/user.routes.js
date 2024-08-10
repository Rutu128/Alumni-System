import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInfo, getUserDetails, me, updateProfile } from "../controller/user.controller.js";
import {
    getUserPosts,
    myLikes,
    myPosts,
} from "../controller/post.controller.js";

const router = Router();

router.route("/myPosts").get(verifyJWT, myPosts);
router.route("/myLikes").get(verifyJWT, myLikes);
router.route("/posts/:id").get(verifyJWT, getUserPosts);
router.route("/me").get(verifyJWT, me);

router.route("/addInfo").post(verifyJWT, addInfo);
router.route("/getUser/:id").get(verifyJWT, getUserDetails);
router.route("/update-profile").post(verifyJWT, updateProfile);
export default router;
