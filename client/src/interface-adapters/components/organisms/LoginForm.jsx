import PropTypes from "prop-types";
import { Input, Paragraph, RouterLink } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/login-form.css";

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  handleLogin,
  isLoginLoading,
  message,
  setMessage,
  messageType,
}) => {
  return (
    <form className="login-form" onSubmit={handleLogin}>
      <Input
        label="login.email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="login.password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <SubmitButton
        className="login-form__button"
        modifier="hover"
        isLoading={isLoginLoading}
      >
        {"login.loginButton"}
      </SubmitButton>

      <Paragraph text="login.linkMessage" />

      <RouterLink
        path="/register"
        className="login-form__link"
        modifier="hover"
      >
        {"login.linkButton"}
      </RouterLink>

      <Paragraph text="login.forgotMessage" />

      <RouterLink
        path="/forgot-password"
        className="login-form__link"
        modifier="hover"
      >
        {"login.forgotLink"}
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

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoginLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
