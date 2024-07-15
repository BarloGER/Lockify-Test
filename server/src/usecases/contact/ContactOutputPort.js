exports.ContactOutputPort = class ContactOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.account = {};
  }

  formatFoundContacts(foundContacts) {
    return {
      success: true,
      message: {
        EN: "Contacts successfully queried.",
        DE: "Kontakte erfolgreich abgefragt.",
      },
      accounts: foundContacts.dataValues,
    };
  }

  formatCreatedContact(createdContact) {
    return {
      success: true,
      message: {
        EN: "Contact successfuly created.",
        DE: "Kontakt erfolgreich erstellt.",
      },
      account: createdContact.dataValues,
    };
  }

  formatUpdatedContact(updatedContact) {
    return {
      success: true,
      message: {
        EN: "Contact updated successfully.",
        DE: "Kontakt erfolgreich aktualisiert",
      },
      account: updatedContact.dataValues,
    };
  }

  formatDeletedContact() {
    return {
      success: true,
      message: {
        EN: "Contact deleted successfully.",
        DE: "Kontakt erfolgreich gelöscht.",
      },
    };
  }
};
