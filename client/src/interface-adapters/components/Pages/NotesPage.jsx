import { useState, useContext } from "react";
import { DataVaultContext } from "../../context/DataVaultContext.jsx";
import { NoteTemplate } from "../templates/index.js";
import { SearchInput } from "../atoms";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewNoteForm, NotesOverview } from "../organisms/index.js";

export const NotesPage = () => {
  const {
    masterPassword,
    notes,
    setNotes,
    noteInteractor,
    cryptographyInteractor,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  const [newNoteFormData, setNewNoteFormData] = useState({
    noteTitle: "",
    noteContent: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("decryptedNoteTitle");
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isDataVaultUnlocked) {
    return;
  }

  const searchOptions = [{ value: "decryptedNoteTitle" }];
  const filteredNotes = notes.filter((note) =>
    note[selectedOption].toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewNoteFormData({ ...newNoteFormData, [name]: value });
  };

  const processCreateNote = async (e, masterPassword) => {
    e.preventDefault();
    setIsNoteLoading(true);

    const unvalidatedUserInput = newNoteFormData;
    const validateUserInput =
      await noteInteractor.validateUserInputForCreateNote(unvalidatedUserInput);
    if (!validateUserInput.success) {
      setIsNoteLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validNoteEntity = validateUserInput.validNoteEntity;

    let encryptedNoteTitle = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validNoteEntity.noteTitle) {
      encryptedNoteTitle = await cryptographyInteractor.encryptData({
        text: validNoteEntity.noteTitle,
        masterPassword: masterPassword,
      });
    }

    let encryptedNoteContent = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validNoteEntity.noteContent) {
      encryptedNoteContent = await cryptographyInteractor.encryptData({
        text: validNoteEntity.noteContent,
        masterPassword: masterPassword,
      });
    }

    const encryptedNoteData = {
      encryptedNoteTitle: encryptedNoteTitle.encryptedData,
      noteTitleEncryptionIv: encryptedNoteTitle.iv,
      noteTitleEncryptionSalt: encryptedNoteTitle.salt,
      encryptedNoteContent: encryptedNoteContent.encryptedData,
      noteContentEncryptionIv: encryptedNoteContent.iv,
      noteContentEncryptionSalt: encryptedNoteContent.salt,
    };

    const createNoteResponse =
      await noteInteractor.createNote(encryptedNoteData);
    if (
      !createNoteResponse.success &&
      createNoteResponse.message === "Failed to fetch"
    ) {
      setIsNoteLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!createNoteResponse.success) {
      setIsNoteLoading(false);
      setMessage(createNoteResponse.message);
      setMessageType("error");
      return;
    }

    setNotes((prevNotes) => [
      ...prevNotes,
      {
        ...createNoteResponse.note,
        decryptedNoteTitle: validNoteEntity.noteTitle,
        decryptedNoteContent: validNoteEntity.noteContent,
      },
    ]);
    setIsNoteLoading(false);
    setNewNoteFormData({
      noteTitle: "",
      noteContent: "",
    });
    setMessage(createNoteResponse.message);
    setMessageType("success");
  };

  const handleSelectNoteForEdit = (noteId) => {
    const note = notes.find((acc) => acc.noteId === noteId);
    if (note) {
      setNewNoteFormData({
        noteTitle: note.decryptedNoteTitle,
        noteContent: note.decryptedNoteContent,
      });
    }
  };

  const processUpdateNote = async (
    e,
    noteId,
    updateNoteFormData,
    setIsEditing,
  ) => {
    e.preventDefault();
    setIsNoteLoading(true);

    const noteToUpdate = notes.find((acc) => acc.noteId === noteId);

    if (!noteToUpdate) {
      setIsNoteLoading(false);
      return;
    }

    const unvalidatedUserInput = updateNoteFormData;
    const validateUserInput =
      await noteInteractor.validateUserInputForUpdateNote(unvalidatedUserInput);
    if (!validateUserInput.success) {
      setIsNoteLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validNoteEntity = validateUserInput.validNoteEntity;

    let encryptedNoteTitle = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validNoteEntity.noteTitle) {
      encryptedNoteTitle = await cryptographyInteractor.encryptData({
        text: validNoteEntity.noteTitle,
        masterPassword: masterPassword,
      });
    }

    let encryptedNoteContent = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validNoteEntity.noteContent) {
      encryptedNoteContent = await cryptographyInteractor.encryptData({
        text: validNoteEntity.noteContent,
        masterPassword: masterPassword,
      });
    }

    const encryptedNoteData = {
      encryptedNoteTitle: encryptedNoteTitle.encryptedData,
      noteTitleEncryptionIv: encryptedNoteTitle.iv,
      noteTitleEncryptionSalt: encryptedNoteTitle.salt,
      encryptedNoteContent: encryptedNoteContent.encryptedData,
      noteContentEncryptionIv: encryptedNoteContent.iv,
      noteContentEncryptionSalt: encryptedNoteContent.salt,
    };

    const updateNoteResponse = await noteInteractor.updateNote(
      noteId,
      encryptedNoteData,
    );
    if (!updateNoteResponse.success) {
      setIsNoteLoading(false);
      setMessage(updateNoteResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state to avoid decryption
    const updatedNote = notes.map((note) => {
      if (note.noteId === noteId) {
        return {
          ...note,
          ...validNoteEntity,
          decryptedNoteTitle: validNoteEntity.noteTitle,
          decryptedNoteContent: validNoteEntity.noteContent,
        };
      }
      return note;
    });

    setNotes(updatedNote);
    setIsNoteLoading(false);
    setIsEditing(false);
    setMessage(updateNoteResponse.message);
    setMessageType("success");
  };

  const processDeleteNote = async (noteId) => {
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
      <section className="notes-template__section">
        <SearchInput
          placeholder={selectedOption}
          onSearchChange={setSearchTerm}
          searchOptions={searchOptions}
          onOptionChange={(e) => setSelectedOption(e.target.value)}
          selectedOption={selectedOption}
          pageName="notesPage"
        />
      </section>
      {/*  <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="note-page__flash-message"
      /> */}
      <section className="notes-template__section">
        <NewNoteForm
          newNoteFormData={newNoteFormData}
          setNewNoteFormData={setNewNoteFormData}
          handleChange={handleChange}
          processCreateNote={(e) => processCreateNote(e, masterPassword)}
          isNoteLoading={isNoteLoading}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
      <section className="notes-template__section">
        <NotesOverview
          notes={filteredNotes}
          handleSelectNoteForEdit={handleSelectNoteForEdit}
          processUpdateNote={processUpdateNote}
          processDeleteNote={processDeleteNote}
          isNoteLoading={isNoteLoading}
          message={message}
          messageType={messageType}
        />
      </section>
    </NoteTemplate>
  );
};
