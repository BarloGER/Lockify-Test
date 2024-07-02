const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const AccountRepository = class AccountRepository {
  async getAccounts() {
    try {
      const response = await fetch(`${URL}/accounts/get-accounts`, {
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

  async createAccount(userData) {
    try {
      const response = await fetch(`${URL}/accounts/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          accountName: userData.accountName,
          accountUrl: userData.accountUrl,
          username: userData.username,
          email: userData.email,
          encryptedPassword: userData.encryptedPassword,
          passwordEncryptionIv: userData.passwordEncryptionIv,
          passwordEncryptionSalt: userData.passwordEncryptionSalt,
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

  async updateAccount(accountId, updatedData) {
    try {
      const response = await fetch(
        `${URL}/accounts/update-account/${accountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify({
            accountName: updatedData.accountName,
            accountUrl: updatedData.accountUrl,
            username: updatedData.username,
            email: updatedData.email,
            encryptedPassword: updatedData.encryptedPassword,
            passwordEncryptionIv: updatedData.passwordEncryptionIv,
            passwordEncryptionSalt: updatedData.passwordEncryptionSalt,
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

  async deleteAccount(accountId) {
    try {
      const response = await fetch(
        `${URL}/accounts/delete-account/${accountId}`,
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
