const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const ContactRepository = class ContactRepository {
  async getContacts() {
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

  async createContact(userData) {
    try {
      const response = await fetch(`${URL}/contacts/create-contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          companyName: userData.companyName,
          firstName: userData.firstName,
          lastName: userData.lastName,
          streetAddress: userData.streetAddress,
          additionalAddressInfos: userData.additionalAddressInfos,
          city: userData.city,
          stateProvinceRegion: userData.stateProvinceRegion,
          postalCode: userData.postalCode,
          country: userData.country,
          phoneNumber: userData.phoneNumber,
          email: userData.email,
          birthDate: userData.birthDate,
          encryptedNotes: userData.encryptedNotes,
          notesEncryptionIv: userData.notesEncryptionIv,
          notesEncryptionSalt: userData.notesEncryptionSalt,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateContact(contactId, updatedData) {
    try {
      const response = await fetch(
        `${URL}/contacts/update-contact/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify({
            companyName: updatedData.companyName,
            firstName: updatedData.firstName,
            lastName: updatedData.lastName,
            streetAddress: updatedData.streetAddress,
            additionalAddressInfos: updatedData.additionalAddressInfos,
            city: updatedData.city,
            stateProvinceRegion: updatedData.stateProvinceRegion,
            postalCode: updatedData.postalCode,
            country: updatedData.country,
            phoneNumber: updatedData.phoneNumber,
            email: updatedData.email,
            birthDate: updatedData.birthDate,
            encryptedNotes: updatedData.encryptedNotes,
            notesEncryptionIv: updatedData.notesEncryptionIv,
            notesEncryptionSalt: updatedData.notesEncryptionSalt,
          }),
          credentials: "include",
        }
      );

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteContact(contactId) {
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
