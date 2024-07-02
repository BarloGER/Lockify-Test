import PropTypes from "prop-types";
import { Input, RouterLink } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/forgot-password-form.css";

export const ForgotPasswordForm = ({
  email,
  setEmail,
  handleNewPasswordRequest,
  isPasswordRequestLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="forgot-password-form" onSubmit={handleNewPasswordRequest}>
      <Input
        id="email"
        name="email"
        label="forgotPassword.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <SubmitButton
        className="forgot-password-form__button"
        modifier="hover"
        isLoading={isPasswordRequestLoading}
      >
        {"forgotPassword.submitButton"}
      </SubmitButton>

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
  handleNewPasswordRequest: PropTypes.func.isRequired,
  isPasswordRequestLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
