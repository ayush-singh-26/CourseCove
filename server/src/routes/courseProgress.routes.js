import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getCourseProgress, markAsCompleted, updateLectureProgress } from "../controllers/courseProgress.controller.js";

const router= Router();

router.route('/:courseId').get(verifyJWT,getCourseProgress)
router.route('/:courseId/lecture/:lectureId').post(verifyJWT,updateLectureProgress)
router.route('/:courseId').put(verifyJWT,markAsCompleted)


export default router;