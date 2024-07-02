import { useState, useEffect, useContext } from "react";
import { AccountInteractor } from "../../../usecases/account/AccountInteractor.js";
import { AccountRepository } from "../../repositories/AccountRepository.js";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { AccountTemplate } from "../templates";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewAccountForm, AccountsOverview } from "../organisms";

// Initialisierung des AccountRepository und des AccountInteractor
const accountRepository = new AccountRepository();
const accountInteractor = new AccountInteractor(accountRepository);
const cryptographyInteractor = new CryptographyInteractor();

export const AccountsPage = () => {
  const { masterPassword } = useContext(AuthContext);

  const [accounts, setAccounts] = useState([]);
  const [newAccountFormValues, setNewAccountFormValues] = useState({
    accountName: "",
    accountUrl: "",
    username: "",
    email: "",
    password: "",
    notes: "",
  });

  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccountFormValues({ ...newAccountFormValues, [name]: value });
  };

  const decryptAccountData = async (accountData, masterPassword) => {
    // Check whether the input is an array or needs to be converted into an array
    const accounts = Array.isArray(accountData) ? accountData : [accountData];

    const decryptedAccounts = await Promise.all(
      accounts.map(async (account) => {
        const decryptionResultPassword =
          await cryptographyInteractor.decryptData({
            encryptedData: account.encryptedPassword,
            iv: account.passwordEncryptionIv,
            salt: account.passwordEncryptionSalt,
            masterPassword: masterPassword,
          });

        const decryptedPassword = decryptionResultPassword.success
          ? decryptionResultPassword.data
          : "";

        const decryptionResultNotes = account.encryptedNotes
          ? await cryptographyInteractor.decryptData({
              encryptedData: account.encryptedNotes,
              iv: account.notesEncryptionIv,
              salt: account.notesEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedNotes = decryptionResultNotes.success
          ? decryptionResultNotes.data
          : "";

        return {
          ...account,
          decryptedPassword,
          decryptedNotes,
        };
      })
    );

    return Array.isArray(accountData)
      ? decryptedAccounts
      : decryptedAccounts[0];
  };

  const getAccounts = async (masterPassword) => {
    setIsAccountLoading(true);

    const accountRequestResponse = await accountInteractor.getAccounts();
    if (!accountRequestResponse.success) {
      setMessage(
        accountRequestResponse.message || "Fehler beim Abrufen der Konten"
      );
      setMessageType("error");
      setAccounts([]);
      setIsAccountLoading(false);
      return;
    }

    const decryptedAccounts = await decryptAccountData(
      accountRequestResponse.accounts,
      masterPassword
    );
    if (!decryptedAccounts) {
      setMessage("Fehler beim Entschlüsseln der Konten");
      setMessageType("error");
      setAccounts([]);
      return;
    }

    setIsAccountLoading(false);
    setAccounts(decryptedAccounts);
    setMessage(accountRequestResponse.message);
    setMessageType("success");
  };

  useEffect(() => {
    getAccounts(masterPassword);
  }, []);

  const handleCreateAccount = async (e, masterPassword) => {
    e.preventDefault();
    setIsAccountLoading(true);

    const validateAccount = await accountInteractor.validateCreateAccount({
      accountName: newAccountFormValues.accountName,
      accountUrl: newAccountFormValues.accountUrl,
      username: newAccountFormValues.username,
      email: newAccountFormValues.email,
      password: newAccountFormValues.password,
      notes: newAccountFormValues.notes,
    });
    if (validateAccount && validateAccount.validationError) {
      setIsAccountLoading(false);
      setMessage(`validationError.${validateAccount.validationError}`);
      setMessageType("error");
      return;
    }

    const encryptedPasswordObj = await cryptographyInteractor.encryptData({
      text: newAccountFormValues.password,
      masterPassword: masterPassword,
    });

    let encryptedNotesObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (newAccountFormValues.notes) {
      encryptedNotesObj = await cryptographyInteractor.encryptData({
        text: newAccountFormValues.notes,
        masterPassword: masterPassword,
      });
    }

    const creationResponse = await accountInteractor.createAccount({
      accountName: newAccountFormValues.accountName,
      accountUrl: newAccountFormValues.accountUrl,
      username: newAccountFormValues.username,
      email: newAccountFormValues.email,
      encryptedPassword: encryptedPasswordObj.data.encryptedData,
      passwordEncryptionIv: encryptedPasswordObj.data.iv,
      passwordEncryptionSalt: encryptedPasswordObj.data.salt,
      encryptedNotes: encryptedNotesObj.data.encryptedData,
      notesEncryptionIv: encryptedNotesObj.data.iv,
      notesEncryptionSalt: encryptedNotesObj.data.salt,
    });

    if (creationResponse.validationError) {
      setIsAccountLoading(false);
      setMessage(`validationError.${creationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (!creationResponse.success) {
      setIsAccountLoading(false);
      setMessage(creationResponse.message);
      setMessageType("error");
      return;
    }

    const decryptedAccount = await decryptAccountData(
      creationResponse.account,
      masterPassword
    );

    setAccounts((prevAccounts) => [...prevAccounts, decryptedAccount]);
    setIsAccountLoading(false);
    setNewAccountFormValues({
      accountName: "",
      accountUrl: "",
      username: "",
      email: "",
      password: "",
      notes: "",
    });
    setMessage(creationResponse.message);
    setMessageType("success");
  };

  const handleSelectAccountForEdit = (accountId) => {
    const account = accounts.find((acc) => acc.accountId === accountId);
    if (account) {
      setNewAccountFormValues({
        accountName: account.accountName,
        accountUrl: account.accountUrl,
        username: account.username,
        email: account.email,
        password: account.decryptedPassword,
        notes: account.decryptedNotes,
      });
    }
  };

  const handleEditAccount = async (e, accountId, formValues) => {
    e.preventDefault();
    setIsAccountLoading(true);

    const accountToUpdate = accounts.find((acc) => acc.accountId === accountId);

    if (!accountToUpdate) {
      setIsAccountLoading(false);
      return;
    }

    const validateAccount = await accountInteractor.validateEditAccount({
      accountName: formValues.accountName,
      accountUrl: formValues.accountUrl,
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      notes: formValues.notes,
    });

    if (validateAccount && validateAccount.validationError) {
      setIsAccountLoading(false);
      setMessage(`validationError.${validateAccount.validationError}`);
      setMessageType("error");
      return;
    }

    const encryptedPasswordObj = await cryptographyInteractor.encryptData({
      text: formValues.password,
      masterPassword: masterPassword,
    });

    let encryptedNotesObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (formValues.notes) {
      encryptedNotesObj = await cryptographyInteractor.encryptData({
        text: formValues.notes,
        masterPassword: masterPassword,
      });
    }

    const editResponse = await accountInteractor.editAccount(accountId, {
      accountName: formValues.accountName,
      accountUrl: formValues.accountUrl,
      username: formValues.username,
      email: formValues.email,
      encryptedPassword: encryptedPasswordObj.data.encryptedData,
      passwordEncryptionIv: encryptedPasswordObj.data.iv,
      passwordEncryptionSalt: encryptedPasswordObj.data.salt,
      encryptedNotes: encryptedNotesObj.data.encryptedData,
      notesEncryptionIv: encryptedNotesObj.data.iv,
      notesEncryptionSalt: encryptedNotesObj.data.salt,
    });

    if (!editResponse.success) {
      setIsAccountLoading(false);
      setMessage(editResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedAccount = accounts.map((account) => {
      if (account.accountId === accountId) {
        return {
          ...account,
          ...formValues,
          decryptedPassword: formValues.password,
          decryptedNotes: formValues.notes,
        };
      }
      return account;
    });

    setAccounts(updatedAccount);
    setIsAccountLoading(false);
    setMessage(editResponse.message);
    setMessageType("success");
  };

  const handleDeleteAccount = async (accountId) => {
    setIsAccountLoading(true);

    const accountToDelete = accounts.find((acc) => acc.accountId === accountId);

    if (!accountToDelete) {
      setIsAccountLoading(false);
      return;
    }

    const deletionResponse = await accountInteractor.deleteAccount(accountId);

    if (!deletionResponse.success) {
      setIsAccountLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedAccounts = accounts.filter(
      (account) => account.accountId !== accountId
    );

    setAccounts(updatedAccounts);
    setIsAccountLoading(false);
    setMessage(deletionResponse.message);
    setMessageType("success");
  };

  return (
    <AccountTemplate>
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="account-page__flash-message"
      />
      <NewAccountForm
        formValues={newAccountFormValues}
        setFormValues={setNewAccountFormValues}
        handleChange={handleChange}
        handleSubmit={(e) => handleCreateAccount(e, masterPassword)}
        isAccountLoading={isAccountLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <AccountsOverview
        accounts={accounts}
        onSelectAccount={handleSelectAccountForEdit}
        onEditAccount={handleEditAccount}
        onDeleteAccount={handleDeleteAccount}
        isAccountLoading={isAccountLoading}
        message={message}
        messageType={messageType}
      />
    </AccountTemplate>
  );
};
