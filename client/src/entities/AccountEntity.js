// ! Redo accountUrl regex

export class AccountEntity {
  constructor(userInput) {
    const allowedFields = [
      "accountName",
      "accountUrl",
      "username",
      "email",
      "password",
      "encryptedPassword",
      "passwordEncryptionIv",
      "passwordEncryptionSalt",
      "notes",
      "encryptedNotes",
      "notesEncryptionIv",
      "notesEncryptionSalt",
    ];

    Object.entries(userInput).forEach(([key, value]) => {
      if (allowedFields.includes(key)) {
        this[key] = value;
      }
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter(
      (field) => this[field] !== undefined && this[field] !== ""
    );
    if (specifiedFields.length === 0) {
      return "ACCOUNT_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "ACCOUNT_VALIDATION_002";
    }

    return null;
  }

  validateForCreationBeforeEncryption() {
    const validFields = [
      "accountName",
      "accountUrl",
      "username",
      "email",
      "password",
      "notes",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateAccountName(false) ||
      this.validateAccountUrl(false) ||
      this.validateUsername(false) ||
      this.validateEmail(false) ||
      this.validatePassword(false) ||
      this.validateNotes(false)
    );
  }

  validateForCreationAfterEncryption() {
    const validFields = [
      "accountName",
      "accountUrl",
      "username",
      "email",
      "encryptedPassword",
      "passwordEncryptionIv",
      "passwordEncryptionSalt",
      "encryptedNotes",
      "notesEncryptionIv",
      "notesEncryptionSalt",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateAccountName(false) ||
      this.validateAccountUrl(false) ||
      this.validateUsername(false) ||
      this.validateEmail(false) ||
      this.validateEncryptedPassword(false) ||
      this.validatePasswordEncryptionIv(false) ||
      this.validatePasswordEncryptionSalt(false) ||
      this.validateEncryptedNotes(false) ||
      this.validateNotesEncryptionIv(false) ||
      this.validateNotesEncryptionSalt(false)
    );
  }

  validateForUpdateBeforeEncryption() {
    const validFields = [
      "accountName",
      "accountUrl",
      "username",
      "email",
      "password",
      "notes",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "ACCOUNT_VALIDATION_001";
    }

    // Validate each passed field
    for (const field of fieldsToUpdate) {
      const validateMethod = `validate${
        field.charAt(0).toUpperCase() + field.slice(1)
      }`;
      const validationErrors = this[validateMethod](true);
      if (validationErrors) return validationErrors;
    }

    return null;
  }

  validateForUpdateAfterEncryption() {
    const validFields = [
      "accountName",
      "accountUrl",
      "username",
      "email",
      "encryptedPassword",
      "passwordEncryptionIv",
      "passwordEncryptionSalt",
      "encryptedNotes",
      "notesEncryptionIv",
      "notesEncryptionSalt",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "ACCOUNT_VALIDATION_001";
    }

    // Validate each passed field
    for (const field of fieldsToUpdate) {
      const validateMethod = `validate${
        field.charAt(0).toUpperCase() + field.slice(1)
      }`;
      const validationErrors = this[validateMethod](true);
      if (validationErrors) return validationErrors;
    }

    return null;
  }

  validateAccountName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/;

    if (isRequired && !this.accountName) return "ACCOUNT_VALIDATION_003";
    if (this.accountName && typeof this.accountName !== "string")
      return "ACCOUNT_VALIDATION_004";
    if (this.accountName && !regex.test(this.accountName))
      return "ACCOUNT_VALIDATION_005";
    if (
      this.accountName &&
      (this.accountName.length < 3 || this.accountName.length > 30)
    )
      return "ACCOUNT_VALIDATION_006";

    return null;
  }

  validateAccountUrl(isRequired) {
    const urlPattern = new RegExp(
      "^https?:\\/\\/" + // protocol (http and https only)
        "(?:\\S+(?::\\S*)?@)?" + // user:pass authentication
        "(?:" +
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + // IP address exclusion
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        "(?:" +
        "(?:" +
        "[a-z0-9\\u00a1-\\uffff]" + // unicode characters
        "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
        ")?[a-z0-9\\u00a1-\\uffff]\\." +
        ")+" +
        "[a-z\\u00a1-\\uffff]{2,}\\.?" + // TLD identifier
        ")" +
        "(?::\\d{2,5})?" + // port number
        "(?:[/?#]\\S*)?" + // resource path
        "$",
      "i"
    );

    if (isRequired && !this.accountUrl) return "ACCOUNT_VALIDATION_007";
    if (this.accountUrl && typeof this.accountUrl !== "string")
      return "ACCOUNT_VALIDATION_008";
    if (this.accountUrl && !urlPattern.test(this.accountUrl)) {
      return "ACCOUNT_VALIDATION_009";
    }
    if (
      this.accountUrl &&
      (this.accountUrl.length < 1 || this.accountUrl.length > 254)
    )
      return "ACCOUNT_VALIDATION_010";

    return null;
  }

  validateUsername(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,-_]+$/;

    if (isRequired && !this.username) return "ACCOUNT_VALIDATION_011";
    if (this.username && typeof this.username !== "string")
      return "ACCOUNT_VALIDATION_012";
    if (this.username && !regex.test(this.username))
      return "ACCOUNT_VALIDATION_013";
    if (
      this.username &&
      (this.username.length < 1 || this.username.length > 30)
    )
      return "ACCOUNT_VALIDATION_014";

    return null;
  }

