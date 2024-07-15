import { CryptoEntity } from "../../entities/CryptoEntity";

export class CryptographyInputPort {
  validateEncryptionInput(unvalidatedEncryptionInput) {
    const cryptoEntity = new CryptoEntity(unvalidatedEncryptionInput);

    const validationError = cryptoEntity.validateForEncryption();
    if (validationError) {
      return { validationError };
    }

    return cryptoEntity;
  }

  validateDecryptionInput(unvalidatedDecryptionInput) {
    const cryptoEntity = new CryptoEntity(unvalidatedDecryptionInput);

    const validationError = cryptoEntity.validateForDecryption();
    if (validationError) {
      return { validationError };
    }

    return cryptoEntity;
  }
}
