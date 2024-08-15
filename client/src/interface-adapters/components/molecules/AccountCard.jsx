import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Heading1,
  Input,
  Span,
  Button,
  ToggleVisibilityButton,
  CopyButton,
} from "../atoms";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import "./assets/account-card.css";

export const AccountCard = ({
  account,
  processUpdateAccount,
  processDeleteAccount,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [isClicked, setIsClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedAccount, setEditedAccount] = useState({
    accountName: account.accountName,
    accountUrl: account.accountUrl,
    username: account.username,
    email: account.email,
    password: account.decryptedPassword,
    notes: account.decryptedNotes,
  });

  const handleChange = (e, field) => {
    setEditedAccount({ ...editedAccount, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateAccountFormData = {
      accountName: e.target.accountName.value,
      accountUrl: e.target.accountUrl.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      notes: e.target.notes.value,
    };

    processUpdateAccount(
      e,
      account.accountId,
      updateAccountFormData,
      setIsEditing,
    );
  };

  return (
    <div className="account-card">
      <div
        className="account-card__title"
        onClick={() => setIsClicked(!isClicked)}
      >
        <Heading1 text={account.accountName} />
        {isClicked ? <SlArrowUp /> : <SlArrowDown />}
      </div>

      {isClicked && (
        <div className="account-card--expanded">
          {isEditing ? (
            <div className="account-card--editing">
              <form onSubmit={handleSubmit} className="account__form">
                <Input
                  id={`accountName-${account.accountId}`}
                  label={"accountsPage.accountName"}
                  type="text"
                  value={editedAccount.accountName}
                  onChange={(e) => handleChange(e, "accountName")}
                  name="accountName"
                />
                <Input
                  id={`accountUrl-${account.accountId}`}
                  label={"accountsPage.accountUrl"}
                  type="text"
                  value={editedAccount.accountUrl}
                  onChange={(e) => handleChange(e, "accountUrl")}
                  name="accountUrl"
                />
                <Input
                  id={`username-${account.accountId}`}
                  label={"accountsPage.username"}
                  type="text"
                  value={editedAccount.username}
                  onChange={(e) => handleChange(e, "username")}
                  name="username"
                />
                <Input
                  id={`email-${account.accountId}`}
                  label={"accountsPage.email"}
                  type="email"
                  value={editedAccount.email}
                  onChange={(e) => handleChange(e, "email")}
                  name="email"
                />
                <PasswordInput
                  id={`password-${account.accountId}`}
                  label={"accountsPage.password"}
                  value={editedAccount.password}
                  onChange={handleChange}
                  name="password"
                />
                <Input
                  id={`notes-${account.accountId}`}
                  label={"accountsPage.notes"}
                  type="text"
                  value={editedAccount.notes}
                  onChange={(e) => handleChange(e, "notes")}
                  name="notes"
                />
                <div className="account-card__button-wrapper">
                  <SubmitButton isLoading={isLoading}>
                    {"accountsPage.submitEdit"}
                  </SubmitButton>
                  <Button onClick={() => setIsEditing(false)}>
                    {"accountsPage.cancel"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div className="account-card--overview">
              <div className="account-card__info-container">
                <strong>{t("accountsPage.accountUrl")}:</strong>{" "}
                <a
                  href={account.accountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {account.accountUrl || ""}
                </a>
              </div>
              <div className="account-card__info-container">
                <strong>{t("accountsPage.username")}:</strong>{" "}
                <Span text={account.username} />
              </div>
              <div className="account-card__info-container">
                <strong>{t("accountsPage.email")}:</strong>{" "}
                <Span text={account.email} />
              </div>
              <div className="account-card__info-container">
                <strong>{t("accountsPage.password")}:</strong>{" "}
                <div className="account-card__password-container">
                  <Span
                    text={account.decryptedPassword || ""}
                    state={isPasswordHidden}
                  />
                  <ToggleVisibilityButton
                    isValueHidden={isPasswordHidden}
                    setIsValueHidden={setIsPasswordHidden}
                    onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                  />
                  <CopyButton
                    onClick={() =>
                      navigator.clipboard.writeText(account.decryptedPassword)
                    }
                  />
                </div>
              </div>
              <div className="account-card__info-container">
                <strong>{t("accountsPage.notes")}:</strong>{" "}
                <Span text={account.decryptedNotes} />
              </div>
              {isDeleting ? (
                <div className="account-card__button-wrapper">
                  <Button
                    type="button"
                    onClick={() => {
                      processDeleteAccount(account.accountId),
                        setIsDeleting(false);
                    }}
                  >
                    {"accountsPage.submitDelete"}
                  </Button>
                  <Button onClick={() => setIsDeleting(false)}>
                    {"accountsPage.cancel"}
                  </Button>
                </div>
              ) : (
                <div className="account-card__button-wrapper">
                  <Button onClick={() => setIsEditing(!isEditing)}>
                    {"accountsPage.edit"}
                  </Button>
                  <Button onClick={() => setIsDeleting(true)}>
                    {"accountsPage.delete"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

AccountCard.propTypes = {
  account: PropTypes.shape({
    accountId: PropTypes.number.isRequired,
    accountName: PropTypes.string.isRequired,
    accountUrl: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    decryptedPassword: PropTypes.string,
    decryptedNotes: PropTypes.string,
  }).isRequired,
  handleSelectAccountForEdit: PropTypes.func.isRequired,
  processUpdateAccount: PropTypes.func.isRequired,
  processDeleteAccount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
