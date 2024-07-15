import { useState, useContext } from "react";
import { DataVaultContext } from "../../context/DataVaultContext.jsx";
import { BankTemplate } from "../templates";
import { SearchInput } from "../atoms";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewBankForm, BanksOverview } from "../organisms";

export const BanksPage = () => {
  const {
    masterPassword,
    banks,
    setBanks,
    bankInteractor,
    cryptographyInteractor,
    isDataVaultUnlocked,
  } = useContext(DataVaultContext);

  const [newBankFormData, setNewBankFormData] = useState({
    bankName: "",
    accountHolderFirstName: "",
    accountHolderLastName: "",
    iban: "",
    swiftBic: "",
    accountType: "",
    branchCode: "",
    cardHolderFirstName: "",
    cardHolderLastName: "",
    cardNumber: "",
    expiryDate: "",
    cardCvvCvc: "",
    cardType: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("bankName");
  const [isBankLoading, setIsBankLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  if (!isDataVaultUnlocked) {
    return;
  }

  const searchOptions = [
    { value: "bankName" },
    { value: "accountHolderFirstName" },
    { value: "accountHolderLastName" },
    { value: "swiftBic" },
    { value: "accountType" },
    { value: "branchCode" },
    { value: "cardHolderFirstName" },
    { value: "cardHolderLastName" },
    { value: "cardType" },
  ];
  const filteredBanks = banks.filter((bank) =>
    bank[selectedOption].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBankFormData({ ...newBankFormData, [name]: value });
  };

  const processCreateBank = async (e, masterPassword) => {
    e.preventDefault();
    setIsBankLoading(true);

    const unvalidatedUserInput = newBankFormData;
    const validateUserInput =
      await bankInteractor.validateUserInputForCreateBank(unvalidatedUserInput);
    if (!validateUserInput.success) {
      setIsBankLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validBankEntity = validateUserInput.validBankEntity;

    let encryptedIban = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.iban) {
      encryptedIban = await cryptographyInteractor.encryptData({
        text: validBankEntity.iban,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardNumber = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.cardNumber) {
      encryptedCardNumber = await cryptographyInteractor.encryptData({
        text: validBankEntity.cardNumber,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardCvvCvc = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.cardCvvCvc) {
      encryptedCardCvvCvc = await cryptographyInteractor.encryptData({
        text: validBankEntity.cardCvvCvc,
        masterPassword: masterPassword,
      });
    }

    const encryptedBankData = {
      bankName: validBankEntity.bankName,
      accountHolderFirstName: validBankEntity.accountHolderFirstName,
      accountHolderLastName: validBankEntity.accountHolderLastName,
      encryptedIban: encryptedIban.encryptedData,
      ibanEncryptionIv: encryptedIban.iv,
      ibanEncryptionSalt: encryptedIban.salt,
      swiftBic: validBankEntity.swiftBic,
      accountType: validBankEntity.accountType,
      branchCode: validBankEntity.branchCode,
      cardHolderFirstName: validBankEntity.cardHolderFirstName,
      cardHolderLastName: validBankEntity.cardHolderLastName,
      encryptedCardNumber: encryptedCardNumber.encryptedData,
      cardNumberEncryptionIv: encryptedCardNumber.iv,
      cardNumberEncryptionSalt: encryptedCardNumber.salt,
      expiryDate: validBankEntity.expiryDate,
      encryptedCardCvvCvc: encryptedCardCvvCvc.encryptedData,
      cardCvvCvcEncryptionIv: encryptedCardCvvCvc.iv,
      cardCvvCvcEncryptionSalt: encryptedCardCvvCvc.salt,
      cardType: validBankEntity.cardType,
    };

    const createBankResponse = await bankInteractor.createBank(
      encryptedBankData
    );
    if (
      !createBankResponse.success &&
      createBankResponse.message === "Failed to fetch"
    ) {
      setIsBankLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!createBankResponse.success) {
      setIsBankLoading(false);
      setMessage(createBankResponse.message);
      setMessageType("error");
      return;
    }

    setBanks((prevBanks) => [
      ...prevBanks,
      {
        ...createBankResponse.bank,
        decryptedIban: validBankEntity.iban,
        decryptedCardNumber: validBankEntity.cardNumber,
        decryptedCardCvvCvc: validBankEntity.cardCvvCvc,
      },
    ]);
    setIsBankLoading(false);
    setNewBankFormData({
      bankName: "",
      accountHolderFirstName: "",
      accountHolderLastName: "",
      iban: "",
      swiftBic: "",
      accountType: "",
      branchCode: "",
      cardHolderFirstName: "",
      cardHolderLastName: "",
      cardNumber: "",
      expiryDate: "",
      cardCvvCvc: "",
      cardType: "",
    });
    setMessage(createBankResponse.message);
    setMessageType("success");
  };

  const handleSelectBankForEdit = (bankId) => {
    const bank = banks.find((acc) => acc.bankId === bankId);
    if (bank) {
      setNewBankFormData({
        bankName: bank.bankName,
        accountHolderFirstName: bank.accountHolderFirstName,
        accountHolderLastName: bank.accountHolderLastName,
        iban: bank.decryptedIban,
        swiftBic: bank.swiftBic,
        accountType: bank.accountType,
        branchCode: bank.branchCode,
        cardHolderFirstName: bank.cardHolderFirstName,
        cardHolderLastName: bank.cardHolderLastName,
        cardNumber: bank.decryptedCardNumber,
        expiryDate: bank.expiryDate,
        cardCvvCvc: bank.decryptedCardCvvCvc,
        cardType: bank.cardType,
      });
    }
  };

  const processUpdateBank = async (
    e,
    bankId,
    updateBankFormData,
    setIsEditing
  ) => {
    e.preventDefault();
    setIsBankLoading(true);

    const bankToUpdate = banks.find((acc) => acc.bankId === bankId);

    if (!bankToUpdate) {
      setIsBankLoading(false);
      return;
    }

    const unvalidatedUserInput = newBankFormData;
    const validateUserInput =
      await bankInteractor.validateUserInputForCreateBank(unvalidatedUserInput);
    if (!validateUserInput.success) {
      setIsBankLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validBankEntity = validateUserInput.validBankEntity;

    let encryptedIban = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.iban) {
      encryptedIban = await cryptographyInteractor.encryptData({
        text: validBankEntity.iban,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardNumber = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.cardNumber) {
      encryptedCardNumber = await cryptographyInteractor.encryptData({
        text: validBankEntity.cardNumber,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardCvvCvc = {
      success: true,
      encryptedData: "",
      iv: "",
      salt: "",
    };
    if (validBankEntity.cardCvvCvc) {
      encryptedCardCvvCvc = await cryptographyInteractor.encryptData({
        text: validBankEntity.cardCvvCvc,
        masterPassword: masterPassword,
      });
    }

    const encryptedBankData = {
      bankName: validBankEntity.bankName,
      accountHolderFirstName: validBankEntity.accountHolderFirstName,
      accountHolderLastName: validBankEntity.accountHolderLastName,
      encryptedIban: encryptedIban.encryptedData,
      ibanEncryptionIv: encryptedIban.iv,
      ibanEncryptionSalt: encryptedIban.salt,
      swiftBic: validBankEntity.swiftBic,
      accountType: validBankEntity.accountType,
      branchCode: validBankEntity.branchCode,
      cardHolderFirstName: validBankEntity.cardHolderFirstName,
      cardHolderLastName: validBankEntity.cardHolderLastName,
      encryptedCardNumber: encryptedCardNumber.encryptedData,
      cardNumberEncryptionIv: encryptedCardNumber.iv,
      cardNumberEncryptionSalt: encryptedCardNumber.salt,
      expiryDate: validBankEntity.expiryDate,
      encryptedCardCvvCvc: encryptedCardCvvCvc.encryptedData,
      cardCvvCvcEncryptionIv: encryptedCardCvvCvc.iv,
      cardCvvCvcEncryptionSalt: encryptedCardCvvCvc.salt,
      cardType: validBankEntity.cardType,
    };

    const updateBankResponse = await bankInteractor.updateBank(
      bankId,
      encryptedBankData
    );
    if (!updateBankResponse.success) {
      setIsBankLoading(false);
      setMessage(updateBankResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state to avoid decryption
    const updatedBank = banks.map((bank) => {
      if (bank.bankId === bankId) {
        return {
          ...bank,
          ...validBankEntity,
          decryptedIban: validBankEntity.iban,
          decryptedCardNumber: validBankEntity.cardNumber,
          decryptedCardCvvCvc: validBankEntity.cardCvvCvc,
        };
      }
      return bank;
    });

    setBanks(updatedBank);
    setIsBankLoading(false);
    setIsEditing(false);
    setMessage(updateBankResponse.message);
    setMessageType("success");
  };

  const processDeleteBank = async (bankId) => {
    setIsBankLoading(true);

    const bankToDelete = banks.find((acc) => acc.bankId === bankId);

    if (!bankToDelete) {
      setIsBankLoading(false);
      return;
    }

    const deletionResponse = await bankInteractor.deleteBank(bankId);
    if (!deletionResponse.success) {
      setIsBankLoading(false);
      setMessage(deletionResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedBanks = banks.filter((bank) => bank.bankId !== bankId);

    setBanks(updatedBanks);
    setIsBankLoading(false);
    setMessage(deletionResponse.message);
    setMessageType("success");
  };

  return (
    <BankTemplate>
      <SearchInput
        placeholder={selectedOption}
        onSearchChange={setSearchTerm}
        searchOptions={searchOptions}
        onOptionChange={(e) => setSelectedOption(e.target.value)}
        selectedOption={selectedOption}
        pageName="banksPage"
      />
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="bank-page__flash-message"
      />
      <NewBankForm
        newBankFormData={newBankFormData}
        setNewBankFormData={setNewBankFormData}
        handleChange={handleChange}
        processCreateBank={(e) => processCreateBank(e, masterPassword)}
        isBankLoading={isBankLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <BanksOverview
        banks={filteredBanks}
        handleSelectBankForEdit={handleSelectBankForEdit}
        processUpdateBank={processUpdateBank}
        processDeleteBank={processDeleteBank}
        isBankLoading={isBankLoading}
        message={message}
        messageType={messageType}
      />
    </BankTemplate>
  );
};
