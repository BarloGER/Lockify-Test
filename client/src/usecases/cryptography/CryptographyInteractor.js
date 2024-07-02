import { CryptographyInputPort } from "./CryptographyInputPort";
import { CryptographyOutputPort } from "./CryptographyOutputPort";

export class CryptographyInteractor {
  constructor() {
    this.inputPort = new CryptographyInputPort();
    this.outputPort = new CryptographyOutputPort();
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

  async encrypt(text, masterPassword) {
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const enc = new TextEncoder();

      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(masterPassword),
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
        enc.encode(text)
      );

      return {
        iv: this.convertUint8ArrayToHex(iv),
        encryptedData: this.convertUint8ArrayToHex(new Uint8Array(encrypted)),
        salt: this.convertUint8ArrayToHex(salt),
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async decrypt(encryptedData, iv, salt, masterPassword) {
    try {
      const dec = new TextDecoder();
      const enc = new TextEncoder();

      const saltUint8Array = this.convertHexToUint8Array(salt);
      const ivArray = this.convertHexToUint8Array(iv);
      const encryptedArray = this.convertHexToUint8Array(encryptedData);

      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        enc.encode(masterPassword),
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

      return dec.decode(decrypted);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async encryptData(input) {
    const validatedInput = this.inputPort.validateEncryptionInput(input);
    if (validatedInput.validationError) {
      return { validationError: validatedInput.validationError };
    }

    const { text, masterPassword } = validatedInput;
    try {
      const encryptedResult = await this.encrypt(text, masterPassword);
      return this.outputPort.prepareOutput({
        success: true,
        message: "Encryption successful",
        data: encryptedResult,
      });
    } catch (error) {
      return this.outputPort.prepareOutput({
        success: false,
        message: error.message,
      });
    }
  }

  async decryptData(input) {
    const validatedInput = this.inputPort.validateDecryptionInput(input);
    if (validatedInput.validationError) {
      return { validationError: validatedInput.validationError };
    }

    const { encryptedData, iv, salt, masterPassword } = validatedInput;
    try {
      const decryptedText = await this.decrypt(
        encryptedData,
        iv,
        salt,
        masterPassword
      );
      return this.outputPort.prepareOutput({
        success: true,
        message: "Decryption successful",
        data: decryptedText,
      });
    } catch (error) {
      return this.outputPort.prepareOutput({
        success: false,
        message: error.message,
      });
    }
  }
}
