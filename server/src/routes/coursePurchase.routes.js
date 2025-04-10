import express from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { createCheckoutSession,stripeWebhook,getCourseDetailWithPurchaseStatus,getAllPurchasedCourse } from '../controllers/coursePurchase.controllers.js';

const router= express.Router();

router.route('/checkout/create-checkout-session').post(verifyJWT,createCheckoutSession);
router.route('/course/:courseId/detail-with-status').get(verifyJWT,getCourseDetailWithPurchaseStatus);
router.route('/getAllPurchasedCourse').get(verifyJWT,getAllPurchasedCourse);

export default router;