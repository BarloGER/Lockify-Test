export class ContactEntity {
  constructor(contactInput) {
    // Assign all transferred values
    Object.entries(contactInput).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter((field) => this[field] !== undefined);
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
      const error = this[validateMethod](true);
      if (error) return error;
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
    if (isRequired && !this.contactName) return "CONTACT_VALIDATION_003";
    if (this.contactName && typeof this.contactName !== "string")
      return "CONTACT_VALIDATION_004";
    if (
      this.contactName &&
      !/^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/.test(this.contactName)
    ) {
      return "CONTACT_VALIDATION_005";
    }
    if (
      this.contactName &&
      (this.contactName.length < 3 || this.contactName.length > 20)
    )
      return "CONTACT_VALIDATION_006";

    return null;
  }

  validateUsername(isRequired) {
    if (isRequired && !this.username) return "CONTACT_VALIDATION_010";
    if (this.username && typeof this.username !== "string")
      return "CONTACT_VALIDATION_011";
    if (this.username && !/^[a-zA-Z0-9]*$/.test(this.username))
      return "CONTACT_VALIDATION_012";
    if (
      this.username &&
      (this.username.length < 3 || this.username.length > 20)
    )
      return "CONTACT_VALIDATION_013";

    return null;
  }

  validateEmail(isRequired) {
    if (isRequired && !this.email) return "CONTACT_VALIDATION_014";
    if (this.email && typeof this.email !== "string")
      return "CONTACT_VALIDATION_015";
    if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      return "CONTACT_VALIDATION_016";

    return null;
  }

  validatePassword(isRequired) {
    if (isRequired && !this.password) return "CONTACT_VALIDATION_017";
    if (this.password && typeof this.password !== "string")
      return "CONTACT_VALIDATION_018";

    return null;
  }

  validateNotes(isRequired) {
    if (isRequired && !this.notes) return "CONTACT_VALIDATION_019";
    if (this.notes && typeof this.notes !== "string")
      return "CONTACT_VALIDATION_020";
    if (this.notes && this.notes.length > 50) return "CONTACT_VALIDATION_021";

    return null;
  }

  validateEncryptedPassword(isRequired) {
    if (isRequired && !this.encryptedPassword) return "CONTACT_VALIDATION_022";
    if (this.encryptedPassword && typeof this.encryptedPassword !== "string")
      return "CONTACT_VALIDATION_023";

    return null;
  }

  validatePasswordEncryptionIv(isRequired) {
    if (isRequired && !this.passwordEncryptionIv)
      return "CONTACT_VALIDATION_024";
    if (
      this.passwordEncryptionIv &&
      typeof this.passwordEncryptionIv !== "string"
    )
      return "CONTACT_VALIDATION_025";

    return null;
  }

  validatePasswordEncryptionSalt(isRequired) {
    if (isRequired && !this.passwordEncryptionSalt)
      return "CONTACT_VALIDATION_026";
    if (
      this.passwordEncryptionSalt &&
      typeof this.passwordEncryptionSalt !== "string"
    )
      return "CONTACT_VALIDATION_027";

    return null;
  }

  validateEncryptedNotes(isRequired) {
    if (this.encryptedNotes === "") return null;
    if (isRequired && !this.encryptedNotes) return "CONTACT_VALIDATION_028";
    if (this.notes && typeof this.encryptedNotes !== "string")
      return "CONTACT_VALIDATION_029";

    return null;
  }

  validateNotesEncryptionIv(isRequired) {
    if (this.notesEncryptionIv === "") return null;
    if (isRequired && !this.notesEncryptionIv) return "CONTACT_VALIDATION_030";
    if (this.notesEncryptionIv && typeof this.notesEncryptionIv !== "string")
      return "CONTACT_VALIDATION_031";

    return null;
  }

  validateNotesEncryptionSalt(isRequired) {
    if (this.notesEncryptionSalt === "") return null;
    if (isRequired && !this.notesEncryptionSalt)
      return "CONTACT_VALIDATION_032";
    if (
      this.notesEncryptionSalt &&
      typeof this.notesEncryptionSalt !== "string"
    )
      return "CONTACT_VALIDATION_033";

    return null;
  }
}
