import PropTypes from "prop-types";
import { Button, Input, Textarea } from "../atoms";
import { FlashMessage } from "../molecules";
import "./assets/support-form.css";

export const SupportForm = ({
  subject,
  setSubject,
  email,
  setEmail,
  html,
  setHtml,
  handleSubmitSupportMessage,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form onSubmit={handleSubmitSupportMessage}>
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
      <Button type="submit" className="support-form__button" modifier="hover">
        {"support.supportButton"}
      </Button>
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
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
