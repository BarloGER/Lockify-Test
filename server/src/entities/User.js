exports.UserEntity = class UserEntity {
  constructor({
    username,
    email,
    password,
    isVerified,
    isBlocked,
    isNewsletterAllowed,
    verificationCode,
    verificationAttempts,
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isVerified = isVerified || false;
    this.isBlocked = isBlocked || false;
    this.isNewsletterAllowed = isNewsletterAllowed || false;
    this.verificationCode = verificationCode;
    this.verificationAttempts = verificationAttempts || 0;
    this.error = null;
  }

  validateRegisterUserBody() {
    return (this.error =
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true) ||
      this.error);
  }

  validateCreateUser() {
    return (this.error =
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true) ||
      this.validateIsVerified(true) ||
      this.validateIsBlocked(true) ||
      this.validateIsNewsletterAllowed(true) ||
      this.validateVerificationCode(true) ||
      this.validateVerificationAttempts(true) ||
      this.error);
  }
  validateUsername(isRequired) {
    if (isRequired && !this.username) {
      return (this.error = "USER_VALIDATION_001");
    }
    if (this.username && typeof this.username !== "string") {
      return (this.error = "USER_VALIDATION_002");
    }
    if (this.username && !this.username.match(/^[a-zA-Z0-9]*$/)) {
      return (this.error = "USER_VALIDATION_003");
    }
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    ) {
      return (this.error = "USER_VALIDATION_004");
    }
  }

  validateEmail(isRequired) {
    if (isRequired && !this.email) {
      return (this.error = "USER_VALIDATION_005");
    }
    if (this.email && typeof this.email !== "string") {
      return (this.error = "USER_VALIDATION_006");
    }
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      return (this.error = "USER_VALIDATION_007");
    }
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) {
      return (this.error = "USER_VALIDATION_008");
    }
    if (this.password && typeof this.password !== "string") {
      return (this.error = "USER_VALIDATION_009");
    }
    if (this.password && this.password.length < 8) {
      return (this.error = "USER_VALIDATION_010");
    }
  }

  validateIsVerified(isRequired) {
    if (isRequired && this.isVerified === undefined) {
      return (this.error = "USER_VALIDATION_011");
    }
    if (this.isVerified !== undefined && typeof this.isVerified !== "boolean") {
      return (this.error = "USER_VALIDATION_012");
    }
  }

  validateIsBlocked(isRequired) {
    if (isRequired && this.isBlocked === undefined) {
      return (this.error = "USER_VALIDATION_013");
    }
    if (this.isBlocked !== undefined && typeof this.isBlocked !== "boolean") {
      return (this.error = "USER_VALIDATION_014");
    }
  }

  validateIsNewsletterAllowed(isRequired) {
    if (isRequired && this.isNewsletterAllowed === undefined) {
      return (this.error = "USER_VALIDATION_015");
    }
    if (
      this.isNewsletterAllowed !== undefined &&
      typeof this.isNewsletterAllowed !== "boolean"
    ) {
      return (this.error = "USER_VALIDATION_016");
    }
  }

  validateVerificationCode(isRequired) {
    if (isRequired && !this.verificationCode) {
      return (this.error = "USER_VALIDATION_017");
    }
    if (this.verificationCode && typeof this.verificationCode !== "string") {
      return (this.error = "USER_VALIDATION_018");
    }
    if (
      this.verificationCode &&
      !this.verificationCode.match(/^[a-zA-Z0-9]*$/)
    ) {
      return (this.error = "USER_VALIDATION_019");
    }
    if (this.verificationCode && this.verificationCode.length !== 8) {
      return (this.error = "USER_VALIDATION_020");
    }
  }

  validateVerificationAttempts(isRequired) {
    if (isRequired && this.verificationAttempts === undefined) {
      return (this.error = "USER_VALIDATION_021");
    }
    if (
      this.verificationAttempts !== undefined &&
      typeof this.verificationAttempts !== "number"
    ) {
      return (this.error = "USER_VALIDATION_022");
    }
  }
};
