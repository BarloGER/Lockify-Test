export class ContactEntity {
  constructor(userInput) {
    const allowedFields = [
      "companyName",
      "firstName",
      "lastName",
      "streetAddress",
      "additionalAddressInfo",
      "city",
      "stateProvinceRegion",
      "postalCode",
      "country",
      "phoneNumber",
      "email",
      "birthDate",
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
      return "CONTACT_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "CONTACT_VALIDATION_002";
    }

    return null;
  }

  validateForCreationBeforeEncryption() {
    const validFields = [
      "companyName",
      "firstName",
      "lastName",
      "streetAddress",
      "additionalAddressInfo",
      "city",
      "stateProvinceRegion",
      "postalCode",
      "country",
      "phoneNumber",
      "email",
      "birthDate",
      "notes",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

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
      "companyName",
      "firstName",
      "lastName",
      "streetAddress",
      "additionalAddressInfo",
      "city",
      "stateProvinceRegion",
      "postalCode",
      "country",
      "phoneNumber",
      "email",
      "birthDate",
      "encryptedNotes",
      "notesEncryptionIv",
      "notesEncryptionSalt",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

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
      "companyName",
      "firstName",
      "lastName",
      "streetAddress",
      "additionalAddressInfo",
      "city",
      "stateProvinceRegion",
      "postalCode",
      "country",
      "phoneNumber",
      "email",
      "birthDate",
      "notes",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "CONTACT_VALIDATION_001";
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
      "companyName",
      "firstName",
      "lastName",
      "streetAddress",
      "additionalAddressInfo",
      "city",
      "stateProvinceRegion",
      "postalCode",
      "country",
      "phoneNumber",
      "email",
      "birthDate",
      "encryptedNotes",
      "notesEncryptionIv",
      "notesEncryptionSalt",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "CONTACT_VALIDATION_001";
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

  validateCompanyName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/;

    if (isRequired && !this.companyName) return "CONTACT_VALIDATION_003";
    if (this.companyName && typeof this.companyName !== "string")
      return "CONTACT_VALIDATION_004";
    if (this.companyName && !regex.test(this.companyName))
      return "CONTACT_VALIDATION_005";
    if (
      this.companyName &&
      (this.companyName.length < 3 || this.companyName.length > 30)
    )
      return "CONTACT_VALIDATION_006";

    return null;
  }

  validateFirstName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.firstName) return "CONTACT_VALIDATION_007";
    if (this.firstName && typeof this.firstName !== "string")
      return "CONTACT_VALIDATION_008";
    if (this.firstName && !regex.test(this.firstName))
      return "CONTACT_VALIDATION_009";
    if (
      this.firstName &&
      (this.firstName.length < 3 || this.firstName.length > 30)
    )
      return "CONTACT_VALIDATION_010";

    return null;
  }
  validateLastName(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.lastName) return "CONTACT_VALIDATION_011";
    if (this.lastName && typeof this.lastName !== "string")
      return "CONTACT_VALIDATION_012";
    if (this.lastName && !regex.test(this.lastName))
      return "CONTACT_VALIDATION_013";
    if (
      this.lastName &&
      (this.lastName.length < 3 || this.lastName.length > 30)
    )
      return "CONTACT_VALIDATION_014";

    return null;
  }
  validateStreetAddress(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.streetAddress) return "CONTACT_VALIDATION_015";
    if (this.streetAddress && typeof this.streetAddress !== "string")
      return "CONTACT_VALIDATION_016";
    if (this.streetAddress && !regex.test(this.streetAddress))
      return "CONTACT_VALIDATION_017";
    if (
      this.streetAddress &&
      (this.streetAddress.length < 3 || this.streetAddress.length > 50)
    )
      return "CONTACT_VALIDATION_018";

    return null;
  }
  validateAdditionalAddressInfo(isRequired) {
    if (isRequired && !this.additionalStreetAddressInfo)
      return "CONTACT_VALIDATION_019";
    if (
      this.additionalStreetAddressInfo &&
      typeof this.additionalStreetAddressInfo !== "string"
    )
      return "CONTACT_VALIDATION_020";
    if (
      this.additionalStreetAddressInfo &&
      (this.additionalStreetAddressInfo.length < 1 ||
        this.additionalStreetAddressInfo.length > 100)
    )
      return "CONTACT_VALIDATION_021";

    return null;
  }
  validateCity(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.city) return "CONTACT_VALIDATION_022";
    if (this.city && typeof this.city !== "string")
      return "CONTACT_VALIDATION_023";
    if (this.city && !regex.test(this.city)) return "CONTACT_VALIDATION_024";
    if (this.city && (this.city.length < 1 || this.city.length > 30))
      return "CONTACT_VALIDATION_025";

    return null;
  }
  validateStateProvinceRegion(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.stateProvinceRegion)
      return "CONTACT_VALIDATION_026";
    if (
      this.stateProvinceRegion &&
      typeof this.stateProvinceRegion !== "string"
    )
      return "CONTACT_VALIDATION_027";
    if (this.stateProvinceRegion && !regex.test(this.stateProvinceRegion))
      return "CONTACT_VALIDATION_028";
    if (
      this.stateProvinceRegion &&
      (this.stateProvinceRegion.length < 1 ||
        this.stateProvinceRegion.length > 30)
    )
      return "CONTACT_VALIDATION_029";

    return null;
  }
  validatePostalCode(isRequired) {
    const regex = /^[0-9]$/;

    if (isRequired && !this.postalCode) return "CONTACT_VALIDATION_030";
    if (this.postalCode && typeof this.postalCode !== "string")
      return "CONTACT_VALIDATION_031";
    if (this.postalCode && !regex.test(this.postalCode))
      return "CONTACT_VALIDATION_032";
    if (
      this.postalCode &&
      (this.postalCode.length < 3 || this.postalCode.length > 10)
    )
      return "CONTACT_VALIDATION_033";

    return null;
  }
  validateCountry(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß-]+(?:\s[a-zA-ZäöüÄÖÜß-]+)*$/;

    if (isRequired && !this.country) return "CONTACT_VALIDATION_034";
    if (this.country && typeof this.country !== "string")
      return "CONTACT_VALIDATION_035";
    if (this.country && !regex.test(this.country))
      return "CONTACT_VALIDATION_036";
    if (this.country && (this.country.length < 1 || this.country.length > 30))
      return "CONTACT_VALIDATION_037";

    return null;
  }
  validatePhoneNumber(isRequired) {
    const regex = /^\+?[0-9\s-]$/;

    if (isRequired && !this.phoneNumber) return "CONTACT_VALIDATION_038";
    if (this.phoneNumber && typeof this.phoneNumber !== "string")
      return "CONTACT_VALIDATION_039";
    if (this.phoneNumber && !regex.test(this.phoneNumber))
      return "CONTACT_VALIDATION_040";
    if (
      this.phoneNumber &&
      (this.phoneNumber.length < 3 || this.phoneNumber.length > 20)
    )
      return "CONTACT_VALIDATION_041";

    return null;
  }
  validateEmail(isRequired) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isRequired && !this.email) return "CONTACT_VALIDATION_042";
    if (this.email && typeof this.email !== "string")
      return "CONTACT_VALIDATION_043";
    if (this.email && !regex.test(this.email)) return "CONTACT_VALIDATION_044";
    if (this.email && (this.email.length < 6 || this.email.length > 254))
      return "CONTACT_VALIDATION_045";

    return null;
  }
  validateBirthDate(isRequired) {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.([0-9]{4})$/;

    if (isRequired && !this.birthDate) return "CONTACT_VALIDATION_046";
    if (this.birthDate && typeof this.birthDate !== "string")
      return "CONTACT_VALIDATION_047";
    if (this.birthDate && !regex.test(this.birthDate))
      return "CONTACT_VALIDATION_048";
    if (this.birthDate && this.birthDate.length !== 10)
      return "CONTACT_VALIDATION_049";

    return null;
  }
  validateNotes(isRequired) {
    if (isRequired && !this.notes) return "CONTACT_VALIDATION_050";
    if (this.notes && typeof this.notes !== "string")
      return "CONTACT_VALIDATION_051";
    if ((this.notes && this.notes.length < 1) || this.notes.length > 100)
      return "CONTACT_VALIDATION_052";

    return null;
  }

  validateEncryptedNotes(isRequired) {
    if (isRequired && !this.encryptedNotes) return "CONTACT_VALIDATION_053";
    if (this.encryptedNotes && typeof this.encryptedNotes !== "string")
      return "CONTACT_VALIDATION_054";
    if (
      (this.encryptedNotes && this.encryptedNotes.length < 1) ||
      this.encryptedNotes.length > 10000
    ) {
      return "CONTACT_VALIDATION_055";
    }

    return null;
  }

  validateNotesEncryptionIv(isRequired) {
    if (isRequired && !this.notesEncryptionIv) return "CONTACT_VALIDATION_056";
    if (this.notesEncryptionIv && typeof this.notesEncryptionIv !== "string")
      return "CONTACT_VALIDATION_057";
    if (
      (this.notesEncryptionIv && this.notesEncryptionIv.length < 1) ||
      this.notesEncryptionIv.length > 254
    ) {
      return "CONTACT_VALIDATION_058";
    }

    return null;
  }

  validateNotesEncryptionSalt(isRequired) {
    if (isRequired && !this.notesEncryptionSalt)
      return "CONTACT_VALIDATION_059";
    if (
      this.notesEncryptionSalt &&
      typeof this.notesEncryptionSalt !== "string"
    )
      return "CONTACT_VALIDATION_060";
    if (
      (this.notesEncryptionSalt && this.notesEncryptionSalt.length < 1) ||
      this.notesEncryptionSalt.length > 254
    ) {
      return "CONTACT_VALIDATION_061";
    }

    return null;
  }
}
