// CryptographyOutputPort.js
export class CryptographyOutputPort {
  formatValidationError(validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  formatEncryptionError(encryptionError) {
    return {
      success: false,
      message: encryptionError,
    };
  }

  formatEncryptedData(encryptionResult) {
    return {
      success: encryptionResult.success,
      encryptedData: encryptionResult.encryptedData,
      iv: encryptionResult.iv,
      salt: encryptionResult.salt,
    };
  }

  formatDecryptedData(decryptionResult) {
    return {
      success: true,
      data: decryptionResult.data,
    };
  }

  formatDecryptionError(decryptionError) {
    return {
      success: false,
      message: decryptionError,
    };
  }
}
