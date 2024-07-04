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
          ibanTypeEncryptionSalt: userData.ibanTypeEncryptionSalt,
          swiftBic: userData.swiftBic,
          accountType: userData.accountType,
          branchCode: userData.branchCode,
          cardHolderFirstName: userData.cardHolderFirstName,
          cardHolderLastName: userData.cardHolderLastName,
          encryptedCardNumber: userData.encryptedCardNumber,
          cardNumberEncryptionIv: userData.cardNumberEncryptionIv,
          cardNumberEncryptionSalt: userData.cardNumberEncryptionSalt,
          expiryDate: userData.expiryDate,
          encryptedCardCVVCVC: userData.encryptedCardCVVCVC,
          cardCVVCVCEncryptionIv: userData.cardCVVCVCEncryptionIv,
          cardCVVCVCEncryptionSalt: userData.cardCVVCVCEncryptionSalt,
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
          ibanTypeEncryptionSalt: updatedData.ibanTypeEncryptionSalt,
          swiftBic: updatedData.swiftBic,
          accountType: updatedData.accountType,
          branchCode: updatedData.branchCode,
          cardHolderFirstName: updatedData.cardHolderFirstName,
          cardHolderLastName: updatedData.cardHolderLastName,
          encryptedCardNumber: updatedData.encryptedCardNumber,
          cardNumberEncryptionIv: updatedData.cardNumberEncryptionIv,
          cardNumberEncryptionSalt: updatedData.cardNumberEncryptionSalt,
          expiryDate: updatedData.expiryDate,
          encryptedCardCVVCVC: updatedData.encryptedCardCVVCVC,
          cardCVVCVCEncryptionIv: updatedData.cardCVVCVCEncryptionIv,
          cardCVVCVCEncryptionSalt: updatedData.cardCVVCVCEncryptionSalt,
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
