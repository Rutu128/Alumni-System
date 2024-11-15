import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    addInfo,
    findUser,
    getUserDetails,
    me,
    updateAlumniProfile,
    updateAvatar,
    updateFacultyProfile,
    updateProfile,
    updateStudentProfile,
} from "../controller/user.controller.js";
import {
    getUserPosts,
    myLikes,
    myPosts,
} from "../controller/post.controller.js";
import { isAlumni, isFaculty, isStudent } from "../utils/Authenticate.js";
import {
    alumniInfo,
    facultyInfo,
    studentInfo,
    verrifyStudent,
} from "../controller/auth.controller.js";

const router = Router();

router.route("/myPosts").get(verifyJWT, myPosts);
router.route("/myLikes").get(verifyJWT, myLikes);
router.route("/posts/:id").get(verifyJWT, getUserPosts);
router.route("/me").get(verifyJWT, me);
router.route("/find/:search").get(verifyJWT, findUser);

router.route("/addInfo").post(verifyJWT, addInfo);
router.route("/getUser/:id").get(verifyJWT, getUserDetails);
router.route("/update-profile").post(verifyJWT, updateProfile);
router.route("/update-avatar").post(verifyJWT, updateAvatar);

// Student
router.route("/student/addInfo").post(verifyJWT, isStudent, studentInfo);
router.route("/student/verify").post(verifyJWT, isStudent, verrifyStudent);
router.route("/student/verify").post(verifyJWT, isStudent, updateStudentProfile);


//Alumni
router.route("/alumni/addInfo").post(verifyJWT, isAlumni, alumniInfo);
router.route("/alumni/addInfo").post(verifyJWT, isAlumni, updateAlumniProfile);


//Faculty

router.route("/faculty/addInfo").post(verifyJWT, isFaculty, facultyInfo);
router.route("/faculty/addInfo").post(verifyJWT, isFaculty, updateFacultyProfile);



export default router;
