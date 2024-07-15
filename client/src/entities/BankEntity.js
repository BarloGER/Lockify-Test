export class BankEntity {
  constructor(userInput) {
    const allowedFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "iban",
      "encryptedIban",
      "ibanEncryptionIv",
      "ibanEncryptionSalt",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "cardNumber",
      "encryptedCardNumber",
      "cardNumberEncryptionIv",
      "cardNumberEncryptionSalt",
      "expiryDate",
      "cardCvvCvc",
      "encryptedCardCvvCvc",
      "cardCvvCvcEncryptionIv",
      "cardCvvCvcEncryptionSalt",
      "cardType",
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
      "cardCvvCvc",
      "cardType",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateBankName(false) ||
      this.validateAccountHolderFirstName(false) ||
      this.validateAccountHolderLastName(false) ||
      this.validateIban(false) ||
      this.validateSwiftBic(false) ||
      this.validateAccountType(false) ||
      this.validateBranchCode(false) ||
      this.validateCardHolderFirstName(false) ||
      this.validateCardHolderLastName(false) ||
      this.validateCardNumber(false) ||
      this.validateExpiryDate(false) ||
      this.validateCardCvvCvc(false) ||
      this.validateCardType(false)
    );
  }

  validateForCreationAfterEncryption() {
    const validFields = [
      "bankName",
      "accountHolderFirstName",
      "accountHolderLastName",
      "encryptedIban",
      "ibanEncryptionIv",
      "ibanEncryptionSalt",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "encryptedCardNumber",
      "cardNumberEncryptionIv",
      "cardNumberEncryptionSalt",
      "expiryDate",
      "encryptedCardCvvCvc",
      "cardCvvCvcEncryptionIv",
      "cardCvvCvcEncryptionSalt",
      "cardType",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateBankName(false) ||
      this.validateAccountHolderFirstName(false) ||
      this.validateAccountHolderLastName(false) ||
      this.validateEncryptedIban(false) ||
      this.validateIbanEncryptionIv(false) ||
      this.validateIbanEncryptionSalt(false) ||
      this.validateSwiftBic(false) ||
      this.validateAccountType(false) ||
      this.validateBranchCode(false) ||
      this.validateCardHolderFirstName(false) ||
      this.validateCardHolderLastName(false) ||
      this.validateEncryptedCardNumber(false) ||
      this.validateCardNumberEncryptionIv(false) ||
      this.validateCardNumberEncryptionSalt(false) ||
      this.validateExpiryDate(false) ||
      this.validateEncryptedCardCvvCvc(false) ||
      this.validateCardCvvCvcEncryptionIv(false) ||
      this.validateCardCvvCvcEncryptionSalt(false) ||
      this.validateCardType(false)
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
      "cardCvvCvc",
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
      const validationErrors = this[validateMethod](true);
      if (validationErrors) return validationErrors;
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
      "ibanEncryptionSalt",
      "swiftBic",
      "accountType",
      "branchCode",
      "cardHolderFirstName",
      "cardHolderLastName",
      "encryptedCardNumber",
      "cardNumberEncryptionIv",
      "cardNumberEncryptionSalt",
      "expiryDate",
      "encryptedCardCvvCvc",
      "cardCvvCvcEncryptionIv",
      "cardCvvCvcEncryptionSalt",
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
      const validationErrors = this[validateMethod](true);
      if (validationErrors) return validationErrors;
    }

    return null;
  }

  validateBankName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/;

    if (isRequired && !this.bankName) return "BANK_VALIDATION_003";
    if (this.bankName && typeof this.bankName !== "string")
      return "BANK_VALIDATION_004";
    if (this.bankName && !regex.test(this.bankName))
      return "BANK_VALIDATION_005";
    if (
      this.bankName &&
      (this.bankName.length < 3 || this.bankName.length > 30)
    )
      return "BANK_VALIDATION_006";

    return null;
  }

  validateAccountHolderFirstName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.accountHolderFirstName)
      return "BANK_VALIDATION_007";
    if (
      this.accountHolderFirstName &&
      typeof this.accountHolderFirstName !== "string"
    )
      return "BANK_VALIDATION_008";
    if (this.accountHolderFirstName && !regex.test(this.accountHolderFirstName))
      return "BANK_VALIDATION_009";
    if (
      this.accountHolderFirstName &&
      (this.accountHolderFirstName.length < 3 ||
        this.accountHolderFirstName.length > 30)
    )
      return "BANK_VALIDATION_010";

    return null;
  }
  validateAccountHolderLastName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.accountHolderLastName) return "BANK_VALIDATION_011";
    if (
      this.accountHolderLastName &&
      typeof this.accountHolderLastName !== "string"
    )
      return "BANK_VALIDATION_012";
    if (this.accountHolderLastName && !regex.test(this.accountHolderLastName))
      return "BANK_VALIDATION_013";
    if (
      this.accountHolderLastName &&
      (this.accountHolderLastName.length < 3 ||
        this.accountHolderLastName.length > 30)
    )
      return "BANK_VALIDATION_014";

    return null;
  }
  validateIban(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.iban) return "BANK_VALIDATION_015";
    if (this.iban && typeof this.iban !== "string")
      return "BANK_VALIDATION_016";
    if ((this.iban && this.iban.length < 1) || this.iban.length > 20)
      return "BANK_VALIDATION_017";
    if (this.iban && !regex.test(this.iban)) return "BANK_VALIDATION_018";

    return null;
  }
  validateEncryptedIban(isRequired) {
    if (isRequired && !this.encryptedIban) return "BANK_VALIDATION_019";
    if (this.encryptedIban && typeof this.encryptedIban !== "string")
      return "BANK_VALIDATION_020";
    if (
      (this.encryptedIban && this.encryptedIban.length < 1) ||
      this.encryptedIban.length > 10000
    ) {
      return "BANK_VALIDATION_021";
    }

    return null;
  }
  validateIbanEncryptionIv(isRequired) {
    if (isRequired && !this.ibanEncryptionIv) return "BANK_VALIDATION_022";
    if (this.ibanEncryptionIv && typeof this.ibanEncryptionIv !== "string")
      return "BANK_VALIDATION_023";
    if (
      (this.ibanEncryptionIv && this.ibanEncryptionIv.length < 1) ||
      this.ibanEncryptionIv.length > 254
    ) {
      return "BANK_VALIDATION_024";
    }

    return null;
  }
  validateIbanEncryptionSalt(isRequired) {
    if (isRequired && !this.ibanEncryptionSalt) return "BANK_VALIDATION_025";
    if (this.ibanEncryptionSalt && typeof this.ibanEncryptionSalt !== "string")
      return "BANK_VALIDATION_026";
    if (
      (this.ibanEncryptionSalt && this.ibanEncryptionSalt.length < 1) ||
      this.ibanEncryptionSalt.length > 254
    ) {
      return "BANK_VALIDATION_027";
    }

    return null;
  }
  validateSwiftBic(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.swiftBic) return "BANK_VALIDATION_028";
    if (this.swiftBic && typeof this.swiftBic !== "string")
      return "BANK_VALIDATION_029";
    if (
      (this.swiftBic && this.swiftBic.length < 1) ||
      this.swiftBic.length > 20
    )
      return "BANK_VALIDATION_030";
    if (this.swiftBic && !regex.test(this.swiftBic))
      return "BANK_VALIDATION_031";

    return null;
  }
  validateAccountType(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/;

    if (isRequired && !this.accountType) return "BANK_VALIDATION_032";
    if (this.accountType && typeof this.accountType !== "string")
      return "BANK_VALIDATION_033";
    if (this.accountType && !regex.test(this.accountType))
      return "BANK_VALIDATION_034";
    if (
      this.accountType &&
      (this.accountType.length < 3 || this.accountType.length > 30)
    )
      return "BANK_VALIDATION_035";

    return null;
  }
  validateBranchCode(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.branchCode) return "BANK_VALIDATION_036";
    if (this.branchCode && typeof this.branchCode !== "string")
      return "BANK_VALIDATION_037";
    if (
      (this.branchCode && this.branchCode.length < 1) ||
      this.branchCode.length > 20
    )
      return "BANK_VALIDATION_038";
    if (this.branchCode && !regex.test(this.branchCode))
      return "BANK_VALIDATION_039";

    return null;
  }
  validateCardHolderFirstName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.cardHolderFirstName) return "BANK_VALIDATION_040";
    if (
      this.cardHolderFirstName &&
      typeof this.cardHolderFirstName !== "string"
    )
      return "BANK_VALIDATION_041";
    if (this.cardHolderFirstName && !regex.test(this.cardHolderFirstName))
      return "BANK_VALIDATION_042";
    if (
      this.cardHolderFirstName &&
      (this.cardHolderFirstName.length < 3 ||
        this.cardHolderFirstName.length > 30)
    )
      return "BANK_VALIDATION_043";

    return null;
  }
  validateCardHolderLastName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.cardHolderLastName) return "BANK_VALIDATION_044";
    if (this.cardHolderLastName && typeof this.cardHolderLastName !== "string")
      return "BANK_VALIDATION_045";
    if (this.cardHolderLastName && !regex.test(this.cardHolderLastName))
      return "BANK_VALIDATION_046";
    if (
      this.cardHolderLastName &&
      (this.cardHolderLastName.length < 3 ||
        this.cardHolderLastName.length > 30)
    )
      return "BANK_VALIDATION_047";

    return null;
  }
  validateCardNumber(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.cardNumber) return "BANK_VALIDATION_048";
    if (this.cardNumber && typeof this.cardNumber !== "string")
      return "BANK_VALIDATION_049";
    if (
      (this.cardNumber && this.cardNumber.length < 1) ||
      this.cardNumber.length > 20
    )
      return "BANK_VALIDATION_050";
    if (this.cardNumber && !regex.test(this.cardNumber))
      return "BANK_VALIDATION_051";

    return null;
  }
  validateEncryptedCardNumber(isRequired) {
    if (isRequired && !this.encryptedCardNumber) return "BANK_VALIDATION_052";
    if (
      this.encryptedCardNumber &&
      typeof this.encryptedCardNumber !== "string"
    )
      return "BANK_VALIDATION_053";
    if (
      (this.encryptedCardNumber && this.encryptedCardNumber.length < 1) ||
      this.encryptedCardNumber.length > 10000
    ) {
      return "BANK_VALIDATION_054";
    }

    return null;
  }
  validateCardNumberEncryptionIv(isRequired) {
    if (isRequired && !this.cardNumberEncryptionIv)
      return "BANK_VALIDATION_055";
    if (
      this.cardNumberEncryptionIv &&
      typeof this.cardNumberEncryptionIv !== "string"
    )
      return "BANK_VALIDATION_056";
    if (
      (this.cardNumberEncryptionIv && this.cardNumberEncryptionIv.length < 1) ||
      this.cardNumberEncryptionIv.length > 254
    ) {
      return "BANK_VALIDATION_057";
    }

    return null;
  }
  validateCardNumberEncryptionSalt(isRequired) {
    if (isRequired && !this.cardNumberEncryptionSalt)
      return "BANK_VALIDATION_058";
    if (
      this.cardNumberEncryptionSalt &&
      typeof this.cardNumberEncryptionSalt !== "string"
    )
      return "BANK_VALIDATION_059";
    if (
      (this.cardNumberEncryptionSalt &&
        this.cardNumberEncryptionSalt.length < 1) ||
      this.cardNumberEncryptionSalt.length > 254
    ) {
      return "BANK_VALIDATION_060";
    }

    return null;
  }
  validateExpiryDate(isRequired) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.([0-9]{4})$/;

    if (isRequired && !this.expiryDate) return "BANK_VALIDATION_061";
    if (this.expiryDate && typeof this.expiryDate !== "string")
      return "BANK_VALIDATION_062";
    if (this.expiryDate && !regex.test(this.expiryDate))
      return "BANK_VALIDATION_063";
    if (this.expiryDate && this.expiryDate.length !== 5)
      return "BANK_VALIDATION_064";

    return null;
  }
  validateCardCvvCvc(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.cardCvvCvc) return "BANK_VALIDATION_065";
    if (this.cardCvvCvc && typeof this.cardCvvCvc !== "string")
      return "BANK_VALIDATION_066";
    if (
      (this.cardCvvCvc && this.cardCvvCvc.length < 1) ||
      this.cardCvvCvc.length > 20
    )
      return "BANK_VALIDATION_067";
    if (this.cardCvvCvc && !regex.test(this.cardCvvCvc))
      return "BANK_VALIDATION_068";

    return null;
  }
  validateEncryptedCardCvvCvc(isRequired) {
    if (isRequired && !this.encryptedCardCvvCvc) return "BANK_VALIDATION_069";
    if (
      this.encryptedCardCvvCvc &&
      typeof this.encryptedCardCvvCvc !== "string"
    )
      return "BANK_VALIDATION_070";
    if (
      (this.encryptedCardCvvCvc && this.encryptedCardCvvCvc.length < 1) ||
      this.encryptedCardCvvCvc.length > 10000
    ) {
      return "BANK_VALIDATION_071";
    }

    return null;
  }
  validateCardCvvCvcEncryptionIv(isRequired) {
    if (isRequired && !this.cardCvvCvcEncryptionIv)
      return "BANK_VALIDATION_072";
    if (
      this.cardCvvCvcEncryptionIv &&
      typeof this.cardCvvCvcEncryptionIv !== "string"
    )
      return "BANK_VALIDATION_073";
    if (
      (this.cardCvvCvcEncryptionIv && this.cardCvvCvcEncryptionIv.length < 1) ||
      this.cardCvvCvcEncryptionIv.length > 254
    ) {
      return "BANK_VALIDATION_074";
    }

    return null;
  }
  validateCardCvvCvcEncryptionSalt(isRequired) {
    if (isRequired && !this.cardCvvCvcEncryptionSalt)
      return "BANK_VALIDATION_075";
    if (
      this.cardCvvCvcEncryptionSalt &&
      typeof this.cardCvvCvcEncryptionSalt !== "string"
    )
      return "BANK_VALIDATION_076";
    if (
      (this.cardCvvCvcEncryptionSalt &&
        this.cardCvvCvcEncryptionSalt.length < 1) ||
      this.cardCvvCvcEncryptionSalt.length > 254
    ) {
      return "BANK_VALIDATION_077";
    }

    return null;
  }
  validateCardType(isRequired) {
    const regex = /^[a-zA-Z0-9]*$/;

    if (isRequired && !this.cardType) return "BANK_VALIDATION_078";
    if (this.cardType && typeof this.cardType !== "string")
      return "BANK_VALIDATION_079";
    if (
      (this.cardType && this.cardType.length < 1) ||
      this.cardType.length > 20
    )
      return "BANK_VALIDATION_080";
    if (this.cardType && !regex.test(this.cardType))
      return "BANK_VALIDATION_081";

    return null;
  }
}
