import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { sendNotificationForPost, sendNotificationForPostLike , sendNotificationForPostComment, sendNotificationForJobPost} from "../controller/notification.controller.js";

const router = Router();

router.route("/notification").post(verifyJWT, sendNotificationForPost , sendNotificationForPostLike 
    , sendNotificationForPostComment , sendNotificationForJobPost
);