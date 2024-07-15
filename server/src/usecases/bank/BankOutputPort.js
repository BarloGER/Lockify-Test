exports.BankOutputPort = class BankOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.bank = {};
  }

  formatFoundBanks(foundBanks) {
    return {
      success: true,
      message: {
        EN: "Bank accounts successfully queried.",
        DE: "Bankkonten erfolgreich abgefragt.",
      },
      banks: foundBanks.dataValues,
    };
  }

  formatCreatedBank(createdBank) {
    return {
      success: true,
      message: {
        EN: "Bank account successfuly created.",
        DE: "Bankkonto erfolgreich erstellt.",
      },
      bank: createdBank.dataValues,
    };
  }

  formatUpdatedBank(updatedBank) {
    return {
      success: true,
      message: {
        EN: "Bank account updated successfully.",
        DE: "Bankkonto erfolgreich aktualisiert",
      },
      bank: updatedBank.dataValues,
    };
  }

  formatDeletedBank() {
    return {
      success: true,
      message: {
        EN: "Bank account deleted successfully.",
        DE: "Bankkonto erfolgreich gelöscht.",
      },
    };
  }
};
