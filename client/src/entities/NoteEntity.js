export class NoteEntity {
  constructor(userInput) {
    const allowedFields = [
      "noteTitle",
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
      "noteContent",
      "encryptedNoteContent",
      "noteContentEncryptionIv",
      "noteContentEncryptionSalt",
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
      return "NOTE_VALIDATION_001";
    }

    const extraFields = fields.filter((field) => !validFields.includes(field));
    if (extraFields.length > 0) {
      return "NOTE_VALIDATION_002";
    }

    return null;
  }

  validateForCreationBeforeEncryption() {
    const validFields = ["noteTitle", "noteContent"];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return this.validateNoteTitle(true) || this.validateNoteContent(false);
  }

  validateForCreationAfterEncryption() {
    const validFields = [
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
      "encryptedNoteContent",
      "noteContentEncryptionIv",
      "noteContentEncryptionSalt",
    ];

    const validationErrors = this.validateValidFields(validFields);
    if (validationErrors) return validationErrors;

    return (
      this.validateEncryptedNoteTitle(true) ||
      this.validateNoteTitleEncryptionIv(true) ||
      this.validateNoteTitleEncryptionSalt(true) ||
      this.validateEncryptedNoteContent(false) ||
      this.validateNoteContentEncryptionIv(false) ||
      this.validateNoteContentEncryptionSalt(false)
    );
  }

  validateForUpdateBeforeEncryption() {
    const validFields = ["noteTitle", "noteContent"];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "NOTE_VALIDATION_001";
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
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
      "encryptedNoteContent",
      "noteContentEncryptionIv",
      "noteContentEncryptionSalt",
    ];

    const fieldsToUpdate = validFields.filter((field) => this[field] !== "");
    if (fieldsToUpdate.length === 0) {
      return "NOTE_VALIDATION_001";
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

  validateNoteTitle(isRequired) {
    const regex = /^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/;

    if (isRequired && !this.noteTitle) return "NOTE_VALIDATION_003";
    if (this.noteTitle && typeof this.noteTitle !== "string")
      return "NOTE_VALIDATION_004";
    if (this.noteTitle && !regex.test(this.noteTitle))
      return "NOTE_VALIDATION_005";
    if (
      this.noteTitle &&
      (this.noteTitle.length < 3 || this.noteTitle.length > 50)
    )
      return "NOTE_VALIDATION_006";

    return null;
  }

  validateEncryptedNoteTitle(isRequired) {
    if (isRequired && !this.encryptedNoteTitle) return "NOTE_VALIDATION_007";
    if (this.encryptedNoteTitle && typeof this.encryptedNoteTitle !== "string")
      return "NOTE_VALIDATION_008";
    if (
      (this.encryptedNoteTitle && this.encryptedNoteTitle.length < 1) ||
      this.encryptedNoteTitle.length > 10000
    ) {
      return "NOTE_VALIDATION_009";
    }

    return null;
  }

  validateNoteTitleEncryptionIv(isRequired) {
    if (isRequired && !this.noteTitleEncryptionIv) return "NOTE_VALIDATION_010";
    if (
      this.noteTitleEncryptionIv &&
      typeof this.noteTitleEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_011";
    if (
      (this.noteTitleEncryptionIv && this.noteTitleEncryptionIv.length < 1) ||
      this.noteTitleEncryptionIv.length > 254
    ) {
      return "NOTE_VALIDATION_012";
    }

    return null;
  }

  validateNoteTitleEncryptionSalt(isRequired) {
    if (isRequired && !this.noteTitleEncryptionSalt)
      return "NOTE_VALIDATION_013";
    if (
      this.noteTitleEncryptionSalt &&
      typeof this.noteTitleEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_014";
    if (
      (this.noteTitleEncryptionSalt &&
        this.noteTitleEncryptionSalt.length < 1) ||
      this.noteTitleEncryptionSalt.length > 254
    ) {
      return "NOTE_VALIDATION_015";
    }

    return null;
  }

  validateNoteContent(isRequired) {
    if (isRequired && !this.noteContent) return "NOTE_VALIDATION_016";
    if (this.noteContent && typeof this.noteContent !== "string")
      return "NOTE_VALIDATION_017";
    if (this.noteContent && this.noteContent.length > 1000)
      return "NOTE_VALIDATION_018";

    return null;
  }

  validateEncryptedNoteContent(isRequired) {
    if (isRequired && !this.encryptedNoteContent) return "NOTE_VALIDATION_019";
    if (
      this.encryptedNoteContent &&
      typeof this.encryptedNoteContent !== "string"
    )
      return "NOTE_VALIDATION_020";
    if (
      (this.encryptedNoteContent && this.encryptedNoteContent.length < 1) ||
      this.encryptedNoteContent.length > 10000
    ) {
      return "NOTE_VALIDATION_021";
    }

    return null;
  }

  validateNoteContentEncryptionIv(isRequired) {
    if (isRequired && !this.noteContentEncryptionIv)
      return "NOTE_VALIDATION_022";
    if (
      this.noteContentEncryptionIv &&
      typeof this.noteContentEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_023";
    if (
      (this.noteContentEncryptionIv &&
        this.noteContentEncryptionIv.length < 1) ||
      this.noteContentEncryptionIv.length > 254
    ) {
      return "NOTE_VALIDATION_024";
    }

    return null;
  }

  validateNoteContentEncryptionSalt(isRequired) {
    if (isRequired && !this.noteContentEncryptionSalt)
      return "NOTE_VALIDATION_025";
    if (
      this.noteContentEncryptionSalt &&
      typeof this.noteContentEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_026";
    if (
      (this.noteContentEncryptionSalt &&
        this.noteContentEncryptionSalt.length < 1) ||
      this.noteContentEncryptionSalt.length > 254
    ) {
      return "NOTE_VALIDATION_027";
    }

    return null;
  }
}
