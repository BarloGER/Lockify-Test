const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const NoteRepository = class NoteRepository {
  async getNotes() {
    try {
      const response = await fetch(`${URL}/notes/get-notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  async createNote(userData) {
    try {
      const response = await fetch(`${URL}/notes/create-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          encryptedNoteTitle: userData.encryptedNoteTitle,
          noteTitleEncryptionIv: userData.noteTitleEncryptionIv,
          noteTitleEncryptionSalt: userData.noteTitleEncryptionSalt,
          encryptedNoteContent: userData.encryptedNoteContent,
          noteContentEncryptionIv: userData.noteContentEncryptionIv,
          noteContentEncryptionSalt: userData.noteContentEncryptionSalt,
        }),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateNote(noteId, updatedData) {
    try {
      const response = await fetch(`${URL}/notes/update-note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify({
          encryptedNoteTitle: updatedData.encryptedNoteTitle,
          noteTitleEncryptionIv: updatedData.noteTitleEncryptionIv,
          noteTitleEncryptionSalt: updatedData.noteTitleEncryptionSalt,
          encryptedNoteContent: updatedData.encryptedNoteContent,
          noteContentEncryptionIv: updatedData.noteContentEncryptionIv,
          noteContentEncryptionSalt: updatedData.noteContentEncryptionSalt,
        }),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteNote(noteId) {
    try {
      const response = await fetch(`${URL}/notes/delete-note/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }
};
