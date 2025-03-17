import mongoose from 'mongoose';
import dotenv from 'dotenv'
import DB_NAME from '../constants.js'
dotenv.config();

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MONGODB connected !! DB host : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB