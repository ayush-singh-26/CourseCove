import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'

const app=express();

const __dirname = path.resolve();

app.use(cors({
    origin: 'https://coursecove-fgew.onrender.com',
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


app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});





app.use(errorHandler)
export {app}