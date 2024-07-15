export class UserEntity {
  constructor(userInput) {
    const allowedFields = [
      "username",
      "email",
      "password",
      "confirmPassword",
      "masterPassword",
      "confirmMasterPassword",
      "encryptedSecret",
      "secretEncryptionIv",
      "secretEncryptionSalt",
      "isNewsletterAllowed",
      "verificationCode",
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
      return "USER_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "USER_VALIDATION_002";
    }

    return null;
  }

  validateForRegistrationBeforeEncryption() {
    const validFields = [
      "username",
      "email",
      "password",
      "confirmPassword",
      "masterPassword",
      "confirmMasterPassword",
      "isNewsletterAllowed",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true) ||
      this.validateConfirmPassword(true) ||
      this.validateMasterPassword(true) ||
      this.validateConfirmMasterPassword(true) ||
      this.validateIsNewsletterAllowed(true)
    );
  }

  validateForRegistrationAfterEncryption() {
    const validFields = [
      "username",
      "email",
      "password",
      "encryptedSecret",
      "secretEncryptionIv",
      "secretEncryptionSalt",
      "isNewsletterAllowed",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true) ||
      this.validateEncryptedSecret(true) ||
      this.validateSecretEncryptionIv(true) ||
      this.validateSecretEncryptionSalt(true) ||
      this.validateIsNewsletterAllowed(true)
    );
  }

  validateForAuthentication() {
    const validFields = ["email", "password"];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return this.validateEmail(true) || this.validatePassword(true);
  }

  validateForUpdateBeforeEncryption() {
    const validFields = [
      "username",
      "email",
      "password",
      "isNewsletterAllowed",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field]);
    if (fieldsToUpdate.length === 0) {
      return "USER_VALIDATION_001";
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
      "username",
      "email",
      "password",
      "encryptedSecret",
      "secretEncryptionIv",
      "secretEncryptionSalt",
      "isNewsletterAllowed",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field]);
    if (fieldsToUpdate.length === 0) {
      return "USER_VALIDATION_001";
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

  validateForDelete() {
    const validFields = [];
    const extraFields = validFields.filter((field) => this[field]);

    if (extraFields.length > 0) {
      return "USER_VALIDATION_002";
    }

    return null;
  }

  validateForVerification() {
    const validFields = ["verificationCode"];
    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return this.validateVerificationCode(true);
  }

  validateForRequest() {
    const validFields = ["email"];
    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return this.validateEmail(true);
  }

  validateUsername(isRequired) {
    const regex = /^[a-zA-Z0-9-_]+$/;

    if (isRequired && !this.username) return "USER_VALIDATION_003";
    if (this.username && typeof this.username !== "string")
      return "USER_VALIDATION_004";
    if (this.username && !regex.test(this.username))
      return "USER_VALIDATION_005";
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    )
      return "USER_VALIDATION_006";
    return null;
  }

  validateEmail(isRequired) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRequired && !this.email) return "USER_VALIDATION_007";
    if (this.email && typeof this.email !== "string")
      return "USER_VALIDATION_008";
    if (this.email && !regex.test(this.email)) return "USER_VALIDATION_009";
    if (this.email && (this.email.length < 6 || this.email.length > 254))
      return "USER_VALIDATION_010";

    return null;
  }

  // Helper method to count character types and validate minimum counts
  countCharacterTypes(password, minCounts) {
    const patterns = {
      uppercaseLetters: /[A-ZÄÖÜ]/g,
      lowercaseLetters: /[a-zäöüß]/g,
      numbers: /[0-9]/g,
      specialCharacters: /[!@#$%^&*()-_,.?":{}|<>]/g,
    };

    // Map over the object to count each pattern match and verify against corresponding minCount
    return Object.keys(patterns).every((key) => {
      const regex = patterns[key];
      const count = (password.match(regex) || []).length;
      return count >= minCounts[key];
    });
  }

  validatePassword(isRequired) {
    const minCounts = {
      uppercaseLetters: 1,
      lowercaseLetters: 1,
      numbers: 1,
      specialCharacters: 1,
    };

    if (isRequired && !this.password) return "USER_VALIDATION_011";
    if (this.password && typeof this.password !== "string")
      return "USER_VALIDATION_012";
    if (
      (this.password && this.password.length < 8) ||
      this.password.length > 30
    ) {
      return "USER_VALIDATION_013";
    }
    if (!this.countCharacterTypes(this.password, minCounts)) {
      return "USER_VALIDATION_014";
    }

    return null;
  }

  validateConfirmPassword(isRequired) {
    if (isRequired && !this.confirmPassword) return "USER_VALIDATION_015";
    if (this.confirmPassword && typeof this.confirmPassword !== "string")
      return "USER_VALIDATION_016";
    if (this.confirmPassword !== this.password) return "USER_VALIDATION_017";
  }

  validateMasterPassword(isRequired) {
    const minCounts = {
      uppercaseLetters: 2,
      lowercaseLetters: 2,
      numbers: 2,
      specialCharacters: 2,
    };

    if (isRequired && !this.masterPassword) return "USER_VALIDATION_018";
    if (this.masterPassword && typeof this.masterPassword !== "string")
      return "USER_VALIDATION_019";
    if (
      (this.masterPassword && this.masterPassword.length < 12) ||
      this.masterPassword.length > 30
    ) {
      return "USER_VALIDATION_020";
    }
    if (!this.countCharacterTypes(this.masterPassword, minCounts)) {
      return "USER_VALIDATION_021";
    }

    return null;
  }

  validateConfirmMasterPassword(isRequired) {
    if (isRequired && !this.confirmMasterPassword) return "USER_VALIDATION_022";
    if (
      this.confirmMasterPassword &&
      typeof this.confirmMasterPassword !== "string"
    )
      return "USER_VALIDATION_023";
    if (
      this.confirmMasterPassword &&
      this.confirmMasterPassword !== this.masterPassword
    )
      return "USER_VALIDATION_024";
  }

  validateEncryptedSecret(isRequired) {
    if (isRequired && !this.encryptedSecret) return "USER_VALIDATION_025";
    if (this.encryptedSecret && typeof this.encryptedSecret !== "string")
      return "USER_VALIDATION_026";
    if (
      (this.encryptedSecret && this.encryptedSecret.length < 1) ||
      this.encryptedSecret.length > 10000
    ) {
      return "USER_VALIDATION_027";
    }

    return null;
  }

  validateSecretEncryptionIv(isRequired) {
    if (isRequired && !this.secretEncryptionIv) return "USER_VALIDATION_028";
    if (this.secretEncryptionIv && typeof this.secretEncryptionIv !== "string")
      return "USER_VALIDATION_029";
    if (
      (this.secretEncryptionIv && this.secretEncryptionIv.length < 1) ||
      this.secretEncryptionIv.length > 254
    ) {
      return "USER_VALIDATION_030";
    }

    return null;
  }

  validateSecretEncryptionSalt(isRequired) {
    if (isRequired && !this.secretEncryptionSalt) return "USER_VALIDATION_031";
    if (
      this.secretEncryptionSalt &&
      typeof this.secretEncryptionSalt !== "string"
    )
      return "USER_VALIDATION_032";
    if (
      (this.secretEncryptionSalt && this.secretEncryptionSalt.length < 1) ||
      this.secretEncryptionSalt.length > 254
    ) {
      return "USER_VALIDATION_033";
    }

    return null;
  }

  validateVerificationCode(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.verificationCode) return "USER_VALIDATION_034";
    if (this.verificationCode && typeof this.verificationCode !== "string")
      return "USER_VALIDATION_035";
    if (this.verificationCode && this.verificationCode.length !== 8)
      return "USER_VALIDATION_036";
    if (this.verificationCode && !regex.test(this.verificationCode))
      return "USER_VALIDATION_037";

    return null;
  }

  validateIsNewsletterAllowed(isRequired) {
    if (isRequired && this.isNewsletterAllowed === undefined)
      return "USER_VALIDATION_038";
    if (
      this.isNewsletterAllowed &&
      typeof this.isNewsletterAllowed !== "boolean"
    )
      return "USER_VALIDATION_039";

    return null;
  }
}
