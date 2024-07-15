export class MailOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
  }

  formatSuccessfulResponse(successfulResponse) {
    this.success = successfulResponse.success;
    this.message = successfulResponse.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
}
