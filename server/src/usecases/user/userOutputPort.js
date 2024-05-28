exports.UserOutputPort = class UserOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.userId = null;
  }

  output(data) {
    this.success = data.success;
    this.message = data.message;
    this.userId = data.userId;
    return {
      success: this.success,
      message: this.message,
      userId: this.userId,
    };
  }
};
