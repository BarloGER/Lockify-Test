const { Bank } = require("../models");

exports.BankRepository = class BankRepository {
  async findBankById(bankId) {
    const bank = await Bank.findByPk(bankId);
    if (!bank) {
      return null;
    }

    return bank;
  }

  async findBanksByUserId(userId) {
    return await Bank.findAll({
      where: { userId },
    });
  }

  async createBank(bankData) {
    const newBank = await Bank.create(bankData);
    return newBank;
  }

  async updateBank(bankId, updateData) {
    const bank = await Bank.findByPk(bankId);
    if (!bank) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        bank[key] = updateData[key];
      }
    });

    const savedBank = await bank.save();
    return savedBank;
  }

  async deleteBank(bankId) {
    const result = await Bank.destroy({ where: { bankId } });
    return result > 0;
  }
};
