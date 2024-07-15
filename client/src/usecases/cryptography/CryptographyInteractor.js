import { CryptographyInputPort } from "./CryptographyInputPort";
import { CryptographyOutputPort } from "./CryptographyOutputPort";

export class CryptographyInteractor {
  constructor() {
    this.cryptographyInputPort = new CryptographyInputPort();
    this.cryptographyOutputPort = new CryptographyOutputPort();
  }

  convertUint8ArrayToHex(u8arr) {
    return Array.from(u8arr)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  convertHexToUint8Array(hexString) {
    let bytes = new Uint8Array(Math.ceil(hexString.length / 2));
    for (let i = 0, j = 0; i < hexString.length; i += 2, j++) {
      bytes[j] = parseInt(hexString.substr(i, 2), 16);
    }
    return bytes;
  }

  async encrypt(validCryptoEntity) {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const enc = new TextEncoder();

      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(validCryptoEntity.masterPassword),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );

      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      const iv = crypto.getRandomValues(new Uint8Array(16));
      const encrypted = await crypto.subtle.encrypt(
        {
          name: "AES-CBC",
          iv,
        },
        key,
        enc.encode(validCryptoEntity.text)
      );

      return {
        success: true,
        encryptedData: this.convertUint8ArrayToHex(new Uint8Array(encrypted)),
        iv: this.convertUint8ArrayToHex(iv),
        salt: this.convertUint8ArrayToHex(salt),
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async decrypt(validCryptoEntity) {
    try {
      const dec = new TextDecoder();
      const enc = new TextEncoder();

      const saltUint8Array = this.convertHexToUint8Array(
        validCryptoEntity.salt
      );
      const ivArray = this.convertHexToUint8Array(validCryptoEntity.iv);
      const encryptedArray = this.convertHexToUint8Array(
        validCryptoEntity.encryptedData
      );

      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(validCryptoEntity.masterPassword),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
      );

      const key = await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: saltUint8Array,
          iterations: 100000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-CBC", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );

      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-CBC",
          iv: ivArray,
        },
        key,
        encryptedArray
      );

      return {
        success: true,
        data: dec.decode(decrypted),
      };
    } catch (error) {
      return "CRYPTOGRAPHY_OPERATION_001";
    }
  }

  async encryptData(unvalidatedEncryptionInput) {
    const validCryptoEntity =
      this.cryptographyInputPort.validateEncryptionInput(
        unvalidatedEncryptionInput
      );
    validCryptoEntity;
    if (validCryptoEntity.validationError) {
      const validationError = validCryptoEntity.validationError;
      return this.cryptographyOutputPort.formatValidationError(validationError);
    }

    const encryptionResult = await this.encrypt(validCryptoEntity);
    if (!encryptionResult.success) {
      const encryptionError = encryptionResult.error;
      return this.cryptographyOutputPort.formatEncryptionError(encryptionError);
    }

    return this.cryptographyOutputPort.formatEncryptedData(encryptionResult);
  }

  async decryptData(unvalidatedDecryptionInput) {
    const validCryptoEntity =
      this.cryptographyInputPort.validateDecryptionInput(
        unvalidatedDecryptionInput
      );
    if (validCryptoEntity.validationError) {
      const validationError = validCryptoEntity.validationError;
      return this.cryptographyOutputPort.formatValidationError(validationError);
    }

    const decryptionResult = await this.decrypt(validCryptoEntity);
    if (!decryptionResult.success) {
      return this.cryptographyOutputPort.formatDecryptionError(
        decryptionResult
      );
    }

    return this.cryptographyOutputPort.formatDecryptedData(decryptionResult);
  }
}
