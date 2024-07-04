module.exports = (sequelize, Model, DataTypes) => {
  class Contact extends Model {}

  Contact.init(
    {
      contactId: {
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
      companyName: {
        type: DataTypes.STRING,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      streetAddress: {
        type: DataTypes.STRING,
      },
      additionalAddressInfo: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      stateProvinceRegion: {
        type: DataTypes.STRING,
      },
      postalCode: {
        type: DataTypes.STRING,
      },
      country: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.STRING,
      },
      encryptedNotes: {
        type: DataTypes.TEXT,
      },
      notesEncryptionIv: {
        type: DataTypes.STRING,
      },
      notesEncryptionSalt: {
        type: DataTypes.STRING,
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
      modelName: "contact",
      timestamps: true,
      underscored: true,
    }
  );

  return Contact;
};
