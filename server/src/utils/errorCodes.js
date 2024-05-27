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
  DB_SERVICE_002: {
    statusCode: 502,
    errorType: errorTypes.ExternalAPIError,
    message: {
      EN: "An error occurred while saving the data, try again later or contact support.",
      DE: "Beim Speichern der Daten ist ein Fehler augetreten, versuche es später erneut, oder wende dich an den Support.",
    },
  },
  USER_AUTHENTICATION_001: {
    statusCode: 403,
    errorType: errorTypes.AuthenticationError,
    message: {
      EN: "You are not authorized to update this user.",
      DE: "Du bist nicht berechtigt, diesen Benutzer zu aktualisieren.",
    },
  },
  USER_AUTHENTICATION_002: {
    statusCode: 401,
    errorType: errorTypes.AuthenticationError,
    message: {
      EN: "No valid session was found. Please make sure that you are logged in and that your session is still valid.",
      DE: "Es wurde keine gültige Session gefunden. Bitte stelle sicher, dass du angemeldet bist und deine Sitzung noch gültig ist.",
    },
  },
  USER_AUTHENTICATION_003: {
    statusCode: 401,
    errorType: errorTypes.AuthenticationError,
    message: {
      EN: "No user ID was found in the session. You must log in to access this resource.",
      DE: "In der Session wurde keine Benutzer-ID gefunden. Du musst dich anmelden, um auf diese Ressource zugreifen zu können.",
    },
  },
  USER_AUTHENTICATION_004: {
    statusCode: 401,
    errorType: errorTypes.AuthenticationError,
    message: {
      EN: "Your session has expired. Please log in again to continue to have access.",
      DE: "Deine Session ist abgelaufen. Bitte melde dich erneut an, um weiterhin Zugriff zu haben.",
    },
  },
  USER_CONFLICT_001: {
    statusCode: 409,
    errorType: errorTypes.ConflictError,
    message: {
      EN: "Username already exists.",
      DE: "Benutzername ist bereits vergeben.",
    },
  },
  USER_CONFLICT_002: {
    statusCode: 409,
    errorType: errorTypes.ConflictError,
    message: {
      EN: "Email already exists.",
      DE: "Email ist bereits vergeben.",
    },
  },
  USER_CONFLICT_003: {
    statusCode: 409,
    errorType: errorTypes.ConflictError,
    message: {
      EN: "Wrong Password.",
      DE: "Falsches Passwort.",
    },
  },
  USER_NOT_FOUND_001: {
    statusCode: 404,
    errorType: errorTypes.NotFoundError,
    message: {
      EN: "There is no user with this email address.",
      DE: "Es existiert kein Benutzer, mit dieser Email-Adresse.",
    },
  },
  USER_NOT_FOUND_002: {
    statusCode: 404,
    errorType: errorTypes.NotFoundError,
    message: {
      EN: "There is no user with this id.",
      DE: "Es existiert kein Benutzer, mit dieser ID.",
    },
  },
  USER_VALIDATION_001: {
    statusCode: 411,
    errorType: errorTypes.LengthRequiredError,
    message: {
      EN: "No data was transmitted.",
      DE: "Es wurden keine Daten übermittelt.",
    },
  },
  USER_VALIDATION_002: {
    statusCode: 409,
    errorTypes: errorTypes.DataIntegrityError,
    message: {
      EN: "Fields have been specified that are not allowed!",
      DE: "Es wurden Felder angegeben, die nicht erlaubt sind!",
    },
  },
  USER_VALIDATION_003: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username is required.",
      DE: "Benutzername ist erforderlich.",
    },
  },
  USER_VALIDATION_004: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username must be a string.",
      DE: "Benutzername muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_005: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username can only contain alphanumeric characters.",
      DE: "Benutzername darf nur alphanumerische Zeichen enthalten.",
    },
  },
  USER_VALIDATION_006: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Username must be between 3 and 20 characters long.",
      DE: "Benutzername muss zwischen 3 und 20 Zeichen lang sein.",
    },
  },
  USER_VALIDATION_007: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email is required.",
      DE: "Email ist erforderlich.",
    },
  },
  USER_VALIDATION_008: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email must be a string.",
      DE: "Email muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_009: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Invalid email address.",
      DE: "Ungültige Email-Adresse.",
    },
  },
  USER_VALIDATION_010: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Password is required.",
      DE: "Passwort ist erforderlich.",
    },
  },
  USER_VALIDATION_011: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Password must be a string.",
      DE: "Passwort muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_012: {
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
