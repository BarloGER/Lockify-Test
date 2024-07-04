import { useState, useEffect, useContext } from "react";
import { BankInteractor } from "../../../usecases/bank/BankInteractor.js";
import { BankRepository } from "../../repositories/BankRepository.js";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor.js";
import { AuthContext } from "../../context/AuthContext.jsx";
import { BankTemplate } from "../templates";
import { FlashMessage } from "../molecules/FlashMessage.jsx";
import { NewBankForm, BanksOverview } from "../organisms";

// Initialisierung des BankRepository und des BankInteractor
const bankRepository = new BankRepository();
const bankInteractor = new BankInteractor(bankRepository);
const cryptographyInteractor = new CryptographyInteractor();

export const BanksPage = () => {
  const { masterPassword } = useContext(AuthContext);

  const [banks, setBanks] = useState([]);
  const [newBankFormValues, setNewBankFormValues] = useState({
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

  const [isBankLoading, setIsBankLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBankFormValues({ ...newBankFormValues, [name]: value });
  };

  const decryptBankData = async (bankData, masterPassword) => {
    // Check whether the input is an array or needs to be converted into an array
    const banks = Array.isArray(bankData) ? bankData : [bankData];

    const decryptedBanks = await Promise.all(
      banks.map(async (bank) => {
        const decryptionResultIban = bank.encryptedIban
          ? await cryptographyInteractor.decryptData({
              encryptedData: bank.encryptedIban,
              iv: bank.ibanEncryptionIv,
              salt: bank.ibanEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedIban = decryptionResultIban.success
          ? decryptionResultIban.data
          : "";

        const decryptionResultCardNumber = bank.encryptedCardNumber
          ? await cryptographyInteractor.decryptData({
              encryptedData: bank.encryptedCardNumber,
              iv: bank.cardNumberEncryptionIv,
              salt: bank.cardNumberEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedCardNumber = decryptionResultCardNumber.success
          ? decryptionResultCardNumber.data
          : "";

        const decryptionResultCardCvvCvc = bank.encryptedCardCvvCvc
          ? await cryptographyInteractor.decryptData({
              encryptedData: bank.encryptedCardCvvCvc,
              iv: bank.cardCvvCvcEncryptionIv,
              salt: bank.cardCvvCvcEncryptionSalt,
              masterPassword: masterPassword,
            })
          : { success: true, data: "" };

        const decryptedCardCvvCvc = decryptionResultCardCvvCvc.success
          ? decryptionResultCardCvvCvc.data
          : "";

        return {
          ...bank,
          decryptedIban,
          decryptedCardNumber,
          decryptedCardCvvCvc,
        };
      })
    );

    return Array.isArray(bankData) ? decryptedBanks : decryptedBanks[0];
  };

  const getBanks = async (masterPassword) => {
    setIsBankLoading(true);

    const bankRequestResponse = await bankInteractor.getBanks();
    if (!bankRequestResponse.success) {
      setMessage(
        bankRequestResponse.message || "Fehler beim Abrufen der Konten"
      );
      setMessageType("error");
      setBanks([]);
      setIsBankLoading(false);
      return;
    }

    const decryptedBanks = await decryptBankData(
      bankRequestResponse.banks,
      masterPassword
    );
    if (!decryptedBanks) {
      setMessage("Fehler beim Entschlüsseln der Konten");
      setMessageType("error");
      setBanks([]);
      return;
    }

    setIsBankLoading(false);
    setBanks(decryptedBanks);
    setMessage(bankRequestResponse.message);
    setMessageType("success");
  };

  useEffect(() => {
    getBanks(masterPassword);
  }, []);

  const handleCreateBank = async (e, masterPassword) => {
    e.preventDefault();
    setIsBankLoading(true);

    const validateBank = await bankInteractor.validateCreateBank({
      bankName: newBankFormValues.bankName,
      accountHolderFirstName: newBankFormValues.accountHolderFirstName,
      accountHolderLastName: newBankFormValues.accountHolderLastName,
      iban: newBankFormValues.iban,
      swiftBic: newBankFormValues.swiftBic,
      accountType: newBankFormValues.accountType,
      branchCode: newBankFormValues.branchCode,
      cardHolderFirstName: newBankFormValues.cardHolderFirstName,
      cardHolderLastName: newBankFormValues.cardHolderLastName,
      cardNumber: newBankFormValues.cardNumber,
      expiryDate: newBankFormValues.expiryDate,
      cardCvvCvc: newBankFormValues.cardCvvCvc,
      cardType: newBankFormValues.cardType,
    });
    if (validateBank && validateBank.validationError) {
      setIsBankLoading(false);
      setMessage(`validationError.${validateBank.validationError}`);
      setMessageType("error");
      return;
    }

    let encryptedIbanObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (newBankFormValues.iban) {
      encryptedIbanObj = await cryptographyInteractor.encryptData({
        text: newBankFormValues.iban,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardNumberObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (newBankFormValues.cardNumber) {
      encryptedCardNumberObj = await cryptographyInteractor.encryptData({
        text: newBankFormValues.cardNumber,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardCvvCvcObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (newBankFormValues.cardCvvCvc) {
      encryptedCardCvvCvcObj = await cryptographyInteractor.encryptData({
        text: newBankFormValues.cardCvvCvc,
        masterPassword: masterPassword,
      });
    }

    const creationResponse = await bankInteractor.createBank({
      bankName: newBankFormValues.bankName,
      accountHolderFirstName: newBankFormValues.accountHolderFirstName,
      accountHolderLastName: newBankFormValues.accountHolderLastName,
      encryptedIban: encryptedIbanObj.data.encryptedData,
      ibanEncryptionIv: encryptedIbanObj.data.iv,
      ibanEncryptionSalt: encryptedIbanObj.data.salt,
      swiftBic: newBankFormValues.swiftBic,
      accountType: newBankFormValues.accountType,
      branchCode: newBankFormValues.branchCode,
      cardHolderFirstName: newBankFormValues.cardHolderFirstName,
      cardHolderLastName: newBankFormValues.cardHolderLastName,
      encryptedCardNumber: encryptedCardNumberObj.data.encryptedData,
      cardNumberEncryptionIv: encryptedCardNumberObj.data.iv,
      cardNumberEncryptionSalt: encryptedCardNumberObj.data.salt,
      expiryDate: newBankFormValues.expiryDate,
      encryptedCardCvvCvc: encryptedCardCvvCvcObj.data.encryptedData,
      cardCvvCvcEncryptionIv: encryptedCardCvvCvcObj.data.iv,
      cardCvvCvcEncryptionSalt: encryptedCardCvvCvcObj.data.salt,
      cardType: newBankFormValues.cardType,
    });

    if (creationResponse.validationError) {
      setIsBankLoading(false);
      setMessage(`validationError.${creationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (!creationResponse.success) {
      setIsBankLoading(false);
      setMessage(creationResponse.message);
      setMessageType("error");
      return;
    }

    const decryptedBank = await decryptBankData(
      creationResponse.bank,
      masterPassword
    );

    setBanks((prevBanks) => [...prevBanks, decryptedBank]);
    setIsBankLoading(false);
    setNewBankFormValues({
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
    setMessage(creationResponse.message);
    setMessageType("success");
  };

  const handleSelectBankForEdit = (bankId) => {
    const bank = banks.find((acc) => acc.bankId === bankId);
    if (bank) {
      setNewBankFormValues({
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

  const handleEditBank = async (e, bankId, formValues) => {
    console.log("editvalues", formValues);
    e.preventDefault();
    setIsBankLoading(true);

    const bankToUpdate = banks.find((acc) => acc.bankId === bankId);

    if (!bankToUpdate) {
      setIsBankLoading(false);
      return;
    }

    const validateBank = await bankInteractor.validateEditBank({
      bankName: formValues.bankName,
      accountHolderFirstName: formValues.accountHolderFirstName,
      accountHolderLastName: formValues.accountHolderLastName,
      iban: formValues.iban,
      swiftBic: formValues.swiftBic,
      accountType: formValues.accountType,
      branchCode: formValues.branchCode,
      cardHolderFirstName: formValues.cardHolderFirstName,
      cardHolderLastName: formValues.cardHolderLastName,
      cardNumber: formValues.cardNumber,
      expiryDate: formValues.expiryDate,
      cardCvvCvc: formValues.cardCvvCvc,
      cardType: formValues.cardType,
    });

    if (validateBank && validateBank.validationError) {
      setIsBankLoading(false);
      setMessage(`validationError.${validateBank.validationError}`);
      setMessageType("error");
      return;
    }

    let encryptedIbanObj = { data: { encryptedData: "", iv: "", salt: "" } };
    if (formValues.iban) {
      encryptedIbanObj = await cryptographyInteractor.encryptData({
        text: formValues.iban,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardNumberObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (formValues.cardNumber) {
      encryptedCardNumberObj = await cryptographyInteractor.encryptData({
        text: formValues.cardNumber,
        masterPassword: masterPassword,
      });
    }

    let encryptedCardCvvCvcObj = {
      data: { encryptedData: "", iv: "", salt: "" },
    };
    if (formValues.cardCvvCvc) {
      encryptedCardCvvCvcObj = await cryptographyInteractor.encryptData({
        text: formValues.cardCvvCvc,
        masterPassword: masterPassword,
      });
    }

    const editResponse = await bankInteractor.editBank(bankId, {
      bankName: formValues.bankName,
      accountHolderFirstName: formValues.accountHolderFirstName,
      accountHolderLastName: formValues.accountHolderLastName,
      encryptedIban: encryptedIbanObj.data.encryptedData,
      ibanEncryptionIv: encryptedIbanObj.data.iv,
      ibanEncryptionSalt: encryptedIbanObj.data.salt,
      swiftBic: formValues.swiftBic,
      accountType: formValues.accountType,
      branchCode: formValues.branchCode,
      cardHolderFirstName: formValues.cardHolderFirstName,
      cardHolderLastName: formValues.cardHolderLastName,
      encryptedCardNumber: encryptedCardNumberObj.data.encryptedData,
      cardNumberEncryptionIv: encryptedCardNumberObj.data.iv,
      cardNumberEncryptionSalt: encryptedCardNumberObj.data.salt,
      expiryDate: formValues.expiryDate,
      encryptedCardCvvCvc: encryptedCardCvvCvcObj.data.encryptedData,
      cardCvvCvcEncryptionIv: encryptedCardCvvCvcObj.data.iv,
      cardCvvCvcEncryptionSalt: encryptedCardCvvCvcObj.data.salt,
      cardType: formValues.cardType,
    });

    if (!editResponse.success) {
      setIsBankLoading(false);
      setMessage(editResponse.message);
      setMessageType("error");
      return;
    }

    // Update local state
    const updatedBank = banks.map((bank) => {
      if (bank.bankId === bankId) {
        return {
          ...bank,
          ...formValues,
          decryptedIban: formValues.iban,
          decryptedCardNumber: formValues.cardNumber,
          decryptedCardCvvCvc: formValues.cardCvvCvc,
        };
      }
      return bank;
    });

    setBanks(updatedBank);
    setIsBankLoading(false);
    setMessage(editResponse.message);
    setMessageType("success");
  };

  const handleDeleteBank = async (bankId) => {
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
      <FlashMessage
        message={message}
        setMessage={setMessage}
        type={messageType}
        className="bank-page__flash-message"
      />
      <NewBankForm
        formValues={newBankFormValues}
        setFormValues={setNewBankFormValues}
        handleChange={handleChange}
        handleSubmit={(e) => handleCreateBank(e, masterPassword)}
        isBankLoading={isBankLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
      <BanksOverview
        banks={banks}
        onSelectBank={handleSelectBankForEdit}
        onEditBank={handleEditBank}
        onDeleteBank={handleDeleteBank}
        isBankLoading={isBankLoading}
        message={message}
        messageType={messageType}
      />
    </BankTemplate>
  );
};
