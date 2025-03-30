import Stripe from 'stripe';
import { Course } from '../models/course.models.js'
import ApiError from '../utils/ApiError.js';
import { CoursePurchase } from '../models/purchaseCourse.models.js';
import ApiResponse from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createCheckoutSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            throw new Error('Course not found');
        }

        const newPurchase = new CoursePurchase({
            courseId,
            userId,
            amount: course.coursePrice,
            status: "pending"
        })

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: course.courseTitle,
                            images: [course.courseThumbnail],
                        },
                        unit_amount: course.coursePrice * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `http://localhost:5173/course-progress/${courseId}`, // once payment successful redirect to course progress page
            cancel_url: `http://localhost:5173/course-detail/${courseId}`,
            metadata: {
                courseId: courseId,
                userId: userId.toString(),
                purchaseId: newPurchase._id.toString(),
            },
            shipping_address_collection: {
                allowed_countries: ["IN"], // Optionally restrict allowed countries
            },
        });

        if (!session.url) {
            throw new ApiError(403, "Error while creating session")
        }

        // Save the purchase record
        newPurchase.paymentId = session.id;

        await newPurchase.save();

        return res.status(200).json(new ApiResponse(
            200,
            { url: session.url },
            "Payment session created successfully"
        ));

    }
    catch (error) {
        console.error("Error in createCheckoutSession:", error);
        return res.status(500).json({ message: "CoursePurchase failed", error: error.message });
    }


}

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.WEBHOOK_SECRET_KEY);
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log("🔔 Webhook received:", event.type);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        try {
            const { purchaseId } = session.metadata;
            if (!purchaseId) throw new ApiError("Metadata missing in session");

            const purchaseData = await CoursePurchase.findById(purchaseId);
            if (!purchaseData) throw new ApiError("Purchase record not found");

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId.toString());

            if (courseData && userData) {
                courseData.enrolledStudents.push(userData);
                await courseData.save();

                userData.enrolledCourses.push(courseData._id);
                await userData.save();

                purchaseData.status = "completed";
                await purchaseData.save();

                console.log("✅ Purchase marked as completed:", purchaseId);
            }
        } catch (error) {
            console.error("❌ Error processing webhook:", error.message);
        }
    } else {
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
};


const getCourseDetailWithPurchaseStatus = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user._id;

        const course = await Course.findById(courseId)
            .populate({ path: "creator" })
            .populate({ path: "lectures" });

        const purchased = await CoursePurchase.findOne({ userId, courseId });

        if (!course) {
            return res.status(404).json({ message: "course not found!" });
        }

        return res.status(200).json({
            course,
            purchased: !!purchased,
        });
    } catch (error) {
        console.log(error);
    }
};

const getAllPurchasedCourse = async (_, res) => {
    try {
        const purchasedCourse = await CoursePurchase.find({
            status: "completed",
        }).populate("courseId");
        if (!purchasedCourse) {
            return res.status(404).json({
                purchasedCourse: [],
            });
        }
        return res.status(200).json({
            purchasedCourse,
        });
    } catch (error) {
        console.log(error);
    }
};


export {
    createCheckoutSession,
    stripeWebhook,
    getCourseDetailWithPurchaseStatus,
    getAllPurchasedCourse
}