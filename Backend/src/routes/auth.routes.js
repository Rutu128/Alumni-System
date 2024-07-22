import { Router } from "express";
import { changePassword, loginUser, logoutUser, registerUser, verify } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify/:token").put(verify);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changePassword);

export default router;