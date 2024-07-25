import PropTypes from "prop-types";
import { Heading1, Input, RouterLink } from "../atoms";
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
      <Heading1 text="forgotPasswordPage.title" />

      <Input
        id="email"
        name="email"
        label="forgotPasswordPage.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="forgot-password-form__flash-message"
      />

      <div className="forgot-password-form__button-container">
        <RouterLink
          path="/login"
          className="forgot-password-form__link"
          modifier="hover"
        >
          {"forgotPasswordPage.linkButton"}
        </RouterLink>

        <SubmitButton
          className="forgot-password-form__submit-button"
          modifier="hover"
          isLoading={isPasswordRequestLoading}
        >
          {"forgotPasswordPage.submitButton"}
        </SubmitButton>
      </div>
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
