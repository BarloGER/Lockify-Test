import PropTypes from "prop-types";
import { Paragraph, Input, Textarea } from "../atoms";
import { FlashMessage, SubmitButton } from "../molecules";
import "./assets/support-form.css";

export const SupportForm = ({
  subject,
  setSubject,
  email,
  setEmail,
  html,
  setHtml,
  handleSubmitSupportMessage,
  isSupportMailLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form onSubmit={handleSubmitSupportMessage}>
      <Paragraph text="support.text" />
      <Input
        label="support.subject"
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <Input
        label="support.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Textarea
        label="support.textarea"
        placeholder="support.placeholder"
        value={html}
        onChange={(e) => setHtml(e.target.value)}
      />
      <SubmitButton
        className="support-form__button"
        modifier="hover"
        isLoading={isSupportMailLoading}
      >
        {"support.supportButton"}
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
  subject: PropTypes.string.isRequired,
  setSubject: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  html: PropTypes.string.isRequired,
  setHtml: PropTypes.func.isRequired,
  handleSubmitSupportMessage: PropTypes.func.isRequired,
  isSupportMailLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
