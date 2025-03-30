import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


import userRoute from './routes/user.routes.js';
import courseRoute from './routes/course.routes.js';
import lectureRoute from './routes/lecture.routes.js'
import errorHandler from './utils/ErrorHandler.js';

app.use('/api/v1/users', userRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/lectures',lectureRoute)




app.use(errorHandler)
export {app}