import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Input,
  Span,
  Button,
  ToggleVisibilityButton,
  CopyButton,
} from "../atoms";
import { PasswordInput } from "./PasswordInput";
import { SubmitButton } from "./SubmitButton";
import "./assets/account-card.css";

export const AccountCard = ({
  account,
  handleSelectAccountForEdit,
  processUpdateAccount,
  processDeleteAccount,
  isLoading,
}) => {
  const { t } = useTranslation();

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
      setIsEditing
    );
  };

  return (
    <div className={`account__card ${isEditing ? "editing" : ""}`}>
      <div className="account__card_inner">
        <div
          className="account__card_front"
          onClick={() => handleSelectAccountForEdit(account.accountId)}
        >
          <h3>{account.accountName}</h3>
          <p>
            <strong>{t("accountsPage.accountUrl")}:</strong>{" "}
            <a
              href={account.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {account.accountUrl || ""}
            </a>
          </p>
          <p>
            <strong>{t("accountsPage.username")}:</strong>{" "}
            <Span text={account.username} />
          </p>
          <p>
            <strong>{t("accountsPage.email")}:</strong>{" "}
            <Span text={account.email} />
          </p>
          <p>
            <strong>{t("accountsPage.password")}:</strong>{" "}
            <Span
              text={account.decryptedPassword || ""}
              state={isPasswordHidden}
            />
            <ToggleVisibilityButton
              isValueHidden={isPasswordHidden}
              onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            />
            <CopyButton
              onClick={() =>
                navigator.clipboard.writeText(account.decryptedPassword)
              }
            />
          </p>
          <p>
            <strong>{t("accountsPage.notes")}:</strong>{" "}
            <Span text={account.decryptedNotes} />
          </p>
          {isDeleting ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  processDeleteAccount(account.accountId), setIsDeleting(false);
                }}
              >
                {"accountsPage.submitDelete"}
              </Button>
              <Button onClick={() => setIsDeleting(false)}>
                {"accountsPage.cancel"}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {"accountsPage.edit"}
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                {"accountsPage.delete"}
              </Button>
            </>
          )}
        </div>
        <div className="account__card_back">
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
              value={editedAccount.password}
              onChange={handleChange}
            />
            <Input
              id={`notes-${account.accountId}`}
              label={"accountsPage.notes"}
              type="text"
              value={editedAccount.notes}
              onChange={(e) => handleChange(e, "notes")}
              name="notes"
            />
            <div>
              <SubmitButton isLoading={isLoading}>
                {"account.submitEdit"}
              </SubmitButton>
              <Button onClick={() => setIsEditing(false)}>
                {"account.cancel"}
              </Button>
            </div>
          </form>
        </div>
      </div>
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
