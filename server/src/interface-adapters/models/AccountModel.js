module.exports = (sequelize, Model, DataTypes) => {
  class Account extends Model {}

  Account.init(
    {
      accountId: {
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
      accountName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      accountUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedPassword: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      passwordEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      passwordEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedNotes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notesEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notesEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "account",
      timestamps: true,
      underscored: true,
    }
  );

  return Account;
};
