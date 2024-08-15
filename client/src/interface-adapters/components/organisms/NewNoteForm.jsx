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
    <div className="new-note-form">
      {isCreating ? (
        <div className="new-note-form__inner">
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

            <div className="new-note-form__button-wrapper">
              <SubmitButton
                className="new-note-form__button"
                modifier="hover"
                isLoading={isNoteLoading}
              >
                {"notesPage.submitNewNote"}
              </SubmitButton>

              <Button onClick={handlePlusClick} modifier="hover">
                {"notesPage.cancel"}
              </Button>
            </div>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="new-note-form__flash-message"
            />
          </form>
        </div>
      ) : (
        <div
          className="new-note-form__inner"
          onClick={() => setIsCreating(!isCreating)}
        >
          <span className="plus">+</span>
        </div>
      )}
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
