export class NoteOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.notes = [];
  }

  formatValidationError(validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  formatFailedRequest(requestError) {
    return {
      success: requestError.success,
      message: requestError.message,
      statusCode: requestError.statusCode,
      statusMessage: requestError.statusMessage,
      errorCode: requestError.errorCode,
      errorType: requestError.errorType,
    };
  }

  formatValidNoteInput(validatedUserInput) {
    return {
      success: true,
      validNoteEntity: {
        noteTitle: validatedUserInput.noteTitle,
        noteContent: validatedUserInput.noteContent,
      },
    };
  }

  formatSingleNote(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      note: successfulResponse.note,
    };
  }

  formatMultipleNotes(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
      notes: successfulResponse.notes,
    };
  }

  formatSuccessfulResponse(successfulResponse) {
    return {
      success: true,
      message: successfulResponse.message,
    };
  }
}
