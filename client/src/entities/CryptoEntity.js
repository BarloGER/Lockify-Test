export class CryptoEntity {
  constructor(userInput) {
    const allowedFields = [
      "text",
      "encryptedData",
      "iv",
      "salt",
      "masterPassword",
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
      return "CRYPTOGRAPHY_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "CRYPTOGRAPHY_VALIDATION_002";
    }

    return null;
  }

  validateForEncryption() {
    const validFields = ["text", "masterPassword"];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return this.validateText(true) || this.validateMasterPassword(true);
  }

  validateForDecryption() {
    const validFields = ["encryptedData", "iv", "salt", "masterPassword"];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateEncryptedData(true) ||
      this.validateIv(true) ||
      this.validateSalt(true) ||
      this.validateMasterPassword(true)
    );
  }

  validateText(isRequired) {
    if (isRequired && !this.text) return "CRYPTOGRAPHY_VALIDATION_003";
    if (this.text && typeof this.text !== "string")
      return "CRYPTOGRAPHY_VALIDATION_004";
    if ((this.text && this.text.length < 1) || this.text.length > 1000) {
      return "CRYPTOGRAPHY_VALIDATION_005";
    }
  }

  validateMasterPassword(isRequired) {
    if (isRequired && !this.masterPassword)
      return "CRYPTOGRAPHY_VALIDATION_006";
    if (this.masterPassword && typeof this.masterPassword !== "string")
      return "CRYPTOGRAPHY_VALIDATION_007";
    if (
      (this.masterPassword && this.masterPassword.length < 1) ||
      this.masterPassword.length > 30
    ) {
      return "CRYPTOGRAPHY_VALIDATION_008";
    }

    return null;
  }

  validateEncryptedData(isRequired) {
    if (isRequired && !this.encryptedData) return "CRYPTOGRAPHY_VALIDATION_009";
    if (this.encryptedData && typeof this.encryptedData !== "string")
      return "CRYPTOGRAPHY_VALIDATION_010";
    if (
      (this.encryptedData && this.encryptedData.length < 1) ||
      this.encryptedData.length > 10000
    ) {
      return "CRYPTOGRAPHY_VALIDATION_011";
    }

    return null;
  }

  validateIv(isRequired) {
    if (isRequired && !this.iv) return "CRYPTOGRAPHY_VALIDATION_012";
    if (this.iv && typeof this.iv !== "string")
      return "CRYPTOGRAPHY_VALIDATION_013";
    if ((this.iv && this.iv.length < 1) || this.iv.length > 254) {
      return "CRYPTOGRAPHY_VALIDATION_014";
    }

    return null;
  }

  validateSalt(isRequired) {
    if (isRequired && !this.salt) return "CRYPTOGRAPHY_VALIDATION_015";
    if (this.salt && typeof this.salt !== "string")
      return "CRYPTOGRAPHY_VALIDATION_016";
    if ((this.salt && this.salt.length < 1) || this.salt.length > 254) {
      return "CRYPTOGRAPHY_VALIDATION_017";
    }

    return null;
  }
}
