exports.NoteOutputPort = class NoteOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.note = {};
  }

  prepareSingleNoteOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.note = data.note;
    return {
      success: this.success,
      message: this.message,
      note: this.note,
    };
  }

  prepareNotesOutput(data) {
    this.success = data.success;
    this.message = data.message;
    this.notes = data.notes;
    return {
      success: this.success,
      message: this.message,
      notes: this.notes,
    };
  }

  output(data) {
    this.success = data.success;
    this.message = data.message;
    return {
      success: this.success,
      message: this.message,
    };
  }
};
