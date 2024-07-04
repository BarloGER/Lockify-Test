module.exports = (sequelize, Model, DataTypes) => {
  class Note extends Model {}

  Note.init(
    {
      noteId: {
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
      encryptedNoteTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteTitleEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteTitleEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encryptedNoteContent: {
        type: DataTypes.TEXT,
      },
      noteContentEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      noteContentEncryptionSalt: {
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
      modelName: "note",
      timestamps: true,
      underscored: true,
    }
  );

  return Note;
};
