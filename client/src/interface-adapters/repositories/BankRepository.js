const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const BankRepository = class BankRepository {
  async getBanks() {
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

  async createBank(userData) {
    try {
      const response = await fetch(`${URL}/banks/create-bank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          bankName: userData.bankName,
          accountHolderFirstName: userData.accountHolderFirstName,
          accountHolderLastName: userData.accountHolderLastName,
          encryptedIban: userData.encryptedIban,
          ibanEncryptionIv: userData.ibanEncryptionIv,
          ibanEncryptionSalt: userData.ibanEncryptionSalt,
          swiftBic: userData.swiftBic,
          accountType: userData.accountType,
          branchCode: userData.branchCode,
          cardHolderFirstName: userData.cardHolderFirstName,
          cardHolderLastName: userData.cardHolderLastName,
          encryptedCardNumber: userData.encryptedCardNumber,
          cardNumberEncryptionIv: userData.cardNumberEncryptionIv,
          cardNumberEncryptionSalt: userData.cardNumberEncryptionSalt,
          expiryDate: userData.expiryDate,
          encryptedCardCvvCvc: userData.encryptedCardCvvCvc,
          cardCvvCvcEncryptionIv: userData.cardCvvCvcEncryptionIv,
          cardCvvCvcEncryptionSalt: userData.cardCvvCvcEncryptionSalt,
          cardType: userData.cardType,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateBank(bankId, updatedData) {
    try {
      const response = await fetch(`${URL}/banks/update-bank/${bankId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          bankName: updatedData.bankName,
          accountHolderFirstName: updatedData.accountHolderFirstName,
          accountHolderLastName: updatedData.accountHolderLastName,
          encryptedIban: updatedData.encryptedIban,
          ibanEncryptionIv: updatedData.ibanEncryptionIv,
          ibanEncryptionSalt: updatedData.ibanEncryptionSalt,
          swiftBic: updatedData.swiftBic,
          accountType: updatedData.accountType,
          branchCode: updatedData.branchCode,
          cardHolderFirstName: updatedData.cardHolderFirstName,
          cardHolderLastName: updatedData.cardHolderLastName,
          encryptedCardNumber: updatedData.encryptedCardNumber,
          cardNumberEncryptionIv: updatedData.cardNumberEncryptionIv,
          cardNumberEncryptionSalt: updatedData.cardNumberEncryptionSalt,
          expiryDate: updatedData.expiryDate,
          encryptedCardCvvCvc: updatedData.encryptedCardCvvCvc,
          cardCvvCvcEncryptionIv: updatedData.cardCvvCvcEncryptionIv,
          cardCvvCvcEncryptionSalt: updatedData.cardCvvCvcEncryptionSalt,
          cardType: updatedData.cardType,
        }),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteBank(bankId) {
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
