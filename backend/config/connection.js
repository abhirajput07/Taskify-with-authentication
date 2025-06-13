import { configDotenv } from "dotenv";
import mongoose from "mongoose";
configDotenv();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DBURL);
    console.log(`MongoDB connected Successfully`);
  } catch (error) {
    console.log(`MongoDB connected ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
