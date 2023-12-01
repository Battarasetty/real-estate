import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js'

dotenv.config();

const app = express();
app.use(express.json());

app.listen('5555', () => {
    console.log(`server is running at port 5555!!`);
})

app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongodb");
    }).catch((error) => {
        console.log(error);
    })

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({
        success: false,
        statusCode,
        message, 
    })
})