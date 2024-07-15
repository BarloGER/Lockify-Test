import PropTypes from "prop-types";
import { Input, RouterLink, Paragraph } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage, Checkbox } from "../molecules";
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
      <Input
        id="password"
        name="password"
        label="registerPage.password"
        type="password"
        value={newUserFormData.password}
        onChange={handleChange}
      />
      <Input
        id="confirmPassword"
        name="confirmPassword"
        label="registerPage.confirmPassword"
        type="password"
        value={newUserFormData.confirmPassword}
        onChange={handleChange}
      />
      <Input
        id="masterPassword"
        name="masterPassword"
        label="registerPage.masterPassword"
        type="password"
        value={newUserFormData.masterPassword}
        onChange={handleChange}
      />
      <Input
        id="confirmMasterPassword"
        name="confirmMasterPassword"
        label="registerPage.confirmMasterPassword"
        type="password"
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
      <SubmitButton
        className="register-form__button"
        modifier="hover"
        isLoading={isRegistrationLoading}
      >
        {"registerPage.registerButton"}
      </SubmitButton>

      <Paragraph text="registerPage.linkMessage" />

      <RouterLink
        path="/login"
        className="register-form__link"
        modifier="hover"
      >
        {"registerPage.linkButton"}
      </RouterLink>

      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="register-form__flash-message"
      />
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
