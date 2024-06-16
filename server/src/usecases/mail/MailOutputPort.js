exports.MailOutputPort = class MailOutputPort {
  output(data) {
    this.success = data.success;
    this.message = data.message;

    return {
      success: this.success,
      message: this.message,
    };
  }
};
