import { Router } from "express";
import {
    changePassword,
    loginUser,
    logoutUser,
    registerUser,
    sendOtp,
    verifyOtp,
} from "../controller/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { ping } from "../controller/user.controller.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/ping").get(verifyJWT, ping);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);

export default router;
