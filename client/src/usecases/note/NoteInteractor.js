import { NoteInputPort } from "./NoteInputPort";
import { NoteOutputPort } from "./NoteOutputPort";

export class NoteInteractor {
  constructor(noteRepository) {
    this.noteRepository = noteRepository;
    this.noteInputPort = new NoteInputPort();
    this.noteOutputPort = new NoteOutputPort();
  }

  async getNotes() {
    const getNotesResponse = await this.noteRepository.getNotesRequest();
    if (!getNotesResponse.success) {
      return this.noteOutputPort.formatFailedRequest(getNotesResponse);
    }

    return this.noteOutputPort.formatMultipleNotes(getNotesResponse);
  }

  async validateUserInputForCreateNote(unvalidatedUserInput) {
    const validatedUserInput =
      this.noteInputPort.validatePreEncryptionInputForCreateNote(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      const validationError = validatedUserInput.validationError;
      return this.noteOutputPort.formatValidationError(validationError);
    }

    return this.noteOutputPort.formatValidNoteInput(validatedUserInput);
  }

  async createNote(encryptedNoteData) {
    const validNoteEntity =
      this.noteInputPort.validateEncryptedDataForCreateNote(encryptedNoteData);
    if (validNoteEntity.validationError) {
      return { validationError: validNoteEntity.validationError };
    }

    const creationResponse = await this.noteRepository.createNoteRequest(
      validNoteEntity
    );
    console.log(creationResponse);
    if (!creationResponse.success) {
      return this.noteOutputPort.formatFailedRequest(creationResponse);
    }

    return this.noteOutputPort.formatSingleNote(creationResponse);
  }

  async validateUserInputForUpdateNote(unvalidatedUserInput) {
    const validatedUserInput =
      this.noteInputPort.validatePreEncryptionInputForUpdateNote(
        unvalidatedUserInput
      );
    if (validatedUserInput.validationError) {
      return { validationError: validatedUserInput.validationError };
    }

    return this.noteOutputPort.formatValidNoteInput(validatedUserInput);
  }

  async updateNote(noteId, encryptedNoteData) {
    const validNoteEntity =
      this.noteInputPort.validateEncryptedDataForUpdateNote(encryptedNoteData);
    if (validNoteEntity.validationError) {
      return { validationError: validNoteEntity.validationError };
    }

    const updateResponse = await this.noteRepository.updateNoteRequest(
      noteId,
      validNoteEntity
    );
    if (!updateResponse.success) {
      return this.noteOutputPort.formatFailedRequest(updateResponse);
    }

    return this.noteOutputPort.formatSingleNote(updateResponse);
  }

  async deleteNote(noteId) {
    const deletionResponse = await this.noteRepository.deleteNoteRequest(
      noteId
    );
    if (!deletionResponse.success) {
      return this.noteOutputPort.formatFailedRequest(deletionResponse);
    }

    return this.noteOutputPort.formatSuccessfulResponse(deletionResponse);
  }
}
