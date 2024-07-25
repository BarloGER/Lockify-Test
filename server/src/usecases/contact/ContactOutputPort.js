exports.ContactOutputPort = class ContactOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.contact = {};
  }

  formatFoundContacts(foundContacts) {
    const contacts = foundContacts.map((contact) => contact.dataValues);

    return {
      success: true,
      message: {
        EN: "Contacts successfully queried.",
        DE: "Kontakte erfolgreich abgefragt.",
      },
      contacts: contacts,
    };
  }

  formatCreatedContact(createdContact) {
    return {
      success: true,
      message: {
        EN: "Contact successfuly created.",
        DE: "Kontakt erfolgreich erstellt.",
      },
      contact: createdContact.dataValues,
    };
  }

  formatUpdatedContact(updatedContact) {
    return {
      success: true,
      message: {
        EN: "Contact updated successfully.",
        DE: "Kontakt erfolgreich aktualisiert",
      },
      contact: updatedContact.dataValues,
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
