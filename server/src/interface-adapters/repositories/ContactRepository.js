const { Contact } = require("../models");

exports.ContactRepository = class ContactRepository {
  async findContactById(contactId) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return null;
    }

    return contact;
  }

  async findContactsByUserId(userId) {
    return await Contact.findAll({
      where: { userId },
    });
  }

  async createContact(contactData) {
    const newContact = await Contact.create(contactData);
    return newContact;
  }

  async updateContact(contactId, updateData) {
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        contact[key] = updateData[key];
      }
    });

    const savedContact = await contact.save();
    return savedContact;
  }

  async deleteContact(contactId) {
    const result = await Contact.destroy({ where: { contactId } });
    return result > 0;
  }
};
