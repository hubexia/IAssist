import mongoose from "mongoose";
import { ENV } from "./env";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error("Mongodb connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
