import PropTypes from "prop-types";
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import { AccountInteractor } from "../../usecases/account/AccountInteractor.js";
import { AccountRepository } from "../../interface-adapters/repositories/AccountRepository.js";
import { ContactInteractor } from "../../usecases/contact/ContactInteractor.js";
import { ContactRepository } from "../../interface-adapters/repositories/ContactRepository.js";
import { NoteInteractor } from "../../usecases/note/NoteInteractor.js";
import { NoteRepository } from "../../interface-adapters/repositories/NoteRepository.js";
import { BankInteractor } from "../../usecases/bank/BankInteractor.js";
import { BankRepository } from "../../interface-adapters/repositories/BankRepository.js";
import { CryptographyInteractor } from "../../usecases/cryptography/CryptographyInteractor.js";

export const DataVaultContext = createContext(null);

export const DataVaultProvider = ({ children }) => {
  const accountRepository = useMemo(() => new AccountRepository(), []);
  const accountInteractor = useMemo(
    () => new AccountInteractor(accountRepository),
    [accountRepository],
  );
  const contactRepository = useMemo(() => new ContactRepository(), []);
  const contactInteractor = useMemo(
    () => new ContactInteractor(contactRepository),
    [contactRepository],
  );
  const noteRepository = useMemo(() => new NoteRepository(), []);
  const noteInteractor = useMemo(
    () => new NoteInteractor(noteRepository),
    [noteRepository],
  );
  const bankRepository = useMemo(() => new BankRepository(), []);
  const bankInteractor = useMemo(
    () => new BankInteractor(bankRepository),
    [bankRepository],
  );
  const cryptographyInteractor = useMemo(
    () => new CryptographyInteractor(),
    [],
  );

  const [accounts, setAccounts] = useState(null);
  const [isAccountLoading, setIsAccountLoading] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [notes, setNotes] = useState(null);
  const [isNoteLoading, setIsNoteLoading] = useState(false);
  const [banks, setBanks] = useState(null);
  const [isBankLoading, setIsBankLoading] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [dataVaultLoadingRequest, setDataVaultLoadingRequest] = useState(false);
  const [isDataVaultUnlocked, setIsDataVaultUnlocked] = useState(false);
  const [inactivity, setInactivity] = useState(false);

  const fetchAndDecryptAccounts = useCallback(async () => {
    setIsAccountLoading(true);

    const accountRequestResponse = await accountInteractor.getAccounts();
    if (
      !accountRequestResponse.success ||
      !Array.isArray(accountRequestResponse.accounts)
    ) {
      setAccounts([]);
      setIsAccountLoading(false);
      return;
    }

    const decryptedAccounts = await Promise.all(
      accountRequestResponse.accounts.map(async (account) => {
        let decryptedPassword = "";
        let decryptedNotes = "";

        if (account.encryptedPassword) {
          const decryptPasswordResult =
            await cryptographyInteractor.decryptData({
              encryptedData: account.encryptedPassword,
              iv: account.passwordEncryptionIv,
              salt: account.passwordEncryptionSalt,
              masterPassword: masterPassword,
            });
          if (!decryptPasswordResult.success) {
            decryptedPassword = decryptPasswordResult.message;
          } else {
            decryptedPassword = decryptPasswordResult.data;
          }
        }

        if (account.encryptedNotes) {
          const decryptNotesResult = await cryptographyInteractor.decryptData({
            encryptedData: account.encryptedNotes,
            iv: account.notesEncryptionIv,
            salt: account.notesEncryptionSalt,
            masterPassword: masterPassword,
          });
          if (!decryptNotesResult.success) {
            decryptedNotes = decryptNotesResult.message;
          } else {
            decryptedNotes = decryptNotesResult.data;
          }
        }

        return { ...account, decryptedPassword, decryptedNotes };
      }),
    );

    setAccounts(decryptedAccounts);
    setIsAccountLoading(false);
  }, [accountInteractor, cryptographyInteractor, masterPassword]);

  const fetchAndDecryptContacts = useCallback(async () => {
    setIsContactLoading(true);

    const contactRequestResponse = await contactInteractor.getContacts();
    if (
      !contactRequestResponse.success ||
      !Array.isArray(contactRequestResponse.contacts)
    ) {
      setContacts([]);
      setIsContactLoading(false);
      return;
    }

    const decryptedContacts = await Promise.all(
      contactRequestResponse.contacts.map(async (contact) => {
        let decryptedNotes = "";

        if (contact.encryptedNotes) {
          const decryptNotesResult = await cryptographyInteractor.decryptData({
            encryptedData: contact.encryptedNotes,
            iv: contact.notesEncryptionIv,
            salt: contact.notesEncryptionSalt,
            masterPassword: masterPassword,
          });
          if (!decryptNotesResult.success) {
            decryptedNotes = decryptNotesResult.message;
          } else {
            decryptedNotes = decryptNotesResult.data;
          }
        }

        return { ...contact, decryptedNotes };
      }),
    );

    setContacts(decryptedContacts);
    setIsContactLoading(false);
  }, [contactInteractor, cryptographyInteractor, masterPassword]);

  const fetchAndDecryptNotes = useCallback(async () => {
    setIsNoteLoading(true);

    const noteRequestResponse = await noteInteractor.getNotes();
    if (
      !noteRequestResponse.success ||
      !Array.isArray(noteRequestResponse.notes)
    ) {
      setNotes([]);
      setIsNoteLoading(false);
      return;
    }

    const decryptedNotes = await Promise.all(
      noteRequestResponse.notes.map(async (note) => {
        let decryptedNoteContent = "";

        const decryptNoteTitle = await cryptographyInteractor.decryptData({
          encryptedData: note.encryptedNoteTitle,
          iv: note.noteTitleEncryptionIv,
          salt: note.noteTitleEncryptionSalt,
          masterPassword,
        });
        const decryptedNoteTitle = decryptNoteTitle.data;

        if (note.encryptedNoteContent) {
          const decryptNotesResult = await cryptographyInteractor.decryptData({
            encryptedData: note.encryptedNoteContent,
            iv: note.noteContentEncryptionIv,
            salt: note.noteContentEncryptionSalt,
            masterPassword: masterPassword,
          });
          if (!decryptNotesResult.success) {
            decryptedNoteContent = decryptNotesResult.message;
          } else {
            decryptedNoteContent = decryptNotesResult.data;
          }
        }
        return { ...note, decryptedNoteTitle, decryptedNoteContent };
      }),
    );

    setNotes(decryptedNotes);
    setIsNoteLoading(false);
  }, [noteInteractor, cryptographyInteractor, masterPassword]);

  const fetchAndDecryptBanks = useCallback(async () => {
    setIsBankLoading(false);

    const bankRequestResponse = await bankInteractor.getBanks();
    if (
      !bankRequestResponse.success ||
      !Array.isArray(bankRequestResponse.banks)
    ) {
      setBanks([]);
      setIsBankLoading(false);
      return;
    }

    const decryptedBanks = await Promise.all(
      bankRequestResponse.banks.map(async (bank) => {
        let decryptedIban = "";
        let decryptedCardNumber = "";
        let decryptedCardCvvCvc = "";

        if (bank.encryptedIban) {
          const decryptIbanResult = await cryptographyInteractor.decryptData({
            encryptedData: bank.encryptedIban,
            iv: bank.ibanEncryptionIv,
            salt: bank.ibanEncryptionSalt,
            masterPassword: masterPassword,
          });
          if (!decryptIbanResult.success) {
            decryptedIban = decryptIbanResult.message;
          } else {
            decryptedIban = decryptIbanResult.data;
          }
        }

        if (bank.encryptedCardNumber) {
          const decryptCardNumberResult =
            await cryptographyInteractor.decryptData({
              encryptedData: bank.encryptedCardNumber,
              iv: bank.cardNumberEncryptionIv,
              salt: bank.cardNumberEncryptionSalt,
              masterPassword: masterPassword,
            });
          if (!decryptCardNumberResult.success) {
            decryptedCardNumber = decryptCardNumberResult.message;
          } else {
            decryptedCardNumber = decryptCardNumberResult.data;
          }
        }

        if (bank.encryptedCardCvvCvc) {
          const decryptCardCvvCvcResult =
            await cryptographyInteractor.decryptData({
              encryptedData: bank.encryptedCardCvvCvc,
              iv: bank.cardCvvCvcEncryptionIv,
              salt: bank.cardCvvCvcEncryptionSalt,
              masterPassword: masterPassword,
            });
          if (!decryptCardCvvCvcResult.success) {
            decryptedCardCvvCvc = decryptCardCvvCvcResult.message;
          } else {
            decryptedCardCvvCvc = decryptCardCvvCvcResult.data;
          }
        }

        return {
          ...bank,
          decryptedIban,
          decryptedCardNumber,
          decryptedCardCvvCvc,
        };
      }),
    );

    setBanks(decryptedBanks);
    setIsBankLoading(false);
  }, [bankInteractor, cryptographyInteractor, masterPassword]);

  useEffect(() => {
    if (masterPassword && isDataVaultUnlocked) {
      setDataVaultLoadingRequest(true);
      Promise.all([
        fetchAndDecryptAccounts(),
        fetchAndDecryptContacts(),
        fetchAndDecryptNotes(),
        fetchAndDecryptBanks(),
      ])
        .then(() => {
          setDataVaultLoadingRequest(false);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
          setDataVaultLoadingRequest(false);
        });
    }
  }, [
    masterPassword,
    isDataVaultUnlocked,
    fetchAndDecryptAccounts,
    fetchAndDecryptContacts,
    fetchAndDecryptNotes,
    fetchAndDecryptBanks,
  ]);

  const resetMasterPassword = useCallback(() => {
    setMasterPassword("");
    setInactivity(true);
    setIsDataVaultUnlocked(false);
  }, [setMasterPassword, setInactivity, setIsDataVaultUnlocked]);

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(resetMasterPassword, 5 * 60 * 1000); // 5 minute timeout
    };

    const handleUserActivity = () => {
      resetTimeout();
    };

    if (isDataVaultUnlocked) {
      // Set initial timeout and add event listeners if the vault is unlocked
      resetTimeout();
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("click", handleUserActivity);
      window.addEventListener("touchstart", handleUserActivity);
      window.addEventListener("keydown", handleUserActivity);
    } else if (timeoutId) {
      // Clear timeout if the vault is locked
      clearTimeout(timeoutId);
    }

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
      window.removeEventListener("touchstart", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
    };
  }, [resetMasterPassword, isDataVaultUnlocked]);

  return (
    <DataVaultContext.Provider
      value={{
        accounts,
        setAccounts,
        isAccountLoading,
        setIsAccountLoading,
        contacts,
        setContacts,
        isContactLoading,
        setIsContactLoading,
        notes,
        setNotes,
        isNoteLoading,
        setIsNoteLoading,
        banks,
        setBanks,
        isBankLoading,
        setIsBankLoading,
        masterPassword,
        setMasterPassword,
        dataVaultLoadingRequest,
        setDataVaultLoadingRequest,
        isDataVaultUnlocked,
        setIsDataVaultUnlocked,
        accountInteractor,
        contactInteractor,
        noteInteractor,
        bankInteractor,
        cryptographyInteractor,
        inactivity,
        setInactivity,
      }}
    >
      {children}
    </DataVaultContext.Provider>
  );
};

DataVaultProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
