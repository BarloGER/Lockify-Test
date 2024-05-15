const { errorTypes } = require("./errorTypes.js");

// [MODULE_ERROR_NUMBER]

exports.errorCodes = {
  DB_SERVICE_001: {
    statusCode: 503,
    errorType: errorTypes.ServiceUnavailableError,
    message: {
      EN: "No connection to the database possible.",
      DE: "Keine Verbindung zur Datenbank möglich.",
    },
  },
};
