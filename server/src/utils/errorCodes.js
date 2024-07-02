const { errorTypes } = require("./errorTypes.js");

// [MODULE_ERROR_NUMBER]

exports.errorCodes = {
  ACCOUNT_VALIDATION_001: {
    statusCode: 411,
    errorType: errorTypes.LengthRequiredError,
    message: {
      EN: "No data was transmitted.",
      DE: "Es wurden keine Daten übermittelt.",
    },
  },
  ACCOUNT_VALIDATION_002: {
    statusCode: 409,
    errorTypes: errorTypes.DataIntegrityError,
    message: {
      EN: "Fields have been specified that are not allowed!",
      DE: "Es wurden Felder angegeben, die nicht erlaubt sind!",
    },
  },
  ACCOUNT_VALIDATION_003: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The account name is required.",
      DE: "Der Benutzerkonto Name ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_004: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The account name must be a string.",
      DE: "Der Benutzerkonto Name muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_005: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The account name contains invalid characters.",
      DE: "Der Benutzerkonto Name enthält ungültige Zeichen.",
    },
  },
  ACCOUNT_VALIDATION_006: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The account name must be between 3 and 20 characters long.",
      DE: "Der Benutzerkonto Name muss zwischen 3 und 20 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_007: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The website address is required.",
      DE: "Die Website Adresse ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_008: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The website address must be a string.",
      DE: "Die Website Adresse muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_009: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The website address contains invalid characters.",
      DE: "Die Website Adresse enthält ungültige Zeichen.",
    },
  },
  ACCOUNT_VALIDATION_010: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The username is required.",
      DE: "Der Benutzername ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_011: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The username must be a string.",
      DE: "Der Benutzername muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_012: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The username may only contain alphanumeric characters.",
      DE: "Der Benutzername darf nur alphanumerische Zeichen enthalten.",
    },
  },
  ACCOUNT_VALIDATION_013: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The username must be between 3 and 20 characters long.",
      DE: "Der Benutzername muss zwischen 3 und 20 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_014: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The email address is required.",
      DE: "Die Email Adresse ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_015: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The email address must be a string.",
      DE: "Die Email Adresse muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_016: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The email address is not a valid email format.",
      DE: "Die Email Adresse ist kein gültiges Email Format.",
    },
  },
  ACCOUNT_VALIDATION_017: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The encrypted password must be entered..",
      DE: "Das Verschlüsselte Passwort muss anegegeben werden.",
    },
  },
  ACCOUNT_VALIDATION_018: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The encrypted password must be a string.",
      DE: "Das Verschlüsselte Passwort muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_019: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The initialization vector for password encryption must be specified.",
      DE: "Der Initialisierungsvektor für die Passwortverschlüsselung muss angegeben werden.",
    },
  },
  ACCOUNT_VALIDATION_020: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The initialization vector for password encryption must be a string.",
      DE: "Der Initialisierungsvektor für die Passwortverschlüsselung muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_021: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The salt for password encryption must be specified.",
      DE: "Der Salt für die Passwortverschlüsselung muss angegeben werden.",
    },
  },
  ACCOUNT_VALIDATION_022: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The salt for password encryption must be a string.",
      DE: "Der Salt für die Passwortverschlüsselung muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_023: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The encrypted notes must be specified.",
      DE: "Die verschlüsselten Notizen müssen angegeben werden.",
    },
  },
  ACCOUNT_VALIDATION_024: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The encrypted notes must be a string.",
      DE: "Die verschlüsselten Notizen müssen eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_025: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The initialization vector for the note encryption must be specified.",
      DE: "Der Initialisierungsvektor für die Notizverschlüsselung muss angegeben werden.",
    },
  },
  ACCOUNT_VALIDATION_026: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The initialization vector for note encryption must be a string",
      DE: "Der Initialisierungsvektor für die Notizverschlüsselung muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_027: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Der Salt für die Notizverschlüsselung muss angegeben werden.",
      DE: "Benutzername ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_028: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The salt for the note encryption must be a string.",
      DE: "Der Salt für die Notizverschlüsselung muss eine Zeichenkette sein.",
    },
  },

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

  MAIL_SERVICE_001: {
    statusCode: 424,
    errorType: errorTypes.DependencyError,
    message: {
      EN: "The mail server is currently unavailable, please try again later.",
      DE: "Der Mailserver ist derzeit nicht erreichbar, versuche es bitte später erneut.",
    },
  },

  MAIL_VALIDATION_001: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email is required.",
      DE: "Email ist erforderlich.",
    },
  },
  MAIL_VALIDATION_002: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Email must be a string.",
      DE: "Email muss eine Zeichenkette sein.",
    },
  },
  MAIL_VALIDATION_003: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Invalid email address.",
      DE: "Ungültige Email-Adresse.",
    },
  },
  MAIL_VALIDATION_004: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The subject must be specified.",
      DE: "Der Betreff muss angegeben werden.",
    },
  },
  MAIL_VALIDATION_005: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The subject must be a string.",
      DE: "Der Betreff muss eine Zeichenkette sein.",
    },
  },
  MAIL_VALIDATION_006: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The subject must be between 5 and 78 characters long.",
      DE: "Der Betreff muss zwischen 5 und 78 Zeichen lang sein.",
    },
  },
  MAIL_VALIDATION_007: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "A message must be entered.",
      DE: "Es muss eine Nachricht angegeben werden.",
    },
  },
  MAIL_VALIDATION_008: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The message must be a string.",
      DE: "Die Nachricht muss eine Zeichenkette sein.",
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
      EN: "You must log in to access this resource.",
      DE: "Du musst dich anmelden, um auf diese Ressource zugreifen zu können.",
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

  USER_AUTHORIZATION_001: {
    statusCode: 403,
    errorType: errorTypes.AuthorizationError,
    message: {
      EN: "Your account has been blocked, please contact support.",
      DE: "Dein Konto wurde gesperrt, wende dich an den Support.",
    },
  },
  USER_AUTHORIZATION_002: {
    statusCode: 403,
    errorType: errorTypes.AuthorizationError,
    message: {
      EN: "Too many verification attempts! Your account has been blocked, please contact support.",
      DE: "Zu viele Verifizierungsversuche! Dein Konto wurde gesperrt, wende dich an den Support.",
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
  USER_CONFLICT_004: {
    statusCode: 409,
    errorType: errorTypes.ConflictError,
    message: {
      EN: "The verification code does not match!",
      DE: "Der Verifizierungscode stimmt nicht überein!",
    },
  },
  USER_CONFLICT_005: {
    statusCode: 409,
    errorType: errorTypes.ConflictError,
    message: {
      EN: "You have already confirmed your email address.",
      DE: "Du hast deine Email-Addresse bereits bestätigt.",
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

  USER_REQUEST_001: {
    statusCode: 429,
    errorType: errorTypes.RateLimitError,
    message: {
      EN: "Please wait 15 minutes before requesting a new code.",
      DE: "Bitte warte 15 Minuten bevor du einen neuen Code anforderst.",
    },
  },
  USER_REQUEST_002: {
    statusCode: 429,
    errorType: errorTypes.RateLimitError,
    message: {
      EN: "Please wait 15 minutes before requesting a new password.",
      DE: "Bitte warte 15 Minuten bevor du ein neues Passwort anforderst.",
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
  USER_VALIDATION_013: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The verification code is required.",
      DE: "Der Verifizierungscode ist erforderlich.",
    },
  },
  USER_VALIDATION_014: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The verification code must be a string.",
      DE: "Der Verifizierungscode muss eine Zeichenkette sein.",
    },
  },
  USER_VALIDATION_015: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The verification code can only contain alphanumeric characters.",
      DE: "Der Verifizierungscode darf nur alphanumerische Zeichen enthalten.",
    },
  },
  USER_VALIDATION_016: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The verification code must be exactly 8 characters long.",
      DE: "Der Verifizierungscode muss genau 8 Zeichen lang sein.",
    },
  },
  USER_VALIDATION_017: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "Newsletter is required.",
      DE: "Der Newsletter muss angegeben werden.",
    },
  },
  USER_VALIDATION_018: {
    statusCode: 422,
    errorTypes: errorTypes.ValidationError,
    message: {
      EN: "The newsletter must be a boolean.",
      DE: "Der Newsletter muss ein boolean sein.",
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
