exports.UserEntity = class UserEntity {
  constructor(userInput, options = { isNewUser: false }) {
    // Only set default values when a new user is created
    if (options.isNewUser) {
      this.isVerified = false;
      this.isBlocked = false;
      this.verificationCode = null;
      this.verificationAttempts = 0;
    }

    const allowedFields = [
      "username",
      "email",
      "password",
      "encryptedSecret",
      "secretEncryptionIv",
      "secretEncryptionSalt",
      "isNewsletterAllowed",
      "verificationCode",
    ];

    // Assign all transferred values
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

  validateForRegistration() {
    const validFields = [
      "username",
      "email",
      "password",
      "encryptedSecret",
      "secretEncryptionIv",
      "secretEncryptionSalt",
      "isVerified",
      "isBlocked",
      "isNewsletterAllowed",
      "verificationCode",
      "verificationAttempts",
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

  validateForUpdate() {
    const validFields = [
      "username",
      "email",
      "password",
      "isNewsletterAllowed",
    ];
    const fieldsToUpdate = validFields.filter(
      (field) => this[field] !== undefined
    );
    if (fieldsToUpdate.length === 0) {
      return "USER_VALIDATION_001";
    }

    // Validate each passed field
    for (const field of fieldsToUpdate) {
      const validateMethod = `validate${
        field.charAt(0).toUpperCase() + field.slice(1)
      }`;
      const error = this[validateMethod](true);
      if (error) return error;
    }

    return null;
  }

  validateForDelete() {
    const validFields = [];
    const extraFields = validFields.filter(
      (field) => this[field] !== undefined
    );

    if (extraFields.length > 0) {
      return "USER_VALIDATION_002";
    }

    return null;
  }

  validateForVerification() {
    const validFields = ["verificationCode"];
    const result = this.validateValidFields(validFields);
    if (result) return result;

    return this.validateVerificationCode(true);
  }

  validateForUpdateData() {
    const validFields = ["email"];
    const result = this.validateValidFields(validFields);
    if (result) return result;

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

  validateEncryptedSecret(isRequired) {
    if (isRequired && !this.encryptedSecret) return "USER_VALIDATION_015";
    if (this.encryptedSecret && typeof this.encryptedSecret !== "string")
      return "USER_VALIDATION_016";
    if (
      (this.encryptedSecret && this.encryptedSecret.length < 1) ||
      this.encryptedSecret.length > 10000
    ) {
      return "USER_VALIDATION_017";
    }

    return null;
  }

  validateSecretEncryptionIv(isRequired) {
    if (isRequired && !this.secretEncryptionIv) return "USER_VALIDATION_018";
    if (this.secretEncryptionIv && typeof this.secretEncryptionIv !== "string")
      return "USER_VALIDATION_019";
    if (
      (this.secretEncryptionIv && this.secretEncryptionIv.length < 1) ||
      this.secretEncryptionIv.length > 254
    ) {
      return "USER_VALIDATION_020";
    }

    return null;
  }

  validateSecretEncryptionSalt(isRequired) {
    if (isRequired && !this.secretEncryptionSalt) return "USER_VALIDATION_021";
    if (
      this.secretEncryptionSalt &&
      typeof this.secretEncryptionSalt !== "string"
    )
      return "USER_VALIDATION_022";
    if (
      (this.secretEncryptionSalt && this.secretEncryptionSalt.length < 1) ||
      this.secretEncryptionSalt.length > 254
    ) {
      return "USER_VALIDATION_023";
    }

    return null;
  }
  validateVerificationCode(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.verificationCode) return "USER_VALIDATION_024";
    if (this.verificationCode && typeof this.verificationCode !== "string")
      return "USER_VALIDATION_025";
    if (this.verificationCode && this.verificationCode.length !== 8)
      return "USER_VALIDATION_026";
    if (this.verificationCode && !regex.test(this.verificationCode))
      return "USER_VALIDATION_027";

    return null;
  }

  validateIsNewsletterAllowed(isRequired) {
    if (isRequired && this.isNewsletterAllowed === undefined)
      return "USER_VALIDATION_028";
    if (
      this.isNewsletterAllowed &&
      typeof this.isNewsletterAllowed !== "boolean"
    )
      return "USER_VALIDATION_029";

    return null;
  }
};
