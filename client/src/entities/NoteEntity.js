export class NoteEntity {
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

  validateForCreationBeforeEncryption() {
    const validFields = ["noteTitle", "noteContent"];

    const result = this.validateValidFields(validFields);
    if (result) return result;

    return this.validateNoteTitle(true) || this.validateNoteContent(true);
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
      const error = this[validateMethod](true);
      if (error) return error;
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
      const error = this[validateMethod](true);
      if (error) return error;
    }

    return null;
  }

  validateNoteTitle(isRequired) {
    if (isRequired && !this.noteTitle) return "NOTE_VALIDATION_003";
    if (this.noteTitle && typeof this.noteTitle !== "string")
      return "NOTE_VALIDATION_004";
    if (
      this.noteTitle &&
      !/^[a-zA-ZäöüÄÖÜß0-9.,#_\-\s]*$/.test(this.noteTitle)
    ) {
      return "NOTE_VALIDATION_005";
    }
    if (
      this.noteTitle &&
      (this.noteTitle.length < 3 || this.noteTitle.length > 20)
    )
      return "NOTE_VALIDATION_006";

    return null;
  }

  validateNoteContent(isRequired) {
    if (isRequired && !this.noteContent) return "NOTE_VALIDATION_019";
    if (this.noteContent && typeof this.noteContent !== "string")
      return "NOTE_VALIDATION_020";
    if (this.noteContent && this.noteContent.length > 50)
      return "NOTE_VALIDATION_021";

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
}
