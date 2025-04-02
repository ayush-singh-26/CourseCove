import { Router } from "express";
import { createCourse, editCourses, getAllCourses, getCourseById, getPublishedCourse, searchCourse, togglePublishcourse } from "../controllers/course.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router= Router();


router.route('/createCourse').post(verifyJWT,createCourse);
router.route('/getAllCourses').get(verifyJWT,getAllCourses);
router.route('/getPublishedCourse').get(verifyJWT,getPublishedCourse);
router.route('/editCourses/:id').put(verifyJWT,upload.single('courseThumbnail'),editCourses);
router.route('/getCourseById/:id').get(verifyJWT,getCourseById);
router.route('/:courseId').put(verifyJWT,togglePublishcourse);
router.route('/search').get(verifyJWT,searchCourse);

export default router;