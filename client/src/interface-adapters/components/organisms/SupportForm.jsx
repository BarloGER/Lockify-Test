import PropTypes from "prop-types";
import { Heading1, Input, Textarea } from "../atoms";
import { FlashMessage, SubmitButton } from "../molecules";
import "./assets/support-form.css";

export const SupportForm = ({
  supportFormData,
  handleChange,
  processSupportRequest,
  isSupportMailLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="support-form" onSubmit={processSupportRequest}>
      <Heading1 text="supportPage.title" />

      <Input
        id="subject"
        name="subject"
        label="supportPage.subject"
        type="text"
        value={supportFormData.subject}
        onChange={handleChange}
      />
      <Input
        id="email"
        name="email"
        label="supportPage.email"
        type="email"
        value={supportFormData.email}
        onChange={handleChange}
      />
      <Textarea
        id="message"
        name="html"
        label="supportPage.textarea"
        placeholder="supportPage.placeholder"
        value={supportFormData.html}
        onChange={handleChange}
      />
      <SubmitButton
        className="support-form__button"
        modifier="hover"
        isLoading={isSupportMailLoading}
      >
        {"supportPage.supportButton"}
      </SubmitButton>
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="support-form__flash-message"
      />
    </form>
  );
};

SupportForm.propTypes = {
  supportFormData: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    email: PropTypes.string,
    html: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  processSupportRequest: PropTypes.func.isRequired,
  isSupportMailLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
