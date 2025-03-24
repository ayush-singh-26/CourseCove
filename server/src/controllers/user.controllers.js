import asyncHandler from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import JsonWebToken from "jsonwebtoken";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import MailSender from "../middlewares/sendMail.js";
import randomstring from 'randomstring'



const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();

        await user.save({ validateBeforeSave: false })

        return accessToken;

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;

    if ([fullname, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "Email or Username already exists");
    }

    const user = await User.create({
        fullname,
        email,
        password,
    });

    const createdUser = await User.findById(user._id)
        .select('-password -refreshToken');
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    await MailSender(
        createdUser.email,
        "Welcome to Learn And Grow",
        `Welcome to Learn And Grow, ${createdUser.fullname}! Your account has been created successfully. You can now log in to access your account.`
    )

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const { email, password } = req.body

    if (!email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials")
    }

    const accessToken = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken
                },
                "User logged In Successfully"
            )
        )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json(new ApiResponse(401, null, "Unauthorized access"));
        }

        const userId = req.user?._id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");

        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"));
        }

        return res.status(200).json(new ApiResponse(200, user, "Current user fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
});

const logoutUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        throw new ApiError(404, "User not found");
    }

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .json(new ApiResponse(200, {}, "User logged Out")
        )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");  // Use 400 instead of 404
    }
    
    if (oldPassword === newPassword) {
        throw new ApiError(400, "New password should not be the same as old password");
    }
    
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });  // Correct syntax
    
    return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.user?._id);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    await MailSender(
        user.email, 
        "Account deleted",
        `<p>Hi ${user.fullname}, your account has been deleted.</p>`
    );

    return res.status(200).json(
        new ApiResponse(200, {}, "User deleted successfully")
    );
});




export {
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    getCurrentUser,
    deleteUser,
}