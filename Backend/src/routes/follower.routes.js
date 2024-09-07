import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    acceptRequest,
    followRequest,
    rejectRequest,
    showRequest,
} from "../controller/follow.controller.js";

const router = Router();

router.route("/:senderId").put(verifyJWT, followRequest);
router.route("/").get(verifyJWT, showRequest);
router.route("/accept/:requestId").put(verifyJWT, acceptRequest);
router.route("/reject/:requestId").put(verifyJWT, rejectRequest);

export default router;
