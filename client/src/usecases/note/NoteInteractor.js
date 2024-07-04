import { NoteInputPort } from "./NoteInputPort";
import { NoteOutputPort } from "./NoteOutputPort";

export class NoteInteractor {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
    this.noteInputPort = new NoteInputPort();
    this.noteOutputPort = new NoteOutputPort();
  }

  async getNotes() {
    const noteRequestResult = await this.noteRepository.getNotes();

    const noteOutputData = {
      success: noteRequestResult.success,
      message: noteRequestResult.message,
      notes: noteRequestResult.notes,
      statusCode: noteRequestResult.statusCode,
      statusMessage: noteRequestResult.statusMessage,
      errorType: noteRequestResult.errorType,
      errorCode: noteRequestResult.errorCode,
    };

    return this.noteOutputPort.prepareNotesOutput(noteOutputData);
  }

  async validateCreateNote(userInput) {
    const note =
      this.noteInputPort.validateCreationInputBeforeEncryption(userInput);
    if (note.validationError) {
      return { validationError: note.validationError };
    }
  }

  async validateEditNote(userInput) {
    const note =
      this.noteInputPort.validateUpdatedInputBeforeEncryption(userInput);
    if (note.validationError) {
      return { validationError: note.validationError };
    }
  }

  async createNote(userInput) {
    const note =
      this.noteInputPort.validateCreationInputAfterEncryption(userInput);
    if (note.validationError) {
      return { validationError: note.validationError };
    }

    const registrationResult = await this.noteRepository.createNote(note);

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      note: registrationResult.note,
    };

    return this.noteOutputPort.prepareSingleNoteOutput(outputData);
  }

  async editNote(noteId, userInput) {
    const note =
      this.noteInputPort.validateUpdatedInputAfterEncryption(userInput);
    if (note.validationError) {
      return { validationError: note.validationError };
    }

    const registrationResult = await this.noteRepository.updateNote(
      noteId,
      note
    );

    const outputData = {
      success: registrationResult.success,
      message: registrationResult.message,
      note: registrationResult.note,
    };

    return this.noteOutputPort.prepareSingleNoteOutput(outputData);
  }

  async deleteNote(noteId) {
    const deletionResult = await this.noteRepository.deleteNote(noteId);

    const outputData = {
      success: deletionResult.success,
      message: deletionResult.message,
    };

    return this.noteOutputPort.prepareOutput(outputData);
  }
}
