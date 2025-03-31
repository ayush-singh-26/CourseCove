import { Course } from '../models/course.models.js';
import { CourseProgress } from '../models/courseProgress.models.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js'

const getCourseProgress = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;

    let courseProgress = await CourseProgress.findOne({ courseId, userId }).populate("courseId");

    const courseDetails = await Course.findById(courseId).populate("lectures")

    console.log(courseDetails);

    if (!courseDetails) {
        throw new ApiError(404, "Course not found")
    }

    if (!courseProgress) {
        return res.status(200).json(
            new ApiResponse(200,
                {
                    courseDetails,
                    progress: [],
                    completed: false
                })
        )
    }
    return res.status(200).json(
        new ApiResponse(200,
            {
                courseDetails,
                progress: courseProgress.progress,
                completed: courseProgress.completed
            })
    )
})

const updateLectureProgress = asyncHandler(async (req, res) => {
    const { courseId, lectureId } = req.params;
    const userId = req.user.id;


    let courseProgress = await CourseProgress.findOne({ courseId, userId })

    if (!courseProgress) {
        courseProgress = await new CourseProgress({
            courseId,
            userId,
            completed: false,
            lectureProgress: []
        });
    }

    
    const lectureIndex = courseProgress.lectureProgress.findIndex((lecture) => lecture.lectureId === lectureId)
    
    if (lectureIndex != -1) {
        courseProgress.lectureProgress[lectureIndex].viewed = true;
    }
    else {
        courseProgress.lectureProgress.push({
            lectureId,
            viewed: true
        });
    }
    
    
    const lectureProgressLength = courseProgress.lectureProgress.filter((lectureProg) => lectureProg.viewed).length
    
    const course = await Course.findById(courseId);
    console.log(course);

    if (course.lectures.length === lectureProgressLength) {
        courseProgress.completed = true;
    }

    await courseProgress.save();

    return res.status(200).json(
        new ApiResponse(200, "Lecture progress updated successfully")
    )
});

const markAsCompleted = asyncHandler(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;

    const courseProgress = await CourseProgress.findOne({ courseId, userId })

    if (!courseProgress) {
        throw new ApiError(404, "Course progress not found")
    }

    console.log(courseProgress);

    courseProgress.lectureProgress.map((lectureProgress) => lectureProgress.viewed = !lectureProgress.viewed)

    courseProgress.completed = !courseProgress.completed;

    await courseProgress.save();

    return res.status(200).json(
        new ApiResponse(200, courseProgress, "Course progress marked as completed successfully")
    )
})

export {
    getCourseProgress,
    updateLectureProgress,
    markAsCompleted,
}

