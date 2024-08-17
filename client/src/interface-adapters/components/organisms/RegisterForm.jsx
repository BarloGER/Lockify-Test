import PropTypes from "prop-types";
import { Heading1, Input, RouterLink } from "../atoms";
import { SubmitButton } from "../molecules";
import {
  Checkbox,
  FlashMessage,
  HiddenInput,
  MasterPasswordInput,
  PasswordInput,
} from "../molecules";
import "./assets/register-form.css";

export const RegisterForm = ({
  newUserFormData,
  handleChange,
  processRegistration,
  isRegistrationLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="register-form" onSubmit={processRegistration}>
      <Heading1 text="registerPage.title" />

      <div className="register-form__input-container">
        <Input
          id="username"
          name="username"
          label="registerPage.username"
          type="text"
          value={newUserFormData.username}
          onChange={handleChange}
        />
        <Input
          id="email"
          name="email"
          label="registerPage.email"
          type="email"
          value={newUserFormData.email}
          onChange={handleChange}
        />
        <PasswordInput
          id="password"
          name="password"
          label="registerPage.password"
          autocomplete="false"
          value={newUserFormData.password}
          onChange={handleChange}
        />
        <HiddenInput
          id="confirmPassword"
          name="confirmPassword"
          label="registerPage.confirmPassword"
          autocomplete="false"
          value={newUserFormData.confirmPassword}
          onChange={handleChange}
        />
        <MasterPasswordInput
          id="masterPassword"
          name="masterPassword"
          label="registerPage.masterPassword"
          type="password"
          value={newUserFormData.masterPassword}
          onChange={handleChange}
        />
        <HiddenInput
          id="confirmMasterPassword"
          name="confirmMasterPassword"
          label="registerPage.confirmMasterPassword"
          autocomplete="false"
          value={newUserFormData.confirmMasterPassword}
          onChange={handleChange}
        />
        <Checkbox
          id="isNewsletterAllowed"
          name="isNewsletterAllowed"
          label="registerPage.newsletter"
          checked={newUserFormData.isNewsletterAllowed}
          onChange={handleChange}
        />
      </div>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="register-form__flash-message"
      />

      <RouterLink
        path="/login"
        className="register-form__link"
        modifier="hover"
      >
        {"registerPage.linkButton"}
      </RouterLink>

      <SubmitButton
        className="register-form__submit-button"
        modifier="hover"
        isLoading={isRegistrationLoading}
      >
        {"registerPage.registerButton"}
      </SubmitButton>
    </form>
  );
};

RegisterForm.propTypes = {
  newUserFormData: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string,
    masterPassword: PropTypes.string,
    confirmMasterPassword: PropTypes.string,
    isNewsletterAllowed: PropTypes.bool,
  }).isRequired,
  isRegistrationLoading: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  processRegistration: PropTypes.func.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
