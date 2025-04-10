import { Router } from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    changeCurrentPassword,
    logoutUser,
    deleteUser,
    getAllUsers,
} from '../controllers/user.controllers.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router= Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/current-user').get(verifyJWT,getCurrentUser);
router.route('/change-password').put(verifyJWT,changeCurrentPassword);
router.route('/logout').post(verifyJWT,logoutUser);
router.route('/delete-user').delete(verifyJWT,deleteUser);
router.route('/getAllUsers').get(verifyJWT,getAllUsers);



export default router;