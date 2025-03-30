import asyncHandler from "../utils/asyncHandler.js";
import {Lecture} from '../models/lecture.models.js'
import { Course } from "../models/course.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";




const createLecture = asyncHandler(async (req, res) => {
    const { lectureTitle } = req.body;

    const courseId = req.params.id;

    if (!lectureTitle || !courseId) {
        throw new ApiError(401, "All fields are required");
    }

    const lecture = await Lecture.create({ lectureTitle });

    await Course.findByIdAndUpdate(
        courseId,
        {
            $push: {
                lectures: lecture._id,
            }
        },
        { new: true }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(200, lecture, "Lecture created successfully")
        )
})

const getCourseLectures = asyncHandler(async (req, res) => {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate('lectures');

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    return res.status(200)
        .json(
            new ApiResponse(200, { lectures: course.lectures }, "Lectures fetched successfully")
        )
})

const editLecture = asyncHandler(async (req, res) => {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(401, "Lecture not found");
    }

    if (lectureTitle) lecture.lectureTitle = lectureTitle;
    if (videoInfo.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
    if (videoInfo.publicId) lecture.publicId = videoInfo.publicId;
    lecture.isPreviewFree = isPreviewFree;

    await lecture.save();

    const course = await Course.findById(courseId);

    if (course && !course.lectures.includes(lecture._id)) {
        course.lectures.push(lecture._id);
        await course.save();
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, lecture, "Lecture updated successfully")
        )

})

const removeLecture = asyncHandler(async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);

        if (!lecture) {
            throw new ApiError(401, "Lecture not found");
        }

        return res.status(200).json(
            new ApiResponse(200, {}, "Lecture deleted successfully")
        )
        //delete lecture from cloudinary
    } catch (error) {
        throw new ApiError(404, "Error during deleting lecture")
    }
})

const getLectureById = asyncHandler(async (req, res) => {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
        throw new ApiError(404, "Lecture not found");
    }

    return res.status(200).json(
        new ApiResponse(200, lecture, "Lecture fetched successfully")
    )
})

export {
    createLecture,
    getCourseLectures,
    editLecture,
    removeLecture,
    getLectureById,
}