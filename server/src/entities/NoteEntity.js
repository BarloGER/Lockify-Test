exports.NoteEntity = class NoteEntity {
  constructor(noteInput) {
    const allowedFields = [
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
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

  validateForCreation() {
    const validFields = [
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
      "encryptedNoteContent",
      "noteContentEncryptionIv",
      "noteContentEncryptionSalt",
    ];

    const result = this.validateValidFields(validFields);
    if (result) return result;

    return (
      this.validateEncryptedNoteTitle(true) ||
      this.validateNoteTitleEncryptionIv(true) ||
      this.validateNoteTitleEncryptionSalt(true) ||
      this.validateEncryptedNoteContent(true) ||
      this.validateNoteContentEncryptionIv(true) ||
      this.validateNoteContentEncryptionSalt(true)
    );
  }

  validateForUpdate() {
    const validFields = [
      "encryptedNoteTitle",
      "noteTitleEncryptionIv",
      "noteTitleEncryptionSalt",
      "encryptedNoteContent",
      "noteContentEncryptionIv",
      "noteContentEncryptionSalt",
    ];
    const fieldsToUpdate = validFields.filter(
      (field) => this[field] !== undefined
    );
    if (fieldsToUpdate.length === 0) {
      return "NOTE_VALIDATION_001";
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
      return "NOTE_VALIDATION_002";
    }

    return null;
  }

  validateEncryptedNoteTitle(isRequired) {
    if (isRequired && !this.encryptedNoteTitle) return "NOTE_VALIDATION_003";
    if (this.encryptedNoteTitle && typeof this.encryptedNoteTitle !== "string")
      return "NOTE_VALIDATION_004";
    if (
      (this.encryptedNoteTitle && this.encryptedNoteTitle.length < 1) ||
      this.encryptedNoteTitle.length > 10000
    ) {
      return "NOTE_VALIDATION_005";
    }

    return null;
  }

  validateNoteTitleEncryptionIv(isRequired) {
    if (isRequired && !this.noteTitleEncryptionIv) return "NOTE_VALIDATION_006";
    if (
      this.noteTitleEncryptionIv &&
      typeof this.noteTitleEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_007";
    if (
      (this.noteTitleEncryptionIv && this.noteTitleEncryptionIv.length < 1) ||
      this.noteTitleEncryptionIv.length > 254
    ) {
      return "NOTE_VALIDATION_008";
    }

    return null;
  }

  validateNoteTitleEncryptionSalt(isRequired) {
    if (isRequired && !this.noteTitleEncryptionSalt)
      return "NOTE_VALIDATION_009";
    if (
      this.noteTitleEncryptionSalt &&
      typeof this.noteTitleEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_010";
    if (
      (this.noteTitleEncryptionSalt &&
        this.noteTitleEncryptionSalt.length < 1) ||
      this.noteTitleEncryptionSalt.length > 254
    ) {
      return "NOTE_VALIDATION_011";
    }

    return null;
  }

  validateEncryptedNoteContent(isRequired) {
    if (isRequired && !this.encryptedNoteContent) return "NOTE_VALIDATION_012";
    if (
      this.encryptedNoteContent &&
      typeof this.encryptedNoteContent !== "string"
    )
      return "NOTE_VALIDATION_013";
    if (
      (this.encryptedNoteContent && this.encryptedNoteContent.length < 1) ||
      this.encryptedNoteContent.length > 10000
    ) {
      return "NOTE_VALIDATION_014";
    }

    return null;
  }

  validateNoteContentEncryptionIv(isRequired) {
    if (isRequired && !this.noteContentEncryptionIv)
      return "NOTE_VALIDATION_015";
    if (
      this.noteContentEncryptionIv &&
      typeof this.noteContentEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_016";
    if (
      (this.noteContentEncryptionIv &&
        this.noteContentEncryptionIv.length < 1) ||
      this.noteContentEncryptionIv.length > 254
    ) {
      return "NOTE_VALIDATION_017";
    }

    return null;
  }

  validateNoteContentEncryptionSalt(isRequired) {
    if (isRequired && !this.noteContentEncryptionSalt)
      return "NOTE_VALIDATION_018";
    if (
      this.noteContentEncryptionSalt &&
      typeof this.noteContentEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_019";
    if (
      (this.noteContentEncryptionSalt &&
        this.noteContentEncryptionSalt.length < 1) ||
      this.noteContentEncryptionSalt.length > 254
    ) {
      return "NOTE_VALIDATION_020";
    }

    return null;
  }
};
