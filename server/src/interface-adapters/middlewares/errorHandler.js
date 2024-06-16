const { errorCodes, errorTypes, statusMessages } = require("../../utils");
const { LogRepository } = require("../repositories/LogRepository");

const logRepository = new LogRepository();

const logErrorToDatabase = async ({
  name,
  message,
  statusCode,
  statusMessage,
  errorType,
  errorCode,
  stack,
  devInfo,
  timestamp,
}) => {
  const data = {
    name,
    message,
    statusCode,
    statusMessage,
    errorType,
    errorCode,
    stack,
    devInfo,
    timestamp,
  };
  const saveLog = await logRepository.saveLog(data);
  if (!saveLog) {
    console.error("Error while saving logs");
  }
};

exports.errorHandler = async (err, req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const errorCode = err.errorCode || "UNHANDLED_ERROR";
  const errorCodeInfo = errorCodes[errorCode] || {
    statusCode: 500,
    errorType: errorTypes.ServerError,
    message: {
      EN: "An unknown error occurred",
      DE: "Ein unbekannter Fehler ist aufgetreten",
    },
  };

  const statusCode = errorCodeInfo.statusCode;
  const errorType = errorCodeInfo.errorType;
  const statusMessage = statusMessages[statusCode] || "Server Error";
  const message = err.validationMessages || errorCodeInfo.message[language];

  const clientResponse = {
    message,
    statusCode,
    statusMessage,
    errorType,
    errorCode,
  };

  if (process.env.NODE_ENV === "development") {
    clientResponse.error = { stack: err.stack };
  }

  res.status(statusCode).json(clientResponse);

  if (process.env.NODE_ENV === "production") {
    await logErrorToDatabase({
      name: err.name,
      message,
      statusCode,
      statusMessage,
      errorType,
      errorCode,
      stack: err.stack || "No stack available",
      devInfo: err.devInfo || {},
      timestamp: new Date().toISOString(),
    });
  }
};
