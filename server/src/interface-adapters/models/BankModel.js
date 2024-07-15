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
        allowNull: true,
      },
      accountHolderFirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountHolderLastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedIban: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ibanEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ibanEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      swiftBic: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      branchCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardHolderFirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardHolderLastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedCardNumber: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cardNumberEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardNumberEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      expiryDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedCardCvvCvc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cardCvvCvcEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardCvvCvcEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cardType: {
        type: DataTypes.STRING,
        allowNull: true,
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
