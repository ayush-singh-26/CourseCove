import { Course } from "../models/course.models.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";


const createCourse = asyncHandler(async (req, res) => {
    const {
        courseTitle,
        category,
    } = req.body;

    if (!courseTitle || !category) {
        throw new ApiError(401, "All fields are required");
    }

    const course = await Course.create(
        {
            courseTitle,
            category,
            creator: req.user,
        }
    )

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            $push: {
                enrolledCourses: course.id,
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, course, "Course created successfully")
        )
})

const editCourses = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    const {
        courseTitle,
        courseDescription,
        category,
        courseLevel,
        price,
    } = req.body;

    const courseThumbnailLocalPath = req.file?.path;

    const courseThumbnail = await uploadOnCloudinary(courseThumbnailLocalPath)

    console.log(courseTitle,
        courseDescription,
        category,
        courseLevel,
        price,
        courseThumbnail.url,
    );

    const course = await Course.findByIdAndUpdate(
        courseId,
        {
            $set: {
                courseTitle: courseTitle,
                courseDescription,
                category: category,
                courseLevel: courseLevel,
                coursePrice: price,
                courseThumbnail: courseThumbnail.url,
            }
        },
        { new: true }
    )

    return res.status(200)
        .json(
            new ApiResponse(200, course, "Course updated successfully")
        )
})

const getAllCourses = asyncHandler(async (req, res) => {
    const user = req.user;
    const courses = await Course.find({ creator: user });

    return res
        .status(200)
        .json(
            new ApiResponse(200, courses, "Courses fetched successfully")
        )
})

const getCourseById = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    const course = await Course.findById(courseId);

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, course, "Course fetched successfully")
        )
})

const togglePublishcourse = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query;

        const course = await Course.findById(courseId);

        if (!course) {
            throw new ApiError(401, "Course not found");
        }

        course.isPublished = publish === "true";
        await course.save();

        return res.status(200).json(
            new ApiResponse(200, course, "Course publish status updated successfully")
        )
    } catch (error) {
        throw new ApiError(404, "Error during updating course status");
    }
})

const getPublishedCourse= asyncHandler(async (req, res) => {

    const course= await Course.find({isPublished :true}).populate({path:"creator",select:"fullname avatar"})

    return res.status(200).json(
        new ApiResponse(200, course, "Published courses fetched successfully")
    )
})



export {
    createCourse,
    getAllCourses,
    editCourses,
    getCourseById,
    togglePublishcourse,
    getPublishedCourse
}