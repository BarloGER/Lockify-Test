import { useState, useEffect, useContext } from "react";
import { NoteInteractor } from "../../../usecases/note/NoteInteractor.js";
import { NoteRepository } from "../../repositories/NoteRepository.js";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { NoteTemplate } from "../templates/index.js";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewNoteForm, NotesOverview } from "../organisms/index.js";

// Initialisierung des NoteRepository und des NoteInteractor
const noteRepository = new NoteRepository();
const noteInteractor = new NoteInteractor(noteRepository);
const cryptographyInteractor = new CryptographyInteractor();

export const NotesPage = () => {
  const { masterPassword } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [newNoteFormValues, setNewNoteFormValues] = useState({
    noteTitle: "",
    noteContent: "",
  });

  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNoteFormValues({ ...newNoteFormValues, [name]: value });
  };

  const decryptNoteData = async (noteData, masterPassword) => {
    console.log("noteData", noteData);
    // Check whether the input is an array or needs to be converted into an array
    const notes = Array.isArray(noteData) ? noteData : [noteData];

    const decryptedNotes = await Promise.all(
      notes.map(async (note) => {
        const decryptionResultNoteTitle =
          await cryptographyInteractor.decryptData({
            encryptedData: note.encryptedNoteTitle,
            iv: note.noteTitleEncryptionIv,
            salt: note.noteTitleEncryptionSalt,
            masterPassword: masterPassword,
          });

        const decryptedNoteTitle = decryptionResultNoteTitle.success
          ? decryptionResultNoteTitle.data
          : "";

        const decryptionResultNoteContent = note.encryptedNoteContent
          ? await cryptographyInteractor.decryptData({
              encryptedData: note.encryptedNoteContent,
              iv: note.noteContentEncryptionIv,
              salt: note.noteContentEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedNoteContent = decryptionResultNoteContent.success
          ? decryptionResultNoteContent.data
          : "";

        return {
          ...note,
          decryptedNoteTitle,
          decryptedNoteContent,
        };
      })
    );

    return Array.isArray(noteData) ? decryptedNotes : decryptedNotes[0];
  };

  const getNotes = async (masterPassword) => {
    setIsNoteLoading(true);

    const noteRequestResponse = await noteInteractor.getNotes();
    if (!noteRequestResponse.success) {
      setMessage(
        noteRequestResponse.message || "Fehler beim Abrufen der Konten"
      );
      setMessageType("error");
      setNotes([]);
      setIsNoteLoading(false);
      return;
    }

    const decryptedNotes = await decryptNoteData(
      noteRequestResponse.notes,
      masterPassword
    );
    if (!decryptedNotes) {
      setMessage("Fehler beim Entschlüsseln der Konten");
      setMessageType("error");
      setNotes([]);
      return;
    }

    setIsNoteLoading(false);
    setNotes(decryptedNotes);
    setMessage(noteRequestResponse.message);
    setMessageType("success");
  };

  useEffect(() => {
    getNotes(masterPassword);
  }, []);

  const handleCreateNote = async (e, masterPassword) => {
    e.preventDefault();
    setIsNoteLoading(true);

    const validateNote = await noteInteractor.validateCreateNote({
      noteTitle: newNoteFormValues.noteTitle,
      noteContent: newNoteFormValues.noteContent,
    });
    if (validateNote && validateNote.validationError) {
      setIsNoteLoading(false);
      setMessage(`validationError.${validateNote.validationError}`);
      setMessageType("error");
      return;
    }

    const encryptedNoteTitleObj = await cryptographyInteractor.encryptData({
      text: newNoteFormValues.noteTitle,
      masterPassword: masterPassword,
    });

    let encryptedNoteContentObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (newNoteFormValues.noteContent) {
      encryptedNoteContentObj = await cryptographyInteractor.encryptData({
        text: newNoteFormValues.noteContent,
        masterPassword: masterPassword,
      });
    }

    const creationResponse = await noteInteractor.createNote({
      encryptedNoteTitle: encryptedNoteTitleObj.data.encryptedData,
      noteTitleEncryptionIv: encryptedNoteTitleObj.data.iv,
      noteTitleEncryptionSalt: encryptedNoteTitleObj.data.salt,
      encryptedNoteContent: encryptedNoteContentObj.data.encryptedData,
      noteContentEncryptionIv: encryptedNoteContentObj.data.iv,
      noteContentEncryptionSalt: encryptedNoteContentObj.data.salt,
    });

    if (creationResponse.validationError) {
      setIsNoteLoading(false);
      setMessage(`validationError.${creationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (!creationResponse.success) {
      setIsNoteLoading(false);
      setMessage(creationResponse.message);
      setMessageType("error");
      return;
    }

    const decryptedNote = await decryptNoteData(
      creationResponse.note,
      masterPassword
    );

    setNotes((prevNotes) => [...prevNotes, decryptedNote]);
    setIsNoteLoading(false);
    setNewNoteFormValues({
      noteTitle: "",
      noteContent: "",
    });
    setMessage(creationResponse.message);
    setMessageType("success");
  };

  const handleSelectNoteForEdit = (noteId) => {
    const note = notes.find((acc) => acc.noteId === noteId);
    if (note) {
      setNewNoteFormValues({
        noteTitle: note.decryptedNoteTitle,
        noteContent: note.decryptedNoteContent,
      });
    }
  };

  const handleEditNote = async (e, noteId, formValues) => {
    e.preventDefault();
    setIsNoteLoading(true);

    const noteToUpdate = notes.find((acc) => acc.noteId === noteId);

    if (!noteToUpdate) {
      setIsNoteLoading(false);
      return;
    }

    const validateNote = await noteInteractor.validateEditNote({
      noteTitle: formValues.noteTitle,
      noteContent: formValues.noteContent,
    });

    if (validateNote && validateNote.validationError) {
      setIsNoteLoading(false);
      setMessage(`validationError.${validateNote.validationError}`);
      setMessageType("error");
      return;
    }

    const encryptedNoteTitleObj = await cryptographyInteractor.encryptData({
      text: formValues.noteTitle,
      masterPassword: masterPassword,
    });

    let encryptedNoteContentObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (formValues.noteContent) {
      encryptedNoteContentObj = await cryptographyInteractor.encryptData({
        text: formValues.noteContent,
        masterPassword: masterPassword,
      });
    }

    const editResponse = await noteInteractor.editNote(noteId, {
      encryptedNoteTitle: encryptedNoteTitleObj.data.encryptedData,
      noteTitleEncryptionIv: encryptedNoteTitleObj.data.iv,
      noteTitleEncryptionSalt: encryptedNoteTitleObj.data.salt,
      encryptedNoteContent: encryptedNoteContentObj.data.encryptedData,
      noteContentEncryptionIv: encryptedNoteContentObj.data.iv,
      noteContentEncryptionSalt: encryptedNoteContentObj.data.salt,
    });

    if (!editResponse.success) {
      setIsNoteLoading(false);
      setMessage(editResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedNote = notes.map((note) => {
      if (note.noteId === noteId) {
        return {
          ...note,
          ...formValues,
          decryptedNoteTitle: formValues.noteTitle,
          decryptedNoteContent: formValues.noteContent,
        };
      }
      return note;
    });

    setNotes(updatedNote);
    setIsNoteLoading(false);
    setMessage(editResponse.message);
    setMessageType("success");
  };

  const handleDeleteNote = async (noteId) => {
    setIsNoteLoading(true);

    const noteToDelete = notes.find((acc) => acc.noteId === noteId);

    if (!noteToDelete) {
      setIsNoteLoading(false);
      return;
    }

    const deletionResponse = await noteInteractor.deleteNote(noteId);

    if (!deletionResponse.success) {
      setIsNoteLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedNotes = notes.filter((note) => note.noteId !== noteId);

    setNotes(updatedNotes);
    setIsNoteLoading(false);
    setMessage(deletionResponse.message);
    setMessageType("success");
  };

  return (
    <NoteTemplate>
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="note-page__flash-message"
      />
      <NewNoteForm
        formValues={newNoteFormValues}
        setFormValues={setNewNoteFormValues}
        handleChange={handleChange}
        handleSubmit={(e) => handleCreateNote(e, masterPassword)}
        isNoteLoading={isNoteLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <NotesOverview
        notes={notes}
        onSelectNote={handleSelectNoteForEdit}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
        isNoteLoading={isNoteLoading}
        message={message}
        messageType={messageType}
      />
    </NoteTemplate>
  );
};
