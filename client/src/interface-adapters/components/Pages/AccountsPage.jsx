import { useState, useContext } from "react";
import { DataVaultContext } from "../../context/DataVaultContext.jsx";
import { AccountTemplate } from "../templates";
import { SearchInput } from "../atoms";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewAccountForm, AccountsOverview } from "../organisms";

export const AccountsPage = () => {
  const {
    masterPassword,
    accounts,
    setAccounts,
    accountInteractor,
    cryptographyInteractor,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  const [newAccountFormData, setNewAccountFormData] = useState({
    accountName: "",
    accountUrl: "",
    username: "",
    email: "",
    password: "",
    notes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("accountName");
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isDataVaultUnlocked) {
    return;
  }

  const searchOptions = [
    { value: "accountName" },
    { value: "username" },
    { value: "email" },
    { value: "accountUrl" },
  ];
  const filteredAccounts = accounts.filter((account) =>
    account[selectedOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccountFormData({ ...newAccountFormData, [name]: value });
  };

  const processCreateAccount = async (e, masterPassword) => {
    e.preventDefault();
    setIsAccountLoading(true);

    const unvalidatedUserInput = newAccountFormData;
    const validateUserInput =
      await accountInteractor.validateUserInputForCreateAccount(
        unvalidatedUserInput
      );
    if (!validateUserInput.success) {
      setIsAccountLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validAccountEntity = validateUserInput.validAccountEntity;

    let encryptedPassword = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validAccountEntity.password) {
      encryptedPassword = await cryptographyInteractor.encryptData({
        text: validAccountEntity.password,
        masterPassword: masterPassword,
      });
    }

    let encryptedNotes = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validAccountEntity.notes) {
      encryptedNotes = await cryptographyInteractor.encryptData({
        text: validAccountEntity.notes,
        masterPassword: masterPassword,
      });
    }

    const encryptedAccountData = {
      accountName: validAccountEntity.accountName,
      accountUrl: validAccountEntity.accountUrl,
      username: validAccountEntity.username,
      email: validAccountEntity.email,
      encryptedPassword: encryptedPassword.encryptedData,
      passwordEncryptionIv: encryptedPassword.iv,
      passwordEncryptionSalt: encryptedPassword.salt,
      encryptedNotes: encryptedNotes.encryptedData,
      notesEncryptionIv: encryptedNotes.iv,
      notesEncryptionSalt: encryptedNotes.salt,
    };

    const createAccountResponse = await accountInteractor.createAccount(
      encryptedAccountData
    );
    if (
      !createAccountResponse.success &&
      createAccountResponse.message === "Failed to fetch"
    ) {
      setIsAccountLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!createAccountResponse.success) {
      setIsAccountLoading(false);
      setMessage(createAccountResponse.message);
      setMessageType("error");
      return;
    }

    setAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        ...createAccountResponse.account,
        decryptedPassword: validAccountEntity.password,
        decryptedNotes: validAccountEntity.notes,
      },
    ]);
    setIsAccountLoading(false);
    setNewAccountFormData({
      accountName: "",
      accountUrl: "",
      username: "",
      email: "",
      password: "",
      notes: "",
    });
    setMessage(createAccountResponse.message);
    setMessageType("success");
  };

  const handleSelectAccountForEdit = (accountId) => {
    const account = accounts.find((acc) => acc.accountId === accountId);
    if (account) {
      setNewAccountFormData({
        accountName: account.accountName,
        accountUrl: account.accountUrl,
        username: account.username,
        email: account.email,
        password: account.decryptedPassword,
        notes: account.decryptedNotes,
      });
    }
  };

  const processUpdateAccount = async (
    e,
    accountId,
    updateAccountFormData,
    setIsEditing
  ) => {
    e.preventDefault();
    setIsAccountLoading(true);

    const accountToUpdate = accounts.find((acc) => acc.accountId === accountId);

    if (!accountToUpdate) {
      setIsAccountLoading(false);
      return;
    }

    const unvalidatedUserInput = updateAccountFormData;
    const validateUserInput =
      await accountInteractor.validateUserInputForUpdateAccount(
        unvalidatedUserInput
      );
    if (!validateUserInput.success) {
      setIsAccountLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validAccountEntity = validateUserInput.validAccountEntity;
    console.log(validAccountEntity);

    let encryptedPassword = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validAccountEntity.password) {
      encryptedPassword = await cryptographyInteractor.encryptData({
        text: validAccountEntity.password,
        masterPassword: masterPassword,
      });
    }

    let encryptedNotes = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validAccountEntity.notes) {
      encryptedNotes = await cryptographyInteractor.encryptData({
        text: validAccountEntity.notes,
        masterPassword: masterPassword,
      });
    }

    const encryptedAccountData = {
      accountName: validAccountEntity.accountName,
      accountUrl: validAccountEntity.accountUrl,
      username: validAccountEntity.username,
      email: validAccountEntity.email,
      encryptedPassword: encryptedPassword.encryptedData,
      passwordEncryptionIv: encryptedPassword.iv,
      passwordEncryptionSalt: encryptedPassword.salt,
      encryptedNotes: encryptedNotes.encryptedData,
      notesEncryptionIv: encryptedNotes.iv,
      notesEncryptionSalt: encryptedNotes.salt,
    };

    const updateAccountResponse = await accountInteractor.updateAccount(
      accountId,
      encryptedAccountData
    );
    if (!updateAccountResponse.success) {
      setIsAccountLoading(false);
      setMessage(updateAccountResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state to avoid decryption
    const updatedAccount = accounts.map((account) => {
      if (account.accountId === accountId) {
        return {
          ...account,
          ...validAccountEntity,
          decryptedPassword: validAccountEntity.password,
          decryptedNotes: validAccountEntity.notes,
        };
      }
      return account;
    });

    setAccounts(updatedAccount);
    setIsAccountLoading(false);
    setIsEditing(false);
    setMessage(updateAccountResponse.message);
    setMessageType("success");
  };

  const processDeleteAccount = async (accountId) => {
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
      <SearchInput
        placeholder={selectedOption}
        onSearchChange={setSearchTerm}
        searchOptions={searchOptions}
        onOptionChange={(e) => setSelectedOption(e.target.value)}
        selectedOption={selectedOption}
        pageName="accountsPage"
      />
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="account-page__flash-message"
      />
      <NewAccountForm
        newAccountFormData={newAccountFormData}
        setNewAccountFormData={setNewAccountFormData}
        handleChange={handleChange}
        processCreateAccount={(e) => processCreateAccount(e, masterPassword)}
        isAccountLoading={isAccountLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <AccountsOverview
        accounts={filteredAccounts}
        handleSelectAccountForEdit={handleSelectAccountForEdit}
        processUpdateAccount={processUpdateAccount}
        processDeleteAccount={processDeleteAccount}
        isAccountLoading={isAccountLoading}
        message={message}
        messageType={messageType}
      />
    </AccountTemplate>
  );
};
