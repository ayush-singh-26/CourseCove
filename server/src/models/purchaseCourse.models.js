import mongoose, { Schema } from "mongoose";

const CoursePurchaseSchema= new Schema({

    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "completed", "failed"],
        default: 'pending'
    },
    paymentId:{
        type: String,
        required: true
    }
},{timestamps:true})

export const CoursePurchase= mongoose.model("CoursePurchase",CoursePurchaseSchema);