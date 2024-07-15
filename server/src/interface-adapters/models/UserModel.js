module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passwordUpdatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      encryptedSecret: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      secretEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secretEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isNewsletterAllowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verificationAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      lastVerificationAttempt: {
        type: DataTypes.DATE,
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
      modelName: "user",
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
