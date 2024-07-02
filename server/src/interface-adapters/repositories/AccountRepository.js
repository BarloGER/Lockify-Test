const { Account } = require("../models");

exports.AccountRepository = class AccountRepository {
  async findAccountById(accountId) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return null;
    }

    return account;
  }

  async findAccountsByUserId(userId) {
    return await Account.findAll({
      where: { userId },
    });
  }

  async createAccount(accountData) {
    const newAccount = await Account.create(accountData);
    return newAccount;
  }

  async updateAccount(accountId, updateData) {
    const account = await Account.findByPk(accountId);
    if (!account) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        account[key] = updateData[key];
      }
    });

    const savedAccount = await account.save();
    return savedAccount;
  }

  async deleteAccount(accountId) {
    const result = await Account.destroy({ where: { accountId } });
    return result > 0;
  }
};
