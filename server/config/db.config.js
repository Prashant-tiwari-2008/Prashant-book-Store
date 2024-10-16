import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect(process.env.MONGOURL).then(() => {
    console.log('Mongodb connected successfully')
}).catch((err) => {
    console.log("error in mongodb connection", err)
})