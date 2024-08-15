import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button } from "../atoms";
import { SubmitButton } from "../molecules";
import { FlashMessage } from "../molecules";
import "./assets/new-account-form.css";

export const NewAccountForm = ({
  newAccountFormData,
  setNewAccountFormData,
  handleChange,
  processCreateAccount,
  isAccountLoading,
  message,
  setMessage,
  messageType,
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handlePlusClick = () => {
    setIsCreating(!isCreating);
    setNewAccountFormData({
      accountName: "",
      accountUrl: "",
      username: "",
      email: "",
      password: "",
      notes: "",
    });
  };

  return (
    <div className="new-account-form">
      {isCreating ? (
        <div className="new-account-form__inner">
          <form onSubmit={processCreateAccount}>
            <Input
              id="accountName"
              name="accountName"
              label={"accountsPage.accountName"}
              value={newAccountFormData.accountName}
              onChange={handleChange}
            />
            <Input
              id="accountUrl"
              name="accountUrl"
              label={"accountsPage.accountUrl"}
              value={newAccountFormData.accountUrl}
              onChange={handleChange}
            />
            <Input
              id="username"
              name="username"
              label={"accountsPage.username"}
              value={newAccountFormData.username}
              onChange={handleChange}
            />
            <Input
              id="email"
              name="email"
              label={"accountsPage.email"}
              type="email"
              value={newAccountFormData.email}
              onChange={handleChange}
            />
            <Input
              id="password"
              name="password"
              label={"accountsPage.password"}
              type="password"
              value={newAccountFormData.password}
              onChange={handleChange}
            />
            <Input
              id="notes"
              name="notes"
              label={"accountsPage.notes"}
              value={newAccountFormData.notes}
              onChange={handleChange}
            />

            <div className="new-account-form__button-wrapper">
              <SubmitButton
                className="account-form__button"
                modifier="hover"
                isLoading={isAccountLoading}
              >
                {"accountsPage.submitNewAccount"}
              </SubmitButton>

              <Button onClick={handlePlusClick} modifier="hover">
                {"accountsPage.cancel"}
              </Button>
            </div>

            <FlashMessage
              message={message}
              setMessage={setMessage}
              type={messageType}
              className="new-account-form__flash-message"
            />
          </form>
        </div>
      ) : (
        <div
          className="new-account-form__inner"
          onClick={() => setIsCreating(!isCreating)}
        >
          <span className="plus">+</span>
        </div>
      )}
    </div>
  );
};

NewAccountForm.propTypes = {
  newAccountFormData: PropTypes.shape({
    accountName: PropTypes.string,
    accountUrl: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
  setNewAccountFormData: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  processCreateAccount: PropTypes.func.isRequired,
  isAccountLoading: PropTypes.bool.isRequired,
  message: PropTypes.string,
  setMessage: PropTypes.func.isRequired,
  messageType: PropTypes.string,
};
