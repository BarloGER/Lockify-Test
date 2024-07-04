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

    const noteOutputData = {
      success: true,
      message: {
        EN: "Notes successfully queried.",
        DE: "Notitzen erfolgreich abgefragt.",
      },
      notes: foundNotes,
    };

    return this.noteOutputPort.prepareNotesOutput(noteOutputData);
  }

  async createNote(userId, userInput) {
    const note = this.noteInputPort.createNote(userInput);
    note.userId = userId;

    const savedNote = await this.noteRepository.createNote(note);
    if (!savedNote) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    const noteOutputData = {
      success: true,
      message: {
        EN: "Note successfuly created.",
        DE: "Notiz erfolgreich erstellt.",
      },
      note: savedNote,
    };

    return this.noteOutputPort.prepareSingleNoteOutput(noteOutputData);
  }

  async updateNote(noteId, userInput) {
    const updateData = this.noteInputPort.editNote(userInput);

    const updatedNote = await this.noteRepository.updateNote(
      noteId,
      updateData
    );
    if (!updatedNote) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const noteOutputData = {
      success: true,
      message: {
        EN: "Note updated successfully.",
        DE: "Notiz erfolgreich aktualisiert",
      },
      note: updateData,
    };

    return this.noteOutputPort.prepareSingleNoteOutput(noteOutputData);
  }

  async deleteNote(noteId, userInput) {
    const data = this.noteInputPort.deleteNote(userInput);

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

    const noteOutputData = {
      success: true,
      message: {
        EN: "Note deleted successfully.",
        DE: "Notiz erfolgreich gelöscht.",
      },
    };

    return this.noteOutputPort.output(noteOutputData);
  }
};
