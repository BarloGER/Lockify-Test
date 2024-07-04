import { NoteEntity } from "../../entities/NoteEntity";

export class NoteInputPort {
  validateCreationInputBeforeEncryption(userInput) {
    const note = new NoteEntity(userInput);

    const validationError = note.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return note;
  }

  validateCreationInputAfterEncryption(userInput) {
    const note = new NoteEntity(userInput);

    const validationError = note.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return note;
  }

  validateUpdatedInputBeforeEncryption(userInput) {
    const note = new NoteEntity(userInput);

    const validationError = note.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return note;
  }

  validateUpdatedInputAfterEncryption(userInput) {
    const note = new NoteEntity(userInput);

    const validationError = note.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return note;
  }
}
