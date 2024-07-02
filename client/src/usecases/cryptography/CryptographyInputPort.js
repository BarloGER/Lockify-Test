export class CryptographyInputPort {
  validateEncryptionInput(input) {
    if (!input.text || !input.masterPassword) {
      return { validationError: "Invalid encryption input" };
    }
    return input;
  }

  validateDecryptionInput(input) {
    if (
      !input.encryptedData ||
      !input.iv ||
      !input.salt ||
      !input.masterPassword
    ) {
      return { validationError: "Invalid decryption input" };
    }
    return input;
  }
}
