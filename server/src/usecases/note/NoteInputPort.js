const { NoteEntity } = require("../../entities/NoteEntity");
const { ErrorResponse } = require("../../utils");

exports.NoteInputPort = class NoteInputPort {
  createNote(userInput) {
    const note = new NoteEntity(userInput, { isNewNote: true });

    const validationError = note.validateForCreation();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return note;
  }

  editNote(userInput) {
    const updateData = new NoteEntity(userInput);

    const validationError = updateData.validateForUpdate();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }

    return updateData;
  }

  deleteNote(userInput) {
    const data = new NoteEntity(userInput);

    const validationError = data.validateForDelete();
    if (validationError) {
      throw new ErrorResponse({ errorCode: `${validationError}` });
    }
  }
};
