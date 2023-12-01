import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";


dotenv.config();

const app = express();

app.listen('5555', () => {
    console.log(`server is running at port 5555!!`);
})


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to mongodb");
    }).catch((error) => {
        console.log(error);
    })