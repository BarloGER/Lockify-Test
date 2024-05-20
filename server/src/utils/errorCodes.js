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
      EN: "Email must be a valid email address.",
      DE: "Email muss eine gültige E-Mail-Adresse sein.",
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
  USER_VALIDATION_011: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isVerified' is required.",
      DE: "'isVerified' ist erforderlich.",
    },
  },
  USER_VALIDATION_012: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isVerified' must be a boolean.",
      DE: "'isVerified' muss ein Boolean sein.",
    },
  },
  USER_VALIDATION_013: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isBlocked' is required.",
      DE: "'isBlocked' ist erforderlich.",
    },
  },
  USER_VALIDATION_014: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isBlocked' must be a boolean.",
      DE: "'isBlocked' muss ein Boolean sein.",
    },
  },
  USER_VALIDATION_015: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isNewsletterAllowed' is required.",
      DE: "'isNewsletterAllowed' ist erforderlich.",
    },
  },
  USER_VALIDATION_016: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "'isNewsletterAllowed' must be a boolean.",
      DE: "'isNewsletterAllowed' muss ein Boolean sein.",
    },
  },
  USER_VALIDATION_017: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification code is required.",
      DE: "Verifizierungscode ist erforderlich.",
    },
  },
  USER_VALIDATION_018: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification code must be a string.",
      DE: "Verifizierungscode muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_019: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification code can only contain alphanumeric characters.",
      DE: "Verifizierungscode darf nur alphanumerische Zeichen enthalten.",
    },
  },
  USER_VALIDATION_020: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification code must be 8 characters long.",
      DE: "Verifizierungscode muss 8 Zeichen lang sein.",
    },
  },
  USER_VALIDATION_021: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification attempts is required.",
      DE: "Verifizierungsversuche sind erforderlich.",
    },
  },
  USER_VALIDATION_022: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Verification attempts must be a number.",
      DE: "Verifizierungsversuche müssen eine Zahl sein.",
    },
  },
};
