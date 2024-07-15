import { NoteEntity } from "../../entities/NoteEntity";

export class NoteInputPort {
  validatePreEncryptionInputForCreateNote(unvalidatedUserInput) {
    const validNoteEntity = new NoteEntity(unvalidatedUserInput);

    const validationError =
      validNoteEntity.validateForCreationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validNoteEntity;
  }

  validateEncryptedDataForCreateNote(validNoteEntity) {
    const validEncryptedNoteEntity = new NoteEntity(validNoteEntity);

    const validationError =
      validEncryptedNoteEntity.validateForCreationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedNoteEntity;
  }

  validatePreEncryptionInputForUpdateNote(unvalidatedUserInput) {
    const validNoteEntity = new NoteEntity(unvalidatedUserInput);

    const validationError = validNoteEntity.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validNoteEntity;
  }

  validateEncryptedDataForUpdateNote(validNoteEntity) {
    const validEncryptedNoteEntity = new NoteEntity(validNoteEntity);

    const validationError =
      validEncryptedNoteEntity.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedNoteEntity;
  }
}
