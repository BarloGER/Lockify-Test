const { NoteEntity } = require("../../entities/NoteEntity");

exports.NoteInputPort = class NoteInputPort {
  createNote(unvalidatedUserInput) {
    const validNoteEntity = new NoteEntity(unvalidatedUserInput);

    const validationError = validNoteEntity.validateForCreation();
    if (validationError) {
      return { validationError };
    }

    return validNoteEntity;
  }

  editNote(unvalidatedUserInput) {
    const validNoteEntity = new NoteEntity(unvalidatedUserInput);

    const validationError = validNoteEntity.validateForUpdate();
    if (validationError) {
      return { validationError };
    }

    return validNoteEntity;
  }

  deleteNote(unvalidatedUserInput) {
    const validNoteEntity = new NoteEntity(unvalidatedUserInput);

    const validationError = validNoteEntity.validateForDelete();
    if (validationError) {
      return { validationError };
    }
  }
};
