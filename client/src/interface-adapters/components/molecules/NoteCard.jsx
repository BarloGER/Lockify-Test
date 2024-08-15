import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { Heading1, Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./assets/note-card.css";

export const NoteCard = ({
  note,
  processUpdateNote,
  processDeleteNote,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
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
    <div className="note-card">
      <div
        className="note-card__title"
        onClick={() => setIsClicked(!isClicked)}
      >
        <Heading1 text={note.decryptedNoteTitle} />
        {isClicked ? <SlArrowUp /> : <SlArrowDown />}
      </div>

      {isClicked && (
        <div className="note-card--expanded">
          {isEditing ? (
            <div className="note-card--editing">
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

                <div className="note-card__button-wrapper">
                  <SubmitButton isLoading={isLoading}>
                    {"contactsPage.submitEdit"}
                  </SubmitButton>
                  <Button onClick={() => setIsEditing(false)}>
                    {"contactsPage.cancel"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="note-card--overview">
              <div className="note-card__info-container">
                <Span text={note.decryptedNoteContent} />
              </div>
              {isDeleting ? (
                <div className="note-card__button-wrapper">
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
                </div>
              ) : (
                <div className="note-card__button-wrapper">
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    {"notesPage.edit"}
                  </Button>
                  <Button onClick={() => setIsDeleting(true)}>
                    {"notesPage.delete"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
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
