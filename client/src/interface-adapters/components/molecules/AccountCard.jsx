import { useTranslation } from "react-i18next";
import { useState } from "react";
import PropTypes from "prop-types";
import { Input, Span, Button } from "../atoms";
import { SubmitButton } from "./SubmitButton";
import "./assets/account-card.css";

export const AccountCard = ({
  account,
  onSelect,
  onEdit,
  onDelete,
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
    const formValues = {
      accountName: e.target.accountName.value,
      accountUrl: e.target.accountUrl.value,
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      notes: e.target.notes.value,
    };

    onEdit(e, account.accountId, formValues);
  };

  return (
    <div className={`account__card ${isEditing ? "editing" : ""}`}>
      <div className="account__card_inner">
        <div
          className="account__card_front"
          onClick={() => onSelect(account.accountId)}
        >
          <h3>{account.accountName}</h3>
          <p>
            <strong>{t("account.accountUrl")}:</strong>{" "}
            <a
              href={account.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {account.accountUrl || t("account.noUrl")}
            </a>
          </p>
          <p>
            <strong>{t("account.username")}:</strong>{" "}
            <Span text={account.username} />
          </p>
          <p>
            <strong>{t("account.email")}:</strong> <Span text={account.email} />
          </p>
          <p>
            <strong>{t("account.password")}:</strong>{" "}
            <Span
              text={isPasswordHidden ? "*********" : account.decryptedPassword}
            />
            <Button onClick={() => setIsPasswordHidden(!isPasswordHidden)}>
              Show
            </Button>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(account.decryptedPassword)
              }
            >
              Copy
            </Button>
          </p>
          <p>
            <strong>{t("account.notes")}:</strong>{" "}
            <Span text={account.decryptedNotes} />
          </p>
          {isDeleting ? (
            <>
              <Button
                type="button"
                onClick={() => {
                  onDelete(account.accountId), setIsDeleting(false);
                }}
              >
                {t("account.submitDelete")}
              </Button>
              <Button onClick={() => setIsDeleting(false)}>
                {t("account.cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEditing(!isEditing)}>
                {t("account.edit")}
              </Button>
              <Button onClick={() => setIsDeleting(true)}>
                {t("account.delete")}
              </Button>
            </>
          )}
        </div>
        <div className="account__card_back">
          <form onSubmit={handleSubmit} className="account__form">
            <Input
              id={`accountName-${account.accountId}`}
              label={t("account.accountName")}
              type="text"
              value={editedAccount.accountName}
              onChange={(e) => handleChange(e, "accountName")}
              name="accountName"
            />
            <Input
              id={`accountUrl-${account.accountId}`}
              label={t("account.accountUrl")}
              type="text"
              value={editedAccount.accountUrl}
              onChange={(e) => handleChange(e, "accountUrl")}
              name="accountUrl"
            />
            <Input
              id={`username-${account.accountId}`}
              label={t("account.username")}
              type="text"
              value={editedAccount.username}
              onChange={(e) => handleChange(e, "username")}
              name="username"
            />
            <Input
              id={`email-${account.accountId}`}
              label={t("account.email")}
              type="email"
              value={editedAccount.email}
              onChange={(e) => handleChange(e, "email")}
              name="email"
            />
            <Input
              id={`password-${account.accountId}`}
              label={t("account.password")}
              type="password"
              value={editedAccount.password}
              onChange={(e) => handleChange(e, "password")}
              name="password"
            />
            <Input
              id={`notes-${account.accountId}`}
              label={t("account.notes")}
              type="text"
              value={editedAccount.notes}
              onChange={(e) => handleChange(e, "notes")}
              name="notes"
            />
            <div>
              <SubmitButton isLoading={isLoading}>
                {t("account.submitEdit")}
              </SubmitButton>
              <Button onClick={() => setIsEditing(false)}>
                {t("account.cancel")}
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
    decryptedPassword: PropTypes.string.isRequired,
    decryptedNotes: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
