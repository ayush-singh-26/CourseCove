import express from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';

const router = express.Router();

router.post("/upload-video", upload.single("file"), async (req, res) => {
    try {
        const result = await uploadOnCloudinary(req.file.path);
        res.status(200).json(new ApiResponse(200, result, "File uploaded successfully"));
    } catch (error) {
        res.status(400).json(new ApiError(400, "Error during file uploading"));
    }
});

export default router;
