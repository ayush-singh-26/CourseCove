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
        // const refreshToken = user.generateRefreshToken();

        // user.refreshToken = refreshToken
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
        "Welcome to STAY - IO",
        `Welcome to STAY - IO, ${createdUser.fullname}! Your account has been created successfully. You can now log in to access your account.`
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

const forgot_Password = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;

        const userData = await User.findOne({ email });

        if (!userData) {
            throw new ApiError(404, "User not found");
        }

        const randomString = randomstring.generate();
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                $set: {
                    accessToken: randomString
                },
            },
            { new: true }
        );

        await MailSender(
            userData.email,
            "For Reset Password",
            `<p>Hi ${userData.fullname}, reset your password using the link below:</p>
                <a href="http://localhost:5173/reset-password?token=${randomString}">Reset Password</a><br>Thanks!`
        );

        res.status(200).json(
            new ApiResponse(200, userData, "Please check your mail")
        );


    } catch (error) {
        throw new ApiError(400, "Unable to process forgot password request");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();

    return res.status(200).json(
        new ApiResponse(200, users, 'Users fetched successfully')
    );
});

const reset_Password = asyncHandler(async (req, res, next) => {
    try {

        const { token, password } = req.body

        const tokenData = await User.findOne({ token: token });

        if (!tokenData) {
            throw new ApiError(404, "This is not a valid link")
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const user = await User.findByIdAndUpdate(
            tokenData._id,
            {
                $set: {
                    password: passwordHash,
                    token: null
                }
            },
            { new: true }
        )

        await MailSender(
            tokenData.email,
            "Password Reset Successful",
            `Your password has been successfully reset. You can now log in to your account.`
        )

        res.status(200)
            .json(
                new ApiResponse(200, user, "Password reset successfully")
            )

    } catch (error) {
        throw new ApiError(400, "Unable to reset password")
    }

})

const sendVerificationCode = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const OTP = Math.floor(Math.random() * 1000000).toString();

    await MailSender(
        user.email,
        "Verification Code",
        `Your verification code is ${OTP}`
    )

})

const sendEmail = asyncHandler(async (req, res, next) => {
    const { email, subject, text } = req.body;

    console.log(email, subject, text);

    try {

        const info = await MailSender(
            email,
            subject,
            text,
        )

        return res.status(200).json(
            new ApiResponse(200, { info }, "Email sent successfully")
        );

    } catch (error) {
        next(error);
    }
});

const google = asyncHandler(async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {


            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
            const expiryDate = new Date(Date.now() + 3600000);
            res.status(200)
                .cookie("accessToken", accessToken, { expires: expiryDate, httpOnly: true, secure: true })
                .cookie("refreshToken", refreshToken, { expires: expiryDate, httpOnly: true, secure: true })
                .json(new ApiResponse(200, user, { message: "User logged in successfully" }, "User logged in successfully"))
        }
        else {
            const genratedPassword = Math.random().toString(36).slice(-8)
                + Math.random().toString(36).slice(-8)
            const hashedPassword = await bcrypt.hash(genratedPassword, 10);
            const newUser = await User({
                username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                fullname: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                avatar: req.body.picture,
            })
            await newUser.save();
            const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id)
            const expiryDate = new Date(Date.now() + 3600000);
            res.status(200)
                .cookie("accessToken", accessToken, { expires: expiryDate, httpOnly: true, secure: true })
                .cookie("refreshToken", refreshToken, { expires: expiryDate, httpOnly: true, secure: true })
                .json(new ApiResponse(200, newUser, { message: "User logged in successfully" }, "User logged in successfully"))

        }
    }
    catch (error) {
        next(error)
    }
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = JsonWebToken.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        // Handle token verification errors gracefully
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullname, phone, gender } = req.body;

    const updateUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullname,
                phone,
                gender,
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, updateUser, "Account Deatils updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    const oldAvatar = await User.findById(req.user?._id)

    const extractPublicIdFromUrl = (imageUrl) => {
        const parts = imageUrl.split('/');
        const publicIdWithExtension = parts[parts.length - 1]; // Get the last part of the URL (e.g., sample.jpg)
        const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension (e.g., .jpg)
        return publicId;
    };

    if (oldAvatar.avatar) {
        const publicId = extractPublicIdFromUrl(oldAvatar?.avatar);
        
        await cloudinary.uploader.destroy(publicId);
    }



    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar image updated successfully"))
})

const updateUserCoverimage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on coverimage")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Cover image updated successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    deleteUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverimage,
    google,
    sendEmail,
    sendVerificationCode,
    forgot_Password,
    reset_Password,
    getAllUsers
}