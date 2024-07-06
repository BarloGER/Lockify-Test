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
