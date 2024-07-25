import { Router } from "express";
import { changePassword, googleLogin, loginUser, logoutUser, ping, registerUser, updateProfile, verify } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";



const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify/:token").put(verify);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/change-password").post(verifyJWT,changePassword);
router.route("/google-login").post(googleLogin);
router.route("/ping").get(verifyJWT,ping)
router.route("/updateprofile").post(verifyJWT,updateProfile)

export default router;