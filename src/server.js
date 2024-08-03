// server.js
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from './routes/auth.js';
import itemRoutes from './routes/items.js';

import connectDB from "./db/index.js";

dotenv.config({
    path: './.env'
})

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());



connectDB()
.then(() => {

    app.use('/api/auth', authRoutes);
    app.use('/api/items', itemRoutes);

    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
