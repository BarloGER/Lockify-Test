import { useState, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor";

import { DataVaultTemplate } from "../templates";
import { DataVaultForm } from "../organisms";

// ! Add verificationAttempts increment on failed decryption

export const DataVaultPage = () => {
  const {
    user,
    masterPassword,
    setMasterPassword,
    isDataVaultUnlocked,
    setIsDataVaultUnlocked,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDataVaultLoading, setIsDataVaultLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const cryptographyInteractor = new CryptographyInteractor();

  const handleMasterPasswordVerification = async (e) => {
    e.preventDefault();
    setIsDataVaultLoading(true);

    const { encryptedSecret, encryptionIv, encryptionSalt } = user;

    try {
      const decryptionResult = await cryptographyInteractor.decryptData({
        encryptedData: encryptedSecret,
        iv: encryptionIv,
        salt: encryptionSalt,
        masterPassword: masterPassword,
      });

      if (decryptionResult.success) {
        setIsDataVaultUnlocked(true);
        navigate("/auth/data-vault/accounts");
      } else {
        throw new Error(decryptionResult.message);
      }
    } catch (error) {
      setMasterPassword("");
      console.log(error);
      setMessage("dataVault.decryptError");
      setMessageType("error");
    } finally {
      setIsDataVaultLoading(false);
    }
  };

  return (
    <>
      {isDataVaultUnlocked ? (
        <Outlet />
      ) : (
        <DataVaultTemplate>
          <DataVaultForm
            masterPassword={masterPassword}
            setMasterPassword={setMasterPassword}
            handleMasterPasswordVerification={handleMasterPasswordVerification}
            isDataVaultLoading={isDataVaultLoading}
            message={message}
            setMessage={setMessage}
            messageType={messageType}
          />
        </DataVaultTemplate>
      )}
    </>
  );
};
