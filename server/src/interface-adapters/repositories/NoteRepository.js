const { Note } = require("../models");

exports.NoteRepository = class NoteRepository {
  async findNoteById(noteId) {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return null;
    }

    return note;
  }

  async findNotesByUserId(userId) {
    return await Note.findAll({
      where: { userId },
    });
  }

  async createNote(noteData) {
    const newNote = await Note.create(noteData);
    return newNote;
  }

  async updateNote(noteId, updateData) {
    const note = await Note.findByPk(noteId);
    if (!note) {
      return null;
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        note[key] = updateData[key];
      }
    });

    const savedNote = await note.save();
    return savedNote;
  }

  async deleteNote(noteId) {
    const result = await Note.destroy({ where: { noteId } });
    return result > 0;
  }
};
