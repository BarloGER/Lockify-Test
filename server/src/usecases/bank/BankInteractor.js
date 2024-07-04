const { BankInputPort } = require("./BankInputPort");
const { BankOutputPort } = require("./BankOutputPort");
const { ErrorResponse } = require("../../utils/ErrorResponse");

exports.BankInteractor = class BankInteractor {
  constructor(bankRepository) {
    this.bankRepository = bankRepository;
    this.bankInputPort = new BankInputPort();
    this.bankOutputPort = new BankOutputPort();
  }

  async getBanks(userId) {
    const foundBanks = await this.bankRepository.findBanksByUserId(userId);
    if (!foundBanks) {
      throw new ErrorResponse({
        errorCode: "CONTACT_NOT_FOUND_002",
      });
    }

    const bankOutputData = {
      success: true,
      message: {
        EN: "Banks successfully queried.",
        DE: "Kontakte erfolgreich abgefragt.",
      },
      banks: foundBanks,
    };

    return this.bankOutputPort.prepareBanksOutput(bankOutputData);
  }

  async createBank(userId, userInput) {
    const bank = this.bankInputPort.createBank(userInput);
    bank.userId = userId;

    const savedBank = await this.bankRepository.createBank(bank);
    if (!savedBank) {
      throw new ErrorResponse({ errorCode: "DB_SERVICE_002" });
    }

    const bankOutputData = {
      success: true,
      message: {
        EN: "Bank successfuly created.",
        DE: "Kontakte erfolgreich erstellt.",
      },
      bank: savedBank,
    };

    return this.bankOutputPort.prepareSingleBankOutput(bankOutputData);
  }

  async updateBank(bankId, userInput) {
    const updateData = this.bankInputPort.editBank(userInput);

    const updatedBank = await this.bankRepository.updateBank(
      bankId,
      updateData
    );
    if (!updatedBank) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const bankOutputData = {
      success: true,
      message: {
        EN: "Bank updated successfully.",
        DE: "Kontakte erfolgreich aktualisiert",
      },
      bank: updateData,
    };

    return this.bankOutputPort.prepareSingleBankOutput(bankOutputData);
  }

  async deleteBank(bankId, userInput) {
    const data = this.bankInputPort.deleteBank(userInput);

    const foundBank = await this.bankRepository.findBankById(bankId);
    if (!foundBank) {
      throw new ErrorResponse({
        errorCode: "CONTACT_NOT_FOUND_002",
      });
    }

    const deletedBank = await this.bankRepository.deleteBank(bankId, data);
    if (!deletedBank) {
      throw new ErrorResponse({
        errorCode: "DB_SERVICE_002",
      });
    }

    const bankOutputData = {
      success: true,
      message: {
        EN: "Bank deleted successfully.",
        DE: "Kontakte erfolgreich gelöscht.",
      },
    };

    return this.bankOutputPort.output(bankOutputData);
  }
};
