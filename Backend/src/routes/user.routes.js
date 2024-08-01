import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addInfo } from "../controller/user.controller.js";
import { myPosts } from "../controller/post.controller.js";

const router = Router();

router.route("/myPosts").get(verifyJWT,myPosts)

router.route("/addInfo").post(verifyJWT, addInfo);


export default router;
