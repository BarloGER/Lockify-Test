import PropTypes from "prop-types";
import { Input, Button, RouterLink, Paragraph } from "../atoms";
import { FlashMessage, Checkbox } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/register-form.css";

export const RegisterForm = ({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
  isNewsletterAllowed,
  setIsNewsletterAllowed,
  handleRegister,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleRegister}>
      <Input
        label={t("register.username")}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        label={t("register.email")}
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label={t("register.password")}
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Checkbox
        label={t("register.newsletter")}
        checked={isNewsletterAllowed}
        onChange={(e) => setIsNewsletterAllowed(e.target.checked)}
      />
      <Button type="submit" className="register-form__button" modifier="hover">
        {t("register.registerButton")}
      </Button>

      <Paragraph text="register.linkMessage" />

      <RouterLink
        path="/login"
        className="register-form__link"
        modifier="hover"
      >
        {"register.linkButton"}
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
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  isNewsletterAllowed: PropTypes.bool.isRequired,
  setIsNewsletterAllowed: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string.isRequired,
};