  validateEmail(isRequired) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRequired && !this.email) return "ACCOUNT_VALIDATION_015";
    if (this.email && typeof this.email !== "string")
      return "ACCOUNT_VALIDATION_016";
    if (this.email && !regex.test(this.email)) return "ACCOUNT_VALIDATION_017";
    if (this.email && (this.email.length < 1 || this.email.length > 254))
      return "ACCOUNT_VALIDATION_018";

    return null;
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) return "ACCOUNT_VALIDATION_019";
    if (this.password && typeof this.password !== "string")
      return "ACCOUNT_VALIDATION_020";
    if (
      (this.password && this.password.length < 1) ||
      this.password.length > 30
    )
      return "ACCOUNT_VALIDATION_021";

    return null;
  }

  validateEncryptedPassword(isRequired) {
    if (isRequired && !this.encryptedPassword) return "ACCOUNT_VALIDATION_022";
    if (this.encryptedPassword && typeof this.encryptedPassword !== "string")
      return "ACCOUNT_VALIDATION_023";
    if (
      (this.encryptedPassword && this.encryptedPassword.length < 1) ||
      this.encryptedPassword.length > 10000
    ) {
      return "ACCOUNT_VALIDATION_024";
    }

    return null;
  }

  validatePasswordEncryptionIv(isRequired) {
    if (isRequired && !this.passwordEncryptionIv)
      return "ACCOUNT_VALIDATION_025";
    if (
      this.passwordEncryptionIv &&
      typeof this.passwordEncryptionIv !== "string"
    )
      return "ACCOUNT_VALIDATION_026";
    if (
      (this.passwordEncryptionIv && this.passwordEncryptionIv.length < 1) ||
      this.passwordEncryptionIv.length > 254
    ) {
      return "ACCOUNT_VALIDATION_027";
    }

    return null;
  }

  validatePasswordEncryptionSalt(isRequired) {
    if (isRequired && !this.passwordEncryptionSalt)
      return "ACCOUNT_VALIDATION_028";
    if (
      this.passwordEncryptionSalt &&
      typeof this.passwordEncryptionSalt !== "string"
    )
      return "ACCOUNT_VALIDATION_029";
    if (
      (this.passwordEncryptionSalt && this.passwordEncryptionSalt.length < 1) ||
      this.passwordEncryptionSalt.length > 254
    ) {
      return "ACCOUNT_VALIDATION_030";
    }

    return null;
  }

  validateNotes(isRequired) {
    if (isRequired && !this.notes) return "ACCOUNT_VALIDATION_031";
    if (this.notes && typeof this.notes !== "string")
      return "ACCOUNT_VALIDATION_032";
    if ((this.notes && this.notes.length < 1) || this.notes.length > 100)
      return "ACCOUNT_VALIDATION_033";

    return null;
  }

  validateEncryptedNotes(isRequired) {
    if (isRequired && !this.encryptedNotes) return "ACCOUNT_VALIDATION_034";
    if (this.encryptedNotes && typeof this.encryptedNotes !== "string")
      return "ACCOUNT_VALIDATION_035";
    if (
      (this.encryptedNotes && this.encryptedNotes.length < 1) ||
      this.encryptedNotes.length > 10000
    ) {
      return "ACCOUNT_VALIDATION_036";
    }

    return null;
  }

  validateNotesEncryptionIv(isRequired) {
    if (isRequired && !this.notesEncryptionIv) return "ACCOUNT_VALIDATION_037";
    if (this.notesEncryptionIv && typeof this.notesEncryptionIv !== "string")
      return "ACCOUNT_VALIDATION_038";
    if (
      (this.notesEncryptionIv && this.notesEncryptionIv.length < 1) ||
      this.notesEncryptionIv.length > 254
    ) {
      return "ACCOUNT_VALIDATION_039";
    }

    return null;
  }

  validateNotesEncryptionSalt(isRequired) {
    if (isRequired && !this.notesEncryptionSalt)
      return "ACCOUNT_VALIDATION_040";
    if (
      this.notesEncryptionSalt &&
      typeof this.notesEncryptionSalt !== "string"
    )
      return "ACCOUNT_VALIDATION_041";
    if (
      (this.notesEncryptionSalt && this.notesEncryptionSalt.length < 1) ||
      this.notesEncryptionSalt.length > 254
    ) {
      return "ACCOUNT_VALIDATION_042";
    }

    return null;
  }
}
