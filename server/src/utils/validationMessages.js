exports.usernameMessages = {
  EN: {
    "string.base": "Username must be a string.",
    "string.alphanum": "Username must only contain alphanumeric characters.",
    "string.min": "Username must be at least {#limit} characters long.",
    "string.max": "Username must be at most {#limit} characters long.",
    "string.empty": "Username is required.",
    "any.required": "Username is required.",
  },
  DE: {
    "string.base": "Der Benutzername muss ein String sein.",
    "string.alphanum":
      "Der Benutzername darf nur alphanumerische Zeichen enthalten.",
    "string.min":
      "Der Benutzername muss mindestens {#limit} Zeichen lang sein.",
    "string.max": "Der Benutzername darf höchstens {#limit} Zeichen lang sein.",
    "string.empty": "Der Benutzername muss angegeben werden.",
    "any.required": "Der Benutzername ist erforderlich.",
  },
};

exports.emailMessages = {
  EN: {
    "string.base": "The email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  },
  DE: {
    "string.base": "Der Benutzername muss ein String sein.",
    "string.email": "Die E-Mail muss eine gültige E-Mail-Adresse sein.",
    "string.empty": "Die E-Mail muss angegeben werden",
    "any.required": "Die Email ist erforderlich.",
  },
};

exports.passwordMessages = {
  EN: {
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password must be at most {#limit} characters long.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  },
  DE: {
    "string.base": "Das Passwort muss ein String sein.",
    "string.min": "Das Passwort muss mindestens {#limit} Zeichen lang sein",
    "string.max": "Das Passwort darf höchstens {#limit} Zeichen lang sein",
    "string.empty": "Das Passwort muss angegeben werden",
    "any.required": "Das Passwort ist erforderlich.",
  },
};

exports.verificationMessages = {
  EN: {
    "string.base": "The verification code must be a string.",
    "string.alphanum":
      "The verification code may only contain alphanumeric characters.",
    "string.length":
      "The verification code must be exactly {#limit} characters long.",
    "string.empty": "The verification code is required.",
    "any.required": "The verification code is required.",
  },
  DE: {
    "string.base": "Der Verifizierungscode muss ein String sein.",
    "string.alphanum":
      "Der Verifizierungscode darf nur alphanumerische Zeichen enthalten.",
    "string.length":
      "Der Verifizierungscode muss genau {#limit} Zeichen lang sein",
    "string.empty": "Der Verifizierungscode muss angegeben werden",
    "any.required": "Der Verifizierungscode ist erforderlich.",
  },
};

exports.unknownObjectMessage = {
  EN: {
    "object.base": "The request must only include an empty object.",
    "object.unknown": "You have entered data that is not permitted!",
  },
  DE: {
    "object.base": "Die Anfrage darf nur ein leeres Objekt beinhalten.",
    "object.unknown": "Du hast Daten angegeben, die nicht erlaubt sind!",
  },
};
