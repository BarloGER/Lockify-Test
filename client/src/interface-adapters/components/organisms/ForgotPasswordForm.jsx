import PropTypes from "prop-types";
import { Input, Button, RouterLink } from "../atoms";
import { FlashMessage } from "../molecules";
import "./assets/forgot-password-form.css";

export const ForgotPasswordForm = ({
  email,
  setEmail,
  handleSubmit,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="forgot-password-form" onSubmit={handleSubmit}>
      <Input
        label="forgotPassword.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        type="submit"
        className="forgot-password-form__button"
        modifier="hover"
      >
        {"forgotPassword.submitButton"}
      </Button>

      <RouterLink
        path="/login"
        className="forgot-password-form__link"
        modifier="hover"
      >
        {"forgotPassword.linkButton"}
      </RouterLink>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="forgot-password-form__flash-message"
      />
    </form>
  );
};

ForgotPasswordForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
