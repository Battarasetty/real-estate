import express from 'express';

const app = express();

app.listen('5555', () => {
    console.log(`server is running at port 5555!!`);
})