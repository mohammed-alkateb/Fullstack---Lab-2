import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (err) {
        console.error("Error connecting to MongoDB: ", err);
    }
};

export default connectDB;