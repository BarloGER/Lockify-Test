const language = localStorage.getItem("language");

const URL = import.meta.env.VITE_API_KEY;

export const NoteRepository = class NoteRepository {
  async getNotesRequest() {
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

  async createNoteRequest(validEncryptedNoteEntity) {
    try {
      const response = await fetch(`${URL}/notes/create-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedNoteEntity),
        credentials: "include",
      });
      return response.json();
    } catch (error) {
      return error;
    }
  }

  async updateNoteRequest(noteId, validEncryptedNoteEntity) {
    try {
      const response = await fetch(`${URL}/notes/update-note/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        body: JSON.stringify(validEncryptedNoteEntity),
        credentials: "include",
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }

  async deleteNoteRequest(noteId) {
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
