import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import { useTranslation } from "react-i18next";
import "./assets/new-account-form.css";

export const NewAccountForm = ({
  formValues,
  setFormValues,
  handleChange,
  handleSubmit,
  isAccountLoading,
  message,
  setMessage,
  messageType,
}) => {
  const { t } = useTranslation();
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setFormValues({
      accountName: "",
      accountUrl: "",
      username: "",
      email: "",
      password: "",
      notes: "",
    });
  };

  return (
    <div className={`new-account__form ${isCreating ? "creating" : ""}`}>
      <div className="new-account__form_inner">
        <div className="new-account__form_front">
          <div className="plus-container" onClick={handlePlusClick}>
            <span className="plus">+</span>
          </div>
        </div>
        <div className="new-account__form_back">
          <form onSubmit={handleSubmit}>
            <Input
              id="accountName"
              name="accountName"
              label={t("account.accountName")}
              value={formValues.accountName}
              onChange={handleChange}
            />
            <Input
              id="accountUrl"
              name="accountUrl"
              label={t("account.accountUrl")}
              value={formValues.accountUrl}
              onChange={handleChange}
            />
            <Input
              id="username"
              name="username"
              label={t("account.username")}
              value={formValues.username}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              label={t("account.email")}
              type="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <Input
              id="password"
              name="password"
              label={t("account.password")}
              type="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <Input
              id="notes"
              name="notes"
              label={t("account.notes")}
              value={formValues.notes}
              onChange={handleChange}
            />

            <SubmitButton
              className="account-form__button"
              modifier="hover"
              isLoading={isAccountLoading}
            >
              {t("account.submitNewAccount")}
            </SubmitButton>

            <Button onClick={handlePlusClick} modifier="hover">
              {t("account.cancel")}
            </Button>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="account-form__flash-message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

NewAccountForm.propTypes = {
  formValues: PropTypes.shape({
    accountName: PropTypes.string,
    accountUrl: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  setFormValues: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isAccountLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
