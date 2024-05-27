exports.UserEntity = class UserEntity {
  constructor(userInput, options = { isNewUser: false }) {
    // Only set default values when a new user is created
    if (options.isNewUser) {
      this.isVerified = false;
      this.isBlocked = false;
      this.isNewsletterAllowed = false;
      this.verificationCode = null;
      this.verificationAttempts = 0;
    }

    // Assign all transferred values
    Object.entries(userInput).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter((field) => this[field] !== undefined);
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
      "isVerified",
      "isBlocked",
      "isNewsletterAllowed",
      "verificationCode",
      "verificationAttempts",
    ];
    const result = this.validateValidFields(validFields);
    if (result) return result;

    return (
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true)
    );
  }

  validateForLogin() {
    const validFields = ["email", "password"];
    const result = this.validateValidFields(validFields);
    if (result) return result;

    return this.validateEmail(true) || this.validatePassword(true);
  }

  validateForUpdate() {
    const validFields = ["username", "email", "password"];
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

  validateUsername(isRequired) {
    if (isRequired && !this.username) return "USER_VALIDATION_003";
    if (this.username && typeof this.username !== "string")
      return "USER_VALIDATION_004";
    if (this.username && !/^[a-zA-Z0-9]*$/.test(this.username))
      return "USER_VALIDATION_005";
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    )
      return "USER_VALIDATION_006";
    return null;
  }

  validateEmail(isRequired) {
    if (isRequired && !this.email) return "USER_VALIDATION_007";
    if (this.email && typeof this.email !== "string")
      return "USER_VALIDATION_008";
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      return "USER_VALIDATION_009";
    return null;
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) return "USER_VALIDATION_010";
    if (this.password && typeof this.password !== "string")
      return "USER_VALIDATION_011";
    if (this.password && this.password.length < 8) return "USER_VALIDATION_012";
    return null;
  }
};
