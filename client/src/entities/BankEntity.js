export class BankEntity {
  constructor(bankInput) {
    // Assign all transferred values
    Object.entries(bankInput).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter((field) => this[field] !== undefined);
    if (specifiedFields.length === 0) {
      return "BANK_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "BANK_VALIDATION_002";
    }

    return null;
  }

  validateForCreationBeforeEncryption() {
    const validFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "iban",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "cardNumber",
      "expiryDate",
      "cardCVVCVC",
      "cardType",
    ];

    const result = this.validateValidFields(validFields);
    if (result) return result;

    return (
      this.validateCompanyName(false) ||
      this.validateFirstName(false) ||
      this.validateLastName(false) ||
      this.validateStreetAddress(false) ||
      this.validateAdditionalAddressInfo(false) ||
      this.validateCity(false) ||
      this.validateStateProvinceRegion(false) ||
      this.validatePostalCode(false) ||
      this.validateCountry(false) ||
      this.validatePhoneNumber(false) ||
      this.validateEmail(false) ||
      this.validateBirthDate(false) ||
      this.validateNotes(false)
    );
  }

  validateForCreationAfterEncryption() {
    const validFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "iban",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "cardNumber",
      "expiryDate",
      "cardCVVCVC",
      "encryptedNotes",
      "cardTypeEncryptionIv",
      "cardTypeEncryptionSalt",
    ];

    const result = this.validateValidFields(validFields);
    if (result) return result;

    return (
      this.validateCompanyName(false) ||
      this.validateFirstName(false) ||
      this.validateLastName(false) ||
      this.validateStreetAddress(false) ||
      this.validateAdditionalAddressInfo(false) ||
      this.validateCity(false) ||
      this.validateStateProvinceRegion(false) ||
      this.validatePostalCode(false) ||
      this.validateCountry(false) ||
      this.validatePhoneNumber(false) ||
      this.validateEmail(false) ||
      this.validateBirthDate(false) ||
      this.validateEncryptedNotes(false) ||
      this.validateNotesEncryptionIv(false) ||
      this.validateNotesEncryptionSalt(false)
    );
  }

  validateForUpdateBeforeEncryption() {
    const validFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "iban",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "cardNumber",
      "expiryDate",
      "cardCVVCVC",
      "cardType",
    ];
    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "BANK_VALIDATION_001";
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

  validateForUpdateAfterEncryption() {
    const validFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "encryptedIban",
      "ibanEncryptionIv",
      "ibanTypeEncryptionSalt",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "encryptedCardNumber",
      "cardNumberEncryptionIv",
      "cardNumberEncryptionSalt",
      "expiryDate",
      "encryptedCardCVVCVC",
      "cardCVVCVCEncryptionIv",
      "cardCVVCVCEncryptionSalt",
      "cardType",
    ];
    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "BANK_VALIDATION_001";
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

  validateCompanyName(isRequired) {
    return null;
  }
  validateFirstName(isRequired) {
    return null;
  }
  validateLastName(isRequired) {
    return null;
  }
  validateStreetAddress(isRequired) {
    return null;
  }
  validateAdditionalAddressInfo(isRequired) {
    return null;
  }
  validateCity(isRequired) {
    return null;
  }
  validateStateProvinceRegion(isRequired) {
    return null;
  }
  validatePostalCode(isRequired) {
    return null;
  }
  validateCountry(isRequired) {
    return null;
  }
  validatePhoneNumber(isRequired) {
    return null;
  }
  validateEmail(isRequired) {
    return null;
  }
  validateBirthDate(isRequired) {
    return null;
  }

  validateAccountName(isRequired) {
    if (isRequired && !this.bankName) return "BANK_VALIDATION_003";
    if (this.bankName && typeof this.bankName !== "string")
      return "BANK_VALIDATION_004";
    if (this.bankName && !/^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/.test(this.bankName)) {
      return "BANK_VALIDATION_005";
    }
    if (
      this.bankName &&
      (this.bankName.length < 3 || this.bankName.length > 20)
    )
      return "BANK_VALIDATION_006";

    return null;
  }

  validateUsername(isRequired) {
    if (isRequired && !this.username) return "BANK_VALIDATION_010";
    if (this.username && typeof this.username !== "string")
      return "BANK_VALIDATION_011";
    if (this.username && !/^[a-zA-Z0-9]*$/.test(this.username))
      return "BANK_VALIDATION_012";
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    )
      return "BANK_VALIDATION_013";

    return null;
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) return "BANK_VALIDATION_017";
    if (this.password && typeof this.password !== "string")
      return "BANK_VALIDATION_018";

    return null;
  }

  validateNotes(isRequired) {
    if (isRequired && !this.cardType) return "BANK_VALIDATION_019";
    if (this.cardType && typeof this.cardType !== "string")
      return "BANK_VALIDATION_020";
    if (this.cardType && this.cardType.length > 50)
      return "BANK_VALIDATION_021";

    return null;
  }

  validateEncryptedPassword(isRequired) {
    if (isRequired && !this.encryptedPassword) return "BANK_VALIDATION_022";
    if (this.encryptedPassword && typeof this.encryptedPassword !== "string")
      return "BANK_VALIDATION_023";

    return null;
  }

  validatePasswordEncryptionIv(isRequired) {
    if (isRequired && !this.passwordEncryptionIv) return "BANK_VALIDATION_024";
    if (
      this.passwordEncryptionIv &&
      typeof this.passwordEncryptionIv !== "string"
    )
      return "BANK_VALIDATION_025";

    return null;
  }

  validatePasswordEncryptionSalt(isRequired) {
    if (isRequired && !this.passwordEncryptionSalt)
      return "BANK_VALIDATION_026";
    if (
      this.passwordEncryptionSalt &&
      typeof this.passwordEncryptionSalt !== "string"
    )
      return "BANK_VALIDATION_027";

    return null;
  }

  validateEncryptedNotes(isRequired) {
    if (this.encryptedNotes === "") return null;
    if (isRequired && !this.encryptedNotes) return "BANK_VALIDATION_028";
    if (this.cardType && typeof this.encryptedNotes !== "string")
      return "BANK_VALIDATION_029";

    return null;
  }

  validateNotesEncryptionIv(isRequired) {
    if (this.cardTypeEncryptionIv === "") return null;
    if (isRequired && !this.cardTypeEncryptionIv) return "BANK_VALIDATION_030";
    if (
      this.cardTypeEncryptionIv &&
      typeof this.cardTypeEncryptionIv !== "string"
    )
      return "BANK_VALIDATION_031";

    return null;
  }

  validateNotesEncryptionSalt(isRequired) {
    if (this.cardTypeEncryptionSalt === "") return null;
    if (isRequired && !this.cardTypeEncryptionSalt)
      return "BANK_VALIDATION_032";
    if (
      this.cardTypeEncryptionSalt &&
      typeof this.cardTypeEncryptionSalt !== "string"
    )
      return "BANK_VALIDATION_033";

    return null;
  }
}
