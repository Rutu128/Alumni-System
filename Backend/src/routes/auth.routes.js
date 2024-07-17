import { Router } from "express";
import { loginUser, registerUser, verify } from "../controller/user.controller.js";



const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify/:token").put(verify);

export default router;