import { UserEntity } from "../../entities/UserEntity";

export class UserInputPort {
  validatePreEncryptionInputForRegisterUser(unvalidatedUserInput) {
    const validUserEntity = new UserEntity(unvalidatedUserInput);

    const validationError =
      validUserEntity.validateForRegistrationBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validUserEntity;
  }

  validateEncryptedDataForRegisterUser(validUserEntity) {
    const validEncryptedUserEntity = new UserEntity(validUserEntity);

    const validationError =
      validEncryptedUserEntity.validateForRegistrationAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedUserEntity;
  }

  validateInputForAuthenticateUser(unvalidatedUserInput) {
    const credentials = new UserEntity(unvalidatedUserInput);

    const validationError = credentials.validateForAuthentication();
    if (validationError) {
      return { validationError };
    }

    return credentials;
  }

  validatePreEncryptionInputForUpdateUser(unvalidatedUserInput) {
    const validUserEntity = new UserEntity(unvalidatedUserInput);

    const validationError = validUserEntity.validateForUpdateBeforeEncryption();
    if (validationError) {
      return { validationError };
    }

    return validUserEntity;
  }

  validateEncryptedDataForUpdateUser(validUserEntity) {
    const validEncryptedUserEntity = new UserEntity(validUserEntity);

    const validationError =
      validEncryptedUserEntity.validateForUpdateAfterEncryption();
    if (validationError) {
      return { validationError };
    }

    return validEncryptedUserEntity;
  }

  validateInputForVerification(unvalidatedUserInput) {
    const verificationData = new UserEntity(unvalidatedUserInput);

    const validationError = verificationData.validateForVerification();
    if (validationError) {
      return { validationError };
    }

    return verificationData;
  }

  validateInputForRequest(unvalidatedUserInput) {
    const requestData = new UserEntity(unvalidatedUserInput);

    const validationError = requestData.validateForRequest();
    if (validationError) {
      return { validationError };
    }

    return requestData;
  }
}
