import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "expense_tracker",
    });
    console.log("database connected");
  } catch (error) {
    console.log("error", error);
  }
};
