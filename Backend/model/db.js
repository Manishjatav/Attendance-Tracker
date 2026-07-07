import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const URI = process.env.MONGODB_URI;
console.log("url for connection fo db is ",URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("failed connection to db : ",error);
    }
};

export default connectDB;