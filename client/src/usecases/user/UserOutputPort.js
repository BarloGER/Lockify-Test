export class UserOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.user = {};
  }

  prepareOutput(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }

  prepareAuthOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.user = data.user;
    this.statusCode = data.statusCode;
    this.statusMessage = data.statusMessage;
    this.errorType = data.errorType;
    this.errorCode = data.errorCode;
    return {
      success: this.success,
      message: this.message,
      user: this.user,
      statusCode: this.statusCode,
      statusMessage: this.statusMessage,
      errorType: this.errorType,
      errorCode: this.errorCode,
    };
  }

  prepareUserOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.user = data.user;
    return {
      success: this.success,
      message: this.message,
      user: this.user,
    };
  }
}
