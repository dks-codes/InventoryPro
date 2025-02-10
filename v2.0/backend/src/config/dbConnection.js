import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { dbName: "InventoryPro" });
        console.log("MongoDB Connected!");
    }
    catch (err) {
        console.log("MongoDB Connection Failed !!", err.message);
        process.exit(1);
    }
};

export default connectDB;