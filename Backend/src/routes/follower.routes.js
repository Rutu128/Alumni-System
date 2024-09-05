import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { followRequest, showRequest } from "../controller/follow.controller.js";

const router = Router();

router.route("/:senderId").put(verifyJWT, followRequest);
router.route("/").get(verifyJWT, showRequest);

export default router;
