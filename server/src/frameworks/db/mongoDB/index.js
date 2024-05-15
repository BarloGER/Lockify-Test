const mongoose = require("mongoose");

const URI = process.env.MONGO_URI;

exports.connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    throw new Error("MongoDB connection error", error);
  }
};
