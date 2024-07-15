const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const ContactRepository = class ContactRepository {
  async getContactsRequest() {
    try {
      const response = await fetch(`${URL}/contacts/get-contacts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  async createContactRequest(validEncryptedContactEntity) {
    try {
      const response = await fetch(`${URL}/contacts/create-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedContactEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateContactRequest(contactId, validEncryptedContactEntity) {
    try {
      const response = await fetch(
        `${URL}/contacts/update-contact/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify(validEncryptedContactEntity),
          credentials: "include",
        }
      );

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteContactRequest(contactId) {
    try {
      const response = await fetch(
        `${URL}/contacts/delete-contact/${contactId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          credentials: "include",
        }
      );

      return response.json();
    } catch (error) {
      return error;
    }
  }
};
