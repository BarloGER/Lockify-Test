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
        type: DataTypes.TEXT,
        allowNull: true,
      },
      noteTitleEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      noteTitleEncryptionSalt: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      encryptedNoteContent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      noteContentEncryptionIv: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      noteContentEncryptionSalt: {
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
      modelName: "note",
      timestamps: true,
      underscored: true,
    }
  );

  return Note;
};
