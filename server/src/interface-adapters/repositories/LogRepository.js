const { Schema, model } = require("mongoose");

const logSchema = new Schema({
  message: { type: String, required: false },
  statusCode: { type: Number, required: false },
  statusMessage: { type: String, required: false },
  errorType: { type: String, required: false },
  errorCode: { type: String, required: false },
  stack: { type: String, required: false },
  devInfo: { type: Object, required: false },
  timestamp: { type: Date, required: false },
});

const LogModel = model("Log", logSchema);

class LogRepository {
  async saveLog(data) {
    const newLog = new LogModel(data);
    await newLog.save();
  }
}

module.exports = LogRepository;
