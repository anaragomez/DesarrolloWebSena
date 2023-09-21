import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

//Conexion al MongoDB por medio del env
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};
