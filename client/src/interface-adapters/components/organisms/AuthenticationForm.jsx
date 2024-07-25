import PropTypes from "prop-types";
import { Heading1, Input, RouterLink } from "../atoms";
import { FlashMessage, HiddenInput, SubmitButton } from "../molecules";
import "./assets/authentication-form.css";

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
    <form className="authentication-form" onSubmit={processAuthentication}>
      <Heading1 text="authenticationPage.title" />

      <div className="authentication-form__input-container">
        <Input
          id="email"
          name="email"
          label="authenticationPage.email"
          type="email"
          value={authenticationFormData.email}
          onChange={handleChange}
        />
        <HiddenInput
          id="password"
          name="password"
          label="authenticationPage.password"
          autocomplete="false"
          value={authenticationFormData.password}
          onChange={handleChange}
        />
      </div>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="authentication-form__flash-message"
      />

      <div className="authentication-form__button-container">
        <div className="authentication-form__link-wrapper">
          <RouterLink
            path="/forgot-password"
            className="authentication-form__link"
            modifier="hover"
          >
            {"authenticationPage.forgotLink"}
          </RouterLink>
          <RouterLink
            path="/register"
            className="authentication-form__link"
            modifier="hover"
          >
            {"authenticationPage.linkButton"}
          </RouterLink>
        </div>

        <SubmitButton
          className="authentication-form__submit-button"
          modifier="hover"
          isLoading={isAuthenticationLoading}
        >
          {"authenticationPage.authenticationButton"}
        </SubmitButton>
      </div>
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
