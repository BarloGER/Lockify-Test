module.exports = (sequelize, Model, DataTypes) => {
  class Bank extends Model {}

  Bank.init(
    {
      bankId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "userId",
        },
      },
      bankName: {
        type: DataTypes.STRING,
      },
      accountHolderFirstName: {
        type: DataTypes.STRING,
      },
      accountHolderLastName: {
        type: DataTypes.STRING,
      },
      encryptedIban: {
        type: DataTypes.TEXT,
      },
      ibanEncryptionIv: {
        type: DataTypes.STRING,
      },
      ibanEncryptionSalt: {
        type: DataTypes.STRING,
      },
      swiftBic: {
        type: DataTypes.STRING,
      },
      accountType: {
        type: DataTypes.STRING,
      },
      branchCode: {
        type: DataTypes.STRING,
      },
      cardHolderFirstName: {
        type: DataTypes.STRING,
      },
      cardHolderLastName: {
        type: DataTypes.STRING,
      },
      encryptedCardNumber: {
        type: DataTypes.TEXT,
      },
      cardNumberEncryptionIv: {
        type: DataTypes.STRING,
      },
      cardNumberEncryptionSalt: {
        type: DataTypes.STRING,
      },
      expiryDate: {
        type: DataTypes.STRING,
      },
      encryptedCardCvvCvc: {
        type: DataTypes.TEXT,
      },
      cardCvvCvcEncryptionIv: {
        type: DataTypes.STRING,
      },
      cardCvvCvcEncryptionSalt: {
        type: DataTypes.STRING,
      },
      cardType: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "bank",
      timestamps: true,
      underscored: true,
    }
  );

  return Bank;
};
