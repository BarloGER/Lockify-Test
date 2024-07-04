import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/new-note-form.css";

export const NewNoteForm = ({
  formValues,
  setFormValues,
  handleChange,
  handleSubmit,
  isNoteLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setFormValues({
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
          <form onSubmit={handleSubmit}>
            <Input
              id="noteTitle"
              name="noteTitle"
              label={t("note.noteTitle")}
              value={formValues.noteTitle}
              onChange={handleChange}
            />
            <Input
              id="noteContent"
              name="noteContent"
              label={t("note.noteContent")}
              value={formValues.noteContent}
              onChange={handleChange}
            />
            <SubmitButton
              className="note-form__button"
              modifier="hover"
              isLoading={isNoteLoading}
            >
              {t("note.submitNewNote")}
            </SubmitButton>

            <Button onClick={handlePlusClick} modifier="hover">
              {t("note.cancel")}
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
  formValues: PropTypes.shape({
    noteTitle: PropTypes.string,
    noteContent: PropTypes.string,
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isNoteLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
