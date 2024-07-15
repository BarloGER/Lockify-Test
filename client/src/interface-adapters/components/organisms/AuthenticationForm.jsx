import PropTypes from "prop-types";
import { Input, Paragraph, RouterLink } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/login-form.css";

export const AuthenticationForm = ({
  authenticationFormData,
  handleChange,
  processAuthentication,
  isAuthenticationLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="login-form" onSubmit={processAuthentication}>
      <Input
        id="email"
        name="email"
        label="authenticationPage.email"
        type="email"
        value={authenticationFormData.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        name="password"
        label="authenticationPage.password"
        type="password"
        value={authenticationFormData.password}
        onChange={handleChange}
      />
      <SubmitButton
        className="login-form__button"
        modifier="hover"
        isLoading={isAuthenticationLoading}
      >
        {"authenticationPage.authenticationButton"}
      </SubmitButton>

      <Paragraph text="authenticationPage.linkMessage" />

      <RouterLink
        path="/register"
        className="login-form__link"
        modifier="hover"
      >
        {"authenticationPage.linkButton"}
      </RouterLink>

      <Paragraph text="authenticationPage.forgotMessage" />

      <RouterLink
        path="/forgot-password"
        className="login-form__link"
        modifier="hover"
      >
        {"authenticationPage.forgotLink"}
      </RouterLink>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="login-form__flash-message"
      />
    </form>
  );
};

AuthenticationForm.propTypes = {
  authenticationFormData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
  isAuthenticationLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  processAuthentication: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
