const { NoteInputPort } = require("./NoteInputPort");
const { NoteOutputPort } = require("./NoteOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

exports.NoteInteractor = class NoteInteractor {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
    this.noteInputPort = new NoteInputPort();
    this.noteOutputPort = new NoteOutputPort();
  }

  async getNotes(userId) {
    const foundNotes = await this.noteRepository.findNotesByUserId(userId);
    if (!foundNotes) {
      throw new ErrorResponse({
        errorCode: "USER_NOT_FOUND_002",
      });
    }

    return this.noteOutputPort.formatFoundNotes(foundNotes);
  }

  async createNote(userId, unvalidatedUserInput) {
    const validNoteEntity = this.noteInputPort.createNote(unvalidatedUserInput);
    if (validNoteEntity.validationError) {
      const validationError = validNoteEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    validNoteEntity.userId = userId;

    const createdNote = await this.noteRepository.createNote(validNoteEntity);
    if (!createdNote) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    return this.noteOutputPort.formatCreatedNote(createdNote);
  }

  async updateNote(noteId, unvalidatedUserInput) {
    const validNoteEntity = this.noteInputPort.editNote(unvalidatedUserInput);
    if (validNoteEntity.validationError) {
      const validationError = validNoteEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const updatedNote = await this.noteRepository.updateNote(
      noteId,
      validNoteEntity
    );
    if (!updatedNote) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.noteOutputPort.formatUpdatedNote(updatedNote);
  }

  async deleteNote(noteId, unvalidatedUserInput) {
    const validNoteEntity = this.noteInputPort.deleteNote(unvalidatedUserInput);
    if (validNoteEntity.validationError) {
      const validationError = validNoteEntity.validationError;
      throw new ErrorResponse({
        errorCode: `${validationError}`,
      });
    }

    const foundNote = await this.noteRepository.findNoteById(noteId);
    if (!foundNote) {
      throw new ErrorResponse({
        errorCode: "ACCOUNT_NOT_FOUND_002",
      });
    }

    const deletedNote = await this.noteRepository.deleteNote(noteId, data);
    if (!deletedNote) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    return this.noteOutputPort.formatDeletedNote();
  }
};
