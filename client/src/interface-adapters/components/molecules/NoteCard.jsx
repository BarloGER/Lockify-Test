import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import "./assets/note-card.css";

export const NoteCard = ({
  note,
  handleSelectNoteForEdit,
  processUpdateNote,
  processDeleteNote,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedNote, setEditedNote] = useState({
    noteTitle: note.decryptedNoteTitle,
    noteContent: note.decryptedNoteContent,
  });

  const handleChange = (e, field) => {
    setEditedNote({ ...editedNote, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateNoteFormData = {
      noteTitle: e.target.noteTitle.value,
      noteContent: e.target.noteContent.value,
    };

    processUpdateNote(e, note.noteId, updateNoteFormData, setIsEditing);
    setIsEditing(false);
  };

  return (
    <div className={`note__card ${isEditing ? "editing" : ""}`}>
      <div className="note__card_inner">
        <div
          className="note__card_front"
          onClick={() => handleSelectNoteForEdit(note.noteId)}
        >
          <h3>{note.decryptedNoteTitle}</h3>
          <p>
            <strong>{t("notesPage.noteContent")}:</strong>{" "}
            <Span text={note.decryptedNoteContent} />
          </p>
          {isDeleting ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  processDeleteNote(note.noteId), setIsDeleting(false);
                }}
              >
                {"notesPage.submitDelete"}
              </Button>
              <Button onClick={() => setIsDeleting(false)}>
                {"notesPage.cancel"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {"notesPage.edit"}
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                {"notesPage.delete"}
              </Button>
            </>
          )}
        </div>
        <div className="note__card_back">
          <form onSubmit={handleSubmit} className="note__form">
            <Input
              id={`noteTitle-${note.noteId}`}
              name="noteTitle"
              label="notesPage.noteTitle"
              type="text"
              value={editedNote.noteTitle}
              onChange={(e) => handleChange(e, "noteTitle")}
            />
            <Input
              id={`noteContent-${note.noteId}`}
              name="noteContent"
              label="notesPage.noteContent"
              type="text"
              value={editedNote.noteContent}
              onChange={(e) => handleChange(e, "noteContent")}
            />
            <div>
              <SubmitButton isLoading={isLoading}>
                {"notesPage.submitEdit"}
              </SubmitButton>
              <Button onClick={() => setIsEditing(false)}>
                {"notesPage.cancel"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    noteId: PropTypes.number.isRequired,
    decryptedNoteTitle: PropTypes.string.isRequired,
    decryptedNoteContent: PropTypes.string,
  }).isRequired,
  handleSelectNoteForEdit: PropTypes.func.isRequired,
  processUpdateNote: PropTypes.func.isRequired,
  processDeleteNote: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
