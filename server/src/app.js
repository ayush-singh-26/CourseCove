import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app=express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

import { stripeWebhook } from './controllers/coursePurchase.controllers.js';
app.post('/stripe',express.raw({type:"application/json"}),stripeWebhook);

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(cookieParser())


import userRoute from './routes/user.routes.js';
import courseRoute from './routes/course.routes.js';
import lectureRoute from './routes/lecture.routes.js'
import errorHandler from './utils/ErrorHandler.js';
import mediaRoute from './routes/media.routes.js';
import purchaseRoute from './routes/coursePurchase.routes.js'
import progressRoute from './routes/courseProgress.routes.js'

app.use('/api/v1/users', userRoute);
app.use('/api/v1/courses', courseRoute);
app.use('/api/v1/lectures',lectureRoute);
app.use('/api/v1/media', mediaRoute);
app.use('/api/v1/purchases',purchaseRoute)
app.use('/api/v1/progress',progressRoute)





app.use(errorHandler)
export {app}