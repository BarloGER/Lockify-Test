const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const AccountRepository = class AccountRepository {
  async getAccountsRequest() {
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

  async createAccountRequest(validEncryptedAccountEntity) {
    try {
      const response = await fetch(`${URL}/accounts/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedAccountEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateAccountRequest(accountId, validEncryptedAccountEntity) {
    try {
      const response = await fetch(
        `${URL}/accounts/update-account/${accountId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify(validEncryptedAccountEntity),
          credentials: "include",
        }
      );

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteAccountRequest(accountId) {
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
