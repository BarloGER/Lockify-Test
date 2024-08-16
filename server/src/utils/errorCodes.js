const { errorTypes } = require("./errorTypes.js");

// [MODULE_ERROR_NUMBER]

exports.errorCodes = {
  ACCOUNT_VALIDATION_001: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "No data was transmitted.",
      DE: "Es wurden keine Daten übermittelt.",
    },
  },
  ACCOUNT_VALIDATION_002: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Fields have been specified that are not allowed.",
      DE: "Es wurden Felder angegeben, die nicht erlaubt sind.",
    },
  },
  ACCOUNT_VALIDATION_003: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account name is required.",
      DE: "Der Kontoname ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_004: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account name must be a string.",
      DE: "Der Kontoname muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_005: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account name contains invalid characters.",
      DE: "Der Kontoname enthält ungültige Zeichen.",
    },
  },
  ACCOUNT_VALIDATION_006: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account name must be between 3 and 30 characters long.",
      DE: "Der Kontoname muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_007: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account URL is required.",
      DE: "Die Konten-URL ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_008: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account URL must be a string.",
      DE: "Die Konten-URL muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_009: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account URL is invalid.",
      DE: "Die Konten-URL ist ungültig.",
    },
  },
  ACCOUNT_VALIDATION_010: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account URL must be between 1 and 254 characters long.",
      DE: "Die Konten-URL muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_011: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Username is required.",
      DE: "Benutzername ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_012: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Username must be a string.",
      DE: "Benutzername muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_013: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Username contains invalid characters.",
      DE: "Benutzername enthält ungültige Zeichen.",
    },
  },
  ACCOUNT_VALIDATION_014: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Username must be between 1 and 30 characters long.",
      DE: "Benutzername muss zwischen 1 und 30 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_015: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email is required.",
      DE: "E-Mail ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_016: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email must be a string.",
      DE: "E-Mail muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_017: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email is invalid.",
      DE: "E-Mail ist ungültig.",
    },
  },
  ACCOUNT_VALIDATION_018: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email must be between 1 and 254 characters long.",
      DE: "E-Mail muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_019: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password is required.",
      DE: "Passwort ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_020: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password must be a string.",
      DE: "Passwort muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_021: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password must be between 1 and 30 characters long.",
      DE: "Passwort muss zwischen 1 und 30 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_022: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted password is required.",
      DE: "Verschlüsseltes Passwort ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_023: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted password must be a string.",
      DE: "Verschlüsseltes Passwort muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_024: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted password must be between 1 and 10000 characters long.",
      DE: "Verschlüsseltes Passwort muss zwischen 1 und 10000 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_025: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption IV is required.",
      DE: "Verschlüsselungs-IV für das Passwort ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_026: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für das Passwort muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_027: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für das Passwort muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_028: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption salt is required.",
      DE: "Verschlüsselungssalz für das Passwort ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_029: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption salt must be a string.",
      DE: "Verschlüsselungssalz für das Passwort muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_030: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Password encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für das Passwort muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_031: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes are required.",
      DE: "Verschlüsselte Notizen sind erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_032: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes must be a string.",
      DE: "Verschlüsselte Notizen müssen eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_033: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes must be between 1 and 10000 characters long.",
      DE: "Verschlüsselte Notizen müssen zwischen 1 und 10000 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_034: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV is required.",
      DE: "Verschlüsselungs-IV für Notizen ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_035: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für Notizen muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_036: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für Notizen muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  ACCOUNT_VALIDATION_037: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt is required.",
      DE: "Verschlüsselungssalz für Notizen ist erforderlich.",
    },
  },
  ACCOUNT_VALIDATION_038: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt must be a string.",
      DE: "Verschlüsselungssalz für Notizen muss eine Zeichenkette sein.",
    },
  },
  ACCOUNT_VALIDATION_039: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für Notizen muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },

  BANK_VALIDATION_001: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "No bank data was provided. Please ensure all required fields are filled.",
      DE: "Es wurden keine Bankdaten bereitgestellt. Bitte stellen Sie sicher, dass alle erforderlichen Felder ausgefüllt sind.",
    },
  },
  BANK_VALIDATION_002: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "Invalid fields are included in the request. Please check the allowed fields.",
      DE: "Ungültige Felder sind in der Anfrage enthalten. Bitte überprüfen Sie die zulässigen Felder.",
    },
  },
  BANK_VALIDATION_003: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Bank name is required.",
      DE: "Der Name der Bank ist erforderlich.",
    },
  },
  BANK_VALIDATION_004: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Bank name must be a string.",
      DE: "Der Name der Bank muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_005: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Bank name contains invalid characters.",
      DE: "Der Name der Bank enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_006: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Bank name must be between 3 and 30 characters long.",
      DE: "Der Name der Bank muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_007: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder first name is required.",
      DE: "Der Vorname des Kontoinhabers ist erforderlich.",
    },
  },
  BANK_VALIDATION_008: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder first name must be a string.",
      DE: "Der Vorname des Kontoinhabers muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_009: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder first name contains invalid characters.",
      DE: "Der Vorname des Kontoinhabers enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_010: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder first name must be between 3 and 30 characters long.",
      DE: "Der Vorname des Kontoinhabers muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_011: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder last name is required.",
      DE: "Der Nachname des Kontoinhabers ist erforderlich.",
    },
  },
  BANK_VALIDATION_012: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder last name must be a string.",
      DE: "Der Nachname des Kontoinhabers muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_013: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder last name contains invalid characters.",
      DE: "Der Nachname des Kontoinhabers enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_014: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account holder last name must be between 3 and 30 characters long.",
      DE: "Der Nachname des Kontoinhabers muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_015: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted IBAN is required.",
      DE: "Verschlüsselte IBAN ist erforderlich.",
    },
  },
  BANK_VALIDATION_016: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted IBAN must be a string.",
      DE: "Verschlüsselte IBAN muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_017: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted IBAN must be between 1 and 10,000 characters long.",
      DE: "Verschlüsselte IBAN muss zwischen 1 und 10.000 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_018: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption IV is required.",
      DE: "Verschlüsselungs-IV für IBAN ist erforderlich.",
    },
  },
  BANK_VALIDATION_019: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für IBAN muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_020: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für IBAN muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_021: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption salt is required.",
      DE: "Verschlüsselungssalz für IBAN ist erforderlich.",
    },
  },
  BANK_VALIDATION_022: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption salt must be a string.",
      DE: "Verschlüsselungssalz für IBAN muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_023: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "IBAN encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für IBAN muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_024: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "SWIFT/BIC is required.",
      DE: "SWIFT/BIC ist erforderlich.",
    },
  },
  BANK_VALIDATION_025: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "SWIFT/BIC must be a string.",
      DE: "SWIFT/BIC muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_026: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "SWIFT/BIC must be between 1 and 20 characters long.",
      DE: "SWIFT/BIC muss zwischen 1 und 20 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_027: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "SWIFT/BIC contains invalid characters.",
      DE: "SWIFT/BIC enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_028: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account type is required.",
      DE: "Kontotyp ist erforderlich.",
    },
  },
  BANK_VALIDATION_029: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account type must be a string.",
      DE: "Kontotyp muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_030: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account type contains invalid characters.",
      DE: "Kontotyp enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_031: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Account type must be between 3 and 30 characters long.",
      DE: "Kontotyp muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_032: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Branch code is required.",
      DE: "Filialcode ist erforderlich.",
    },
  },
  BANK_VALIDATION_033: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Branch code must be a string.",
      DE: "Filialcode muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_034: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Branch code must be between 1 and 20 characters long.",
      DE: "Filialcode muss zwischen 1 und 20 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_035: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Branch code contains invalid characters.",
      DE: "Filialcode enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_036: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder first name is required.",
      DE: "Vorname des Karteninhabers ist erforderlich.",
    },
  },
  BANK_VALIDATION_037: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder first name must be a string.",
      DE: "Vorname des Karteninhabers muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_038: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder first name contains invalid characters.",
      DE: "Vorname des Karteninhabers enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_039: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder first name must be between 3 and 30 characters long.",
      DE: "Vorname des Karteninhabers muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_040: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder last name is required.",
      DE: "Nachname des Karteninhabers ist erforderlich.",
    },
  },
  BANK_VALIDATION_041: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder last name must be a string.",
      DE: "Nachname des Karteninhabers muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_042: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder last name contains invalid characters.",
      DE: "Nachname des Karteninhabers enthält ungültige Zeichen.",
    },
  },
  BANK_VALIDATION_043: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card holder last name must be between 3 and 30 characters long.",
      DE: "Nachname des Karteninhabers muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_044: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted card number is required.",
      DE: "Verschlüsselte Kartennummer ist erforderlich.",
    },
  },
  BANK_VALIDATION_045: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted card number must be a string.",
      DE: "Verschlüsselte Kartennummer muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_046: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted card number must be between 1 and 10,000 characters long.",
      DE: "Verschlüsselte Kartennummer muss zwischen 1 und 10.000 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_047: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption IV is required.",
      DE: "Verschlüsselungs-IV für die Kartennummer ist erforderlich.",
    },
  },
  BANK_VALIDATION_048: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für die Kartennummer muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_049: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für die Kartennummer muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_050: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption salt is required.",
      DE: "Verschlüsselungssalz für die Kartennummer ist erforderlich.",
    },
  },
  BANK_VALIDATION_051: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption salt must be a string.",
      DE: "Verschlüsselungssalz für die Kartennummer muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_052: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card number encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für die Kartennummer muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_053: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Expiry date is required.",
      DE: "Das Ablaufdatum ist erforderlich.",
    },
  },
  BANK_VALIDATION_054: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Expiry date must be a string.",
      DE: "Das Ablaufdatum muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_055: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Expiry date format is incorrect. It should be in the format DD.MM.YYYY.",
      DE: "Das Format des Ablaufdatums ist falsch. Es sollte im Format TT.MM.JJJJ sein.",
    },
  },
  BANK_VALIDATION_056: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Expiry date must be exactly 5 characters long.",
      DE: "Das Ablaufdatum muss genau 5 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_057: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted CVV/CVC is required.",
      DE: "Verschlüsselter CVV/CVC ist erforderlich.",
    },
  },
  BANK_VALIDATION_058: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted CVV/CVC must be a string.",
      DE: "Verschlüsselter CVV/CVC muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_059: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted CVV/CVC must be between 1 and 10,000 characters long.",
      DE: "Verschlüsselter CVV/CVC muss zwischen 1 und 10.000 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_060: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption IV is required.",
      DE: "Verschlüsselungs-IV für CVV/CVC ist erforderlich.",
    },
  },
  BANK_VALIDATION_061: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für CVV/CVC muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_062: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für CVV/CVC muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_063: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption salt is required.",
      DE: "Verschlüsselungssalz für CVV/CVC ist erforderlich.",
    },
  },
  BANK_VALIDATION_064: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption salt must be a string.",
      DE: "Verschlüsselungssalz für CVV/CVC muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_065: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "CVV/CVC encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für CVV/CVC muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_066: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card type is required.",
      DE: "Kartentyp ist erforderlich.",
    },
  },
  BANK_VALIDATION_067: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card type must be a string.",
      DE: "Kartentyp muss eine Zeichenkette sein.",
    },
  },
  BANK_VALIDATION_068: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card type must be between 1 and 20 characters long.",
      DE: "Kartentyp muss zwischen 1 und 20 Zeichen lang sein.",
    },
  },
  BANK_VALIDATION_069: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Card type contains invalid characters.",
      DE: "Kartentyp enthält ungültige Zeichen.",
    },
  },

  CONTACT_VALIDATION_001: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "No data was transmitted.",
      DE: "Es wurden keine Daten übermittelt.",
    },
  },
  CONTACT_VALIDATION_002: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Fields have been specified that are not allowed.",
      DE: "Es wurden Felder angegeben, die nicht erlaubt sind.",
    },
  },
  CONTACT_VALIDATION_003: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Company name is required.",
      DE: "Firmenname ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_004: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Company name must be a string.",
      DE: "Firmenname muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_005: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Company name contains invalid characters.",
      DE: "Firmenname enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_006: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Company name must be between 3 and 30 characters long.",
      DE: "Firmenname muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_007: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "First name is required.",
      DE: "Vorname ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_008: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "First name must be a string.",
      DE: "Vorname muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_009: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "First name contains invalid characters.",
      DE: "Vorname enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_010: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "First name must be between 3 and 30 characters long.",
      DE: "Vorname muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_011: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Last name is required.",
      DE: "Nachname ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_012: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Last name must be a string.",
      DE: "Nachname muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_013: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Last name contains invalid characters.",
      DE: "Nachname enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_014: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Last name must be between 3 and 30 characters long.",
      DE: "Nachname muss zwischen 3 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_015: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Street address is required.",
      DE: "Straßenadresse ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_016: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Street address must be a string.",
      DE: "Straßenadresse muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_017: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Street address contains invalid characters.",
      DE: "Straßenadresse enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_018: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Street address must be between 3 and 50 characters long.",
      DE: "Straßenadresse muss zwischen 3 und 50 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_019: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Additional address information is required.",
      DE: "Zusätzliche Adressangaben sind erforderlich.",
    },
  },
  CONTACT_VALIDATION_020: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Additional address information must be a string.",
      DE: "Zusätzliche Adressangaben müssen eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_021: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Additional address information must be between 1 and 100 characters long.",
      DE: "Zusätzliche Adressangaben müssen zwischen 1 und 100 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_022: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "City is required.",
      DE: "Stadt ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_023: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "City must be a string.",
      DE: "Stadt muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_024: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "City contains invalid characters.",
      DE: "Stadt enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_025: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "City must be between 1 and 30 characters long.",
      DE: "Stadt muss zwischen 1 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_026: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "State/Province/Region is required.",
      DE: "Bundesland/Provinz/Region ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_027: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "State/Province/Region must be a string.",
      DE: "Bundesland/Provinz/Region muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_028: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "State/Province/Region contains invalid characters.",
      DE: "Bundesland/Provinz/Region enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_029: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "State/Province/Region must be between 1 and 30 characters long.",
      DE: "Bundesland/Provinz/Region muss zwischen 1 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_030: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Postal code is required.",
      DE: "Postleitzahl ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_031: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Postal code must be a string.",
      DE: "Postleitzahl muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_032: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Postal code contains invalid characters.",
      DE: "Postleitzahl enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_033: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Postal code must be between 3 and 10 characters long.",
      DE: "Postleitzahl muss zwischen 3 und 10 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_034: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Country is required.",
      DE: "Land ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_035: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Country must be a string.",
      DE: "Land muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_036: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Country contains invalid characters.",
      DE: "Land enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_037: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Country must be between 1 and 30 characters long.",
      DE: "Land muss zwischen 1 und 30 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_038: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Phone number is required.",
      DE: "Telefonnummer ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_039: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Phone number must be a string.",
      DE: "Telefonnummer muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_040: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Phone number contains invalid characters.",
      DE: "Telefonnummer enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_041: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Phone number must be between 3 and 20 characters long.",
      DE: "Telefonnummer muss zwischen 3 und 20 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_042: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email is required.",
      DE: "E-Mail ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_043: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email must be a string.",
      DE: "E-Mail muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_044: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email is invalid.",
      DE: "E-Mail ist ungültig.",
    },
  },
  CONTACT_VALIDATION_045: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Email must be between 6 and 254 characters long.",
      DE: "E-Mail muss zwischen 6 und 254 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_046: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Birth date is required.",
      DE: "Geburtsdatum ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_047: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Birth date must be a string.",
      DE: "Geburtsdatum muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_048: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Birth date contains invalid characters.",
      DE: "Geburtsdatum enthält ungültige Zeichen.",
    },
  },
  CONTACT_VALIDATION_049: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Birth date must be exactly 10 characters long.",
      DE: "Geburtsdatum muss genau 10 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_050: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes are required.",
      DE: "Verschlüsselte Notizen sind erforderlich.",
    },
  },
  CONTACT_VALIDATION_051: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes must be a string.",
      DE: "Verschlüsselte Notizen müssen eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_052: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Encrypted notes must be between 1 and 10000 characters long.",
      DE: "Verschlüsselte Notizen müssen zwischen 1 und 10000 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_053: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV is required.",
      DE: "Verschlüsselungs-IV für Notizen ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_054: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV must be a string.",
      DE: "Verschlüsselungs-IV für Notizen muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_055: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption IV must be between 1 and 254 characters long.",
      DE: "Verschlüsselungs-IV für Notizen muss zwischen 1 und 254 Zeichen lang sein.",
    },
  },
  CONTACT_VALIDATION_056: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt is required.",
      DE: "Verschlüsselungssalz für Notizen ist erforderlich.",
    },
  },
  CONTACT_VALIDATION_057: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt must be a string.",
      DE: "Verschlüsselungssalz für Notizen muss eine Zeichenkette sein.",
    },
  },
  CONTACT_VALIDATION_058: {
    statusCode: 422,
    errorType: errorTypes.ValidationError,
    message: {
      EN: "Notes encryption salt must be between 1 and 254 characters long.",
      DE: "Verschlüsselungssalz für Notizen muss zwischen 1 und 254 Zeichen lang sein.",
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

  NOTE_VALIDATION_001: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "No data was transmitted.",
  },
  NOTE_VALIDATION_002: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Fields have been specified that are not allowed.",
  },
  NOTE_VALIDATION_003: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Encrypted note title is required.",
  },
  NOTE_VALIDATION_004: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Encrypted note title must be a string.",
  },
  NOTE_VALIDATION_005: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Encrypted note title must be between 1 and 10,000 characters long.",
  },
  NOTE_VALIDATION_006: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note title encryption IV is required.",
  },
  NOTE_VALIDATION_007: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note title encryption IV must be a string.",
  },
  NOTE_VALIDATION_008: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Note title encryption IV must be between 1 and 254 characters long.",
  },
  NOTE_VALIDATION_009: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note title encryption salt is required.",
  },
  NOTE_VALIDATION_010: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note title encryption salt must be a string.",
  },
  NOTE_VALIDATION_011: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Note title encryption salt must be between 1 and 254 characters long.",
  },
  NOTE_VALIDATION_012: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Encrypted note content is required.",
  },
  NOTE_VALIDATION_013: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Encrypted note content must be a string.",
  },
  NOTE_VALIDATION_014: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Encrypted note content must be between 1 and 10,000 characters long.",
  },
  NOTE_VALIDATION_015: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note content encryption IV is required.",
  },
  NOTE_VALIDATION_016: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note content encryption IV must be a string.",
  },
  NOTE_VALIDATION_017: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Note content encryption IV must be between 1 and 254 characters long.",
  },
  NOTE_VALIDATION_018: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note content encryption salt is required.",
  },
  NOTE_VALIDATION_019: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message: "Note content encryption salt must be a string.",
  },
  NOTE_VALIDATION_020: {
    statusCode: 400,
    errorType: errorTypes.ValidationError,
    message:
      "Note content encryption salt must be between 1 and 254 characters long.",
  },

  REQUEST_VALIDATION_001: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "Invalid Host header value.",
      DE: "Ungültiger Wert im Host-Header.",
    },
  },
  REQUEST_VALIDATION_002: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "Line breaks detected that could lead to HTTP response splitting.",
      DE: "Es wurden Zeilenumbrüche festgestellt, die zu einer HTTP-Antwortaufteilung führen könnten.",
    },
  },
  REQUEST_VALIDATION_003: {
    statusCode: 415,
    errorType: errorTypes.UnsupportedMediaTypeError,
    message: {
      EN: "Unsupported Content-Type header.",
      DE: "Nicht unterstützter Content-Type-Header.",
    },
  },
  REQUEST_VALIDATION_004: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "User-Agent header is too long.",
      DE: "Der User-Agent-Header ist zu lang.",
    },
  },
  REQUEST_VALIDATION_005: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "Invalid Content-Length header value.",
      DE: "Ungültiger Wert im Content-Length-Header.",
    },
  },
  REQUEST_VALIDATION_006: {
    statusCode: 403,
    errorType: errorTypes.AuthorizationError,
    message: {
      EN: "Access from unallowed Origin.",
      DE: "Zugriff von nicht erlaubter Website.",
    },
  },
  REQUEST_VALIDATION_007: {
    statusCode: 400,
    errorType: errorTypes.BadRequestError,
    message: {
      EN: "Missing required security headers.",
      DE: "Erforderliche Sicherheits-Header fehlen.",
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
  SYS_SERVICE_002: {
    statusCode: 500,
    errorTypes: errorTypes.ServerError,
    message: {
      EN: "The session could not be deleted.",
      DE: "Die Session konnte nicht gelöscht werden.",
    },
  },
};
