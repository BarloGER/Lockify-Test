import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import "./assets/note-card.css";

export const NoteCard = ({ note, onSelect, onEdit, onDelete, isLoading }) => {
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
    const formValues = {
      noteTitle: e.target.noteTitle.value,
      noteContent: e.target.noteContent.value,
    };

    onEdit(e, note.noteId, formValues);
    setIsEditing(false);
  };

  return (
    <div className={`note__card ${isEditing ? "editing" : ""}`}>
      <div className="note__card_inner">
        <div className="note__card_front" onClick={() => onSelect(note.noteId)}>
          <h3>{note.decryptedNoteTitle}</h3>
          <p>
            <strong>{t("note.noteContent")}:</strong>{" "}
            <Span text={note.decryptedNoteContent} />
          </p>
          {isDeleting ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  onDelete(note.noteId), setIsDeleting(false);
                }}
              >
                {t("note.submitDelete")}
              </Button>
              <Button onClick={() => setIsDeleting(false)}>
                {t("note.cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {t("note.edit")}
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                {t("note.delete")}
              </Button>
            </>
          )}
        </div>
        <div className="note__card_back">
          <form onSubmit={handleSubmit} className="note__form">
            <Input
              id={`noteTitle-${note.noteId}`}
              label={t("note.noteTitle")}
              type="text"
              value={editedNote.noteTitle}
              onChange={(e) => handleChange(e, "noteTitle")}
              name="noteTitle"
            />
            <Input
              id={`noteContent-${note.noteId}`}
              label={t("note.noteContent")}
              type="text"
              value={editedNote.noteContent}
              onChange={(e) => handleChange(e, "noteContent")}
              name="noteContent"
            />
            <div>
              <SubmitButton isLoading={isLoading}>
                {t("note.submitEdit")}
              </SubmitButton>
              <Button onClick={() => setIsEditing(false)}>
                {t("note.cancel")}
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
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
