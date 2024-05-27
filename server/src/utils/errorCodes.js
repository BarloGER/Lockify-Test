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
  USER_CONFLICT_001: {
    statusCode: 409,
    errorTypes: errorTypes.ConflictError,
    message: {
      EN: "Username already exists.",
      DE: "Benutzername ist bereits vergeben.",
    },
  },
  USER_CONFLICT_002: {
    statusCode: 409,
    errorTypes: errorTypes.ConflictError,
    message: {
      EN: "Email already exists.",
      DE: "Email ist bereits vergeben.",
    },
  },
  USER_CONFLICT_003: {
    statusCode: 409,
    errorTypes: errorTypes.ConflictError,
    message: {
      EN: "Wrong Password.",
      DE: "Falsches Passwort.",
    },
  },
  USER_NOT_FOUND_001: {
    statusCode: 404,
    errorTypes: errorTypes.NotFoundError,
    message: {
      EN: "There is no user with this email address.",
      DE: "Es existiert kein Benutzer, mit dieser Email-Adresse.",
    },
  },
  USER_VALIDATION_001: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username is required.",
      DE: "Benutzername ist erforderlich.",
    },
  },
  USER_VALIDATION_002: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username must be a string.",
      DE: "Benutzername muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_003: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username can only contain alphanumeric characters.",
      DE: "Benutzername darf nur alphanumerische Zeichen enthalten.",
    },
  },
  USER_VALIDATION_004: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username must be between 3 and 20 characters long.",
      DE: "Benutzername muss zwischen 3 und 20 Zeichen lang sein.",
    },
  },
  USER_VALIDATION_005: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email is required.",
      DE: "Email ist erforderlich.",
    },
  },
  USER_VALIDATION_006: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email must be a string.",
      DE: "Email muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_007: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Invalid email address.",
      DE: "Ungültige Email-Adresse.",
    },
  },
  USER_VALIDATION_008: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Password is required.",
      DE: "Passwort ist erforderlich.",
    },
  },
  USER_VALIDATION_009: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Password must be a string.",
      DE: "Passwort muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_010: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Password must be at least 8 characters long.",
      DE: "Passwort muss mindestens 8 Zeichen lang sein.",
    },
  },
  SYS_SERVICE_001: {
    statusCode: 500,
    errorTypes: errorTypes.ServerError,
    message: {
      EN: "The session could not be generated.",
      DE: "Die Session konnte nicht generiert werden.",
    },
  },
};
