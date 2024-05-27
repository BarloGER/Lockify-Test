exports.UserEntity = class UserEntity {
  constructor({
    username,
    email,
    password,
    isVerified = false,
    isBlocked = false,
    isNewsletterAllowed = false,
    verificationCode = null,
    verificationAttempts = 0,
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.isVerified = isVerified;
    this.isBlocked = isBlocked;
    this.isNewsletterAllowed = isNewsletterAllowed;
    this.verificationCode = verificationCode;
    this.verificationAttempts = verificationAttempts;
  }

  validateForRegistration() {
    return (
      this.validateUsername(true) ||
      this.validateEmail(true) ||
      this.validatePassword(true)
    );
  }

  validateForLogin() {
    return this.validateEmail(true) || this.validatePassword(true);
  }

  validateUsername(isRequired) {
    if (isRequired && !this.username) return "USER_VALIDATION_001";
    if (this.username && typeof this.username !== "string")
      return "USER_VALIDATION_002";
    if (this.username && !/^[a-zA-Z0-9]*$/.test(this.username))
      return "USER_VALIDATION_003";
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    )
      return "USER_VALIDATION_004";
    return null;
  }

  validateEmail(isRequired) {
    if (isRequired && !this.email) return "USER_VALIDATION_005";
    if (this.email && typeof this.email !== "string")
      return "USER_VALIDATION_006";
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      return "USER_VALIDATION_007";
    return null;
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) return "USER_VALIDATION_008";
    if (this.password && typeof this.password !== "string")
      return "USER_VALIDATION_009";
    if (this.password && this.password.length < 8) return "USER_VALIDATION_010";
    return null;
  }
};
