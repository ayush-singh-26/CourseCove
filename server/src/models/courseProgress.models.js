import mongoose, { Schema } from "mongoose";

const lectureProgressSchema = Schema({
    lectureId: { type: "string" },
    viewed: { type: Boolean }
});

const courseProgressSchema = Schema({
    userId: { type: "string" },
    courseId: { type: "string" },
    completed: { type: Boolean },
    lectureProgress: [lectureProgressSchema]
})

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);