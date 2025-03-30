import { Router } from "express";
import {createLecture, editLecture, getCourseLectures, getLectureById,removeLecture } from "../controllers/lecture.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router= Router();

router.route('/createLecture/:id').post(verifyJWT,createLecture);
router.route('/getCourseLectures/:id').get(verifyJWT,getCourseLectures);
router.route('/editLecture/:courseId/:lectureId').put(verifyJWT,editLecture)
router.route('/deleteLecture/:lectureId').delete(verifyJWT,removeLecture)
router.route('/getLectureById/:lectureId').get(verifyJWT,getLectureById);


export default router;