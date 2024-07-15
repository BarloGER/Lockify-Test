import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/new-note-form.css";

export const NewNoteForm = ({
  newNoteFormData,
  setNewNoteFormData,
  handleChange,
  processCreateNote,
  isNoteLoading,
  message,
  setMessage,
  messageType,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setNewNoteFormData({
      noteTitle: "",
      noteContent: "",
    });
  };

  return (
    <div className={`new-note__form ${isCreating ? "creating" : ""}`}>
      <div className="new-note__form_inner">
        <div className="new-note__form_front">
          <div className="plus-container" onClick={handlePlusClick}>
            <span className="plus">+</span>
          </div>
        </div>
        <div className="new-note__form_back">
          <form onSubmit={processCreateNote}>
            <Input
              id="noteTitle"
              name="noteTitle"
              label={"notesPage.noteTitle"}
              value={newNoteFormData.noteTitle}
              onChange={handleChange}
            />
            <Input
              id="noteContent"
              name="noteContent"
              label={"notesPage.noteContent"}
              value={newNoteFormData.noteContent}
              onChange={handleChange}
            />
            <SubmitButton
              className="note-form__button"
              modifier="hover"
              isLoading={isNoteLoading}
            >
              {"notesPage.submitNewNote"}
            </SubmitButton>

            <Button onClick={handlePlusClick} modifier="hover">
              {"notesPage.cancel"}
            </Button>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="note-form__flash-message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

NewNoteForm.propTypes = {
  newNoteFormData: PropTypes.shape({
    noteTitle: PropTypes.string,
    noteContent: PropTypes.string,
  }).isRequired,
  setNewNoteFormData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  processCreateNote: PropTypes.func.isRequired,
  isNoteLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
