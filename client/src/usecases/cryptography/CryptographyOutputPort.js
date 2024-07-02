// CryptographyOutputPort.js
export class CryptographyOutputPort {
  prepareOutput(data) {
    return {
      success: data.success,
      message: data.message,
      data: data.data,
    };
  }
}
