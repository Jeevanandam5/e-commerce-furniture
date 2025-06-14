import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect('mongodb+srv://jeeva:jeeva123@ecom.l66v7oh.mongodb.net/');
        console.log("MongoDB Connected successfully");
    } catch(err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
}

export default connectDB;
