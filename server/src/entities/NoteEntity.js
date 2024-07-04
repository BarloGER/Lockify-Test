exports.NoteEntity = class NoteEntity {
  constructor(noteInput) {
    // Assign all transferred values
    Object.entries(noteInput).forEach(([key, value]) => {
      this[key] = value;
    });
  }

  validateValidFields(validFields) {
    const fields = Object.keys(this);
    const specifiedFields = fields.filter((field) => this[field] !== undefined);
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
    if (isRequired && !this.encryptedNoteTitle) return "NOTE_VALIDATION_022";
    if (this.encryptedNoteTitle && typeof this.encryptedNoteTitle !== "string")
      return "NOTE_VALIDATION_023";

    return null;
  }

  validateNoteTitleEncryptionIv(isRequired) {
    if (isRequired && !this.noteTitleEncryptionIv) return "NOTE_VALIDATION_024";
    if (
      this.noteTitleEncryptionIv &&
      typeof this.noteTitleEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_025";

    return null;
  }

  validateNoteTitleEncryptionSalt(isRequired) {
    if (isRequired && !this.noteTitleEncryptionSalt)
      return "NOTE_VALIDATION_026";
    if (
      this.noteTitleEncryptionSalt &&
      typeof this.noteTitleEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_027";

    return null;
  }

  validateEncryptedNoteContent(isRequired) {
    if (this.encryptedNoteContent === "") return null;
    if (isRequired && !this.encryptedNoteContent) return "NOTE_VALIDATION_028";
    if (this.notes && typeof this.encryptedNoteContent !== "string")
      return "NOTE_VALIDATION_029";

    return null;
  }

  validateNoteContentEncryptionIv(isRequired) {
    if (this.noteContentEncryptionIv === "") return null;
    if (isRequired && !this.noteContentEncryptionIv)
      return "NOTE_VALIDATION_030";
    if (
      this.noteContentEncryptionIv &&
      typeof this.noteContentEncryptionIv !== "string"
    )
      return "NOTE_VALIDATION_031";

    return null;
  }

  validateNoteContentEncryptionSalt(isRequired) {
    if (this.noteContentEncryptionSalt === "") return null;
    if (isRequired && !this.noteContentEncryptionSalt)
      return "NOTE_VALIDATION_032";
    if (
      this.noteContentEncryptionSalt &&
      typeof this.noteContentEncryptionSalt !== "string"
    )
      return "NOTE_VALIDATION_033";

    return null;
  }
};
