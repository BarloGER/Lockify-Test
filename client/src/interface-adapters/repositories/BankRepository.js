const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const BankRepository = class BankRepository {
  async getBanksRequest() {
    try {
      const response = await fetch(`${URL}/banks/get-banks`, {
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

  async createBankRequest(validEncryptedBankEntity) {
    try {
      const response = await fetch(`${URL}/banks/create-bank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedBankEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateBankRequest(bankId, validEncryptedBankEntity) {
    try {
      const response = await fetch(`${URL}/banks/update-bank/${bankId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedBankEntity),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteBankRequest(bankId) {
    try {
      const response = await fetch(`${URL}/banks/delete-bank/${bankId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }
};
