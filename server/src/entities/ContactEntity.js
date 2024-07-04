exports.ContactEntity = class ContactEntity {
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

  validateForCreation() {
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

  validateForUpdate() {
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
    const fieldsToUpdate = validFields.filter(
      (field) => this[field] !== undefined
    );
    if (fieldsToUpdate.length === 0) {
      return "CONTACT_VALIDATION_001";
    }

    // Validate each passed field
    for (const field of fieldsToUpdate) {
      const validateMethod = `validate${
        field.charAt(0).toUpperCase() + field.slice(1)
      }`;
      const error = this[validateMethod](true);
      console.log(error);
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
      return "CONTACT_VALIDATION_002";
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

  validateContactName(isRequired) {
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

  validateContactUrl(isRequired) {
    if (isRequired && !this.contactUrl) return "CONTACT_VALIDATION_007";
    if (this.contactUrl && typeof this.contactUrl !== "string")
      return "CONTACT_VALIDATION_008";

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-zA-Z\\d_]*)?$", // fragment locator
      "i"
    );

    if (this.contactUrl && !urlPattern.test(this.contactUrl)) {
      return "CONTACT_VALIDATION_009";
    }

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

  // validateEmail(isRequired) {
  //   if (isRequired && !this.email) return "CONTACT_VALIDATION_014";
  //   if (this.email && typeof this.email !== "string")
  //     return "CONTACT_VALIDATION_015";
  //   if (this.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
  //     return "CONTACT_VALIDATION_016";

  //   return null;
  // }

  validateEncryptedPassword(isRequired) {
    if (isRequired && !this.encryptedPassword) return "CONTACT_VALIDATION_017";
    if (this.encryptedPassword && typeof this.encryptedPassword !== "string")
      return "CONTACT_VALIDATION_018";

    return null;
  }

  validatePasswordEncryptionIv(isRequired) {
    if (isRequired && !this.passwordEncryptionIv)
      return "CONTACT_VALIDATION_019";
    if (
      this.passwordEncryptionIv &&
      typeof this.passwordEncryptionIv !== "string"
    )
      return "CONTACT_VALIDATION_020";

    return null;
  }

  validatePasswordEncryptionSalt(isRequired) {
    if (isRequired && !this.passwordEncryptionSalt)
      return "CONTACT_VALIDATION_021";
    if (
      this.passwordEncryptionSalt &&
      typeof this.passwordEncryptionSalt !== "string"
    )
      return "CONTACT_VALIDATION_022";

    return null;
  }

  validateEncryptedNotes(isRequired) {
    if (this.encryptedNotes === "") return null;
    if (isRequired && !this.encryptedNotes) return "CONTACT_VALIDATION_023";
    if (this.encryptedNotes && typeof this.encryptedNotes !== "string")
      return "CONTACT_VALIDATION_024";

    return null;
  }

  validateNotesEncryptionIv(isRequired) {
    if (this.notesEncryptionIv === "") return null;
    if (isRequired && !this.notesEncryptionIv) return "CONTACT_VALIDATION_025";
    if (this.notesEncryptionIv && typeof this.notesEncryptionIv !== "string")
      return "CONTACT_VALIDATION_026";

    return null;
  }

  validateNotesEncryptionSalt(isRequired) {
    if (this.notesEncryptionSalt === "") return null;
    if (isRequired && !this.notesEncryptionSalt)
      return "CONTACT_VALIDATION_027";
    if (
      this.notesEncryptionSalt &&
      typeof this.notesEncryptionSalt !== "string"
    )
      return "CONTACT_VALIDATION_028";

    return null;
  }
};
