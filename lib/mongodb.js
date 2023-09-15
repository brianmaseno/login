import mongoose from "mongoose";
export const connectMongoDB =async ()=>{
    try {
        await mongoose.connect(process.env.NEXT_APP_MONGODB_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Error connecting to Mongodb",error);
    }
}