exports.NoteOutputPort = class NoteOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.note = {};
  }

  formatFoundNotes(foundNotes) {
    const notes = foundNotes.map((note) => note.dataValues);

    return {
      success: true,
      message: {
        EN: "Notes successfully queried.",
        DE: "Notizen erfolgreich abgefragt.",
      },
      notes: notes,
    };
  }

  formatCreatedNote(createdNote) {
    return {
      success: true,
      message: {
        EN: "Note successfuly created.",
        DE: "Notiz erfolgreich erstellt.",
      },
      note: createdNote.dataValues,
    };
  }

  formatUpdatedNote(updatedNote) {
    return {
      success: true,
      message: {
        EN: "Note updated successfully.",
        DE: "Notiz erfolgreich aktualisiert",
      },
      note: updatedNote.dataValues,
    };
  }

  formatDeletedNote() {
    return {
      success: true,
      message: {
        EN: "Note deleted successfully.",
        DE: "Notiz erfolgreich gelöscht.",
      },
    };
  }
};
