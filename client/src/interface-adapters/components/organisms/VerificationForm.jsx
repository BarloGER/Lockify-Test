import PropTypes from "prop-types";
import { Input, Button, Paragraph } from "../atoms";
import { FlashMessage } from "../molecules";
import "./assets/verification-form.css";

export const VerificationForm = ({
  verificationCode,
  setVerificationCode,
  handleVerification,
  sendNewCode,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="verification-form" onSubmit={handleVerification}>
      <Input
        label="verification.label"
        type="text"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <Button
        type="submit"
        className="verification-form__button"
        modifier="hover"
      >
        {"verification.submit"}
      </Button>
      <Paragraph text="verification.text" />
      <Button
        className="verification-form__button"
        modifier="hover"
        onClick={sendNewCode}
      >
        {"verification.newCodeButton"}
      </Button>
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="verification-form__flash-message"
      />
    </form>
  );
};

VerificationForm.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  setVerificationCode: PropTypes.func.isRequired,
  handleVerification: PropTypes.func.isRequired,
  sendNewCode: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
