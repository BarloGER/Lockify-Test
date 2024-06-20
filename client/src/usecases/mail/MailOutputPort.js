export class MailOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
  }

  prepareMailOutput(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
}
