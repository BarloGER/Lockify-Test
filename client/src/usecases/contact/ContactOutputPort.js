export class ContactOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.contacts = [];
  }

  prepareSingleContactOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.contact = data.contact;
    return {
      success: this.success,
      message: this.message,
      contact: this.contact,
    };
  }

  prepareContactsOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.contacts = data.contacts;
    return {
      success: this.success,
      message: this.message,
      contacts: this.contacts,
    };
  }

  prepareOutput(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
}
