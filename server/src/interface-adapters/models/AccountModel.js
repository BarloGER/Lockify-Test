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
        allowNull: false,
      },
      accountUrl: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      encryptedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encryptedNotes: {
        type: DataTypes.TEXT,
      },
      notesEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notesEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: false,
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
