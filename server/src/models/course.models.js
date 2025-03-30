import mongoose, { Schema, SchemaType } from "mongoose";


const courseSchema = new Schema(
    {
        courseTitle: {
            type: String,
            required: true,
        },
        courseDescription: {
            type: String,
        },
        category:{
            type:String,
            required:true
        },
        courseLevel:{
            type:String,
            enum: ['Beginner','Intermediate','Advanced'],
        },
        coursePrice: {
            type: Number,
        },
        courseThumbnail:{
            type:String,
        },
        enrolledStudents:[{
            type: Schema.Types.ObjectId,
            ref:'User'
        }],
        lectures:[
            {
                type: Schema.Types.ObjectId,
                ref:'Lecture'
            }
        ],
        creator:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        isPublished:{
            type: Boolean,
            default:false
        }
    },
    {
        timestamps: true
    }
);

export const Course= mongoose.model("Course",courseSchema);