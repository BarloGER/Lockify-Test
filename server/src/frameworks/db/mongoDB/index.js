const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/ErrorResponse");

const URI = process.env.MONGO_URI;

exports.connectToMongoDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    throw new ErrorResponse({
      errorCode: "DB_SERVICE_001",
    });
  }
};
