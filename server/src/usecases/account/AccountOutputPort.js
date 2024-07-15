exports.AccountOutputPort = class AccountOutputPort {
  constructor() {
    this.success = false;
    this.message = {};
    this.account = {};
  }

  formatFoundAccounts(foundAccounts) {
    const accounts = foundAccounts.map((account) => account.dataValues);

    return {
      success: true,
      message: {
        EN: "Accounts successfully queried.",
        DE: "Accounts erfolgreich abgefragt.",
      },
      accounts: accounts,
    };
  }

  formatCreatedAccount(createdAccount) {
    return {
      success: true,
      message: {
        EN: "Account successfuly created.",
        DE: "Account erfolgreich erstellt.",
      },
      account: createdAccount.dataValues,
    };
  }

  formatUpdatedAccount(updatedAccount) {
    return {
      success: true,
      message: {
        EN: "Account updated successfully.",
        DE: "Account erfolgreich aktualisiert",
      },
      account: updatedAccount.dataValues,
    };
  }

  formatDeletedAccount() {
    return {
      success: true,
      message: {
        EN: "Account deleted successfully.",
        DE: "Account erfolgreich gelöscht.",
      },
    };
  }
};
