import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataVaultContext } from "../../context/DataVaultContext";
import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor";

import { DataVaultTemplate } from "../templates";
import { DataVaultForm } from "../organisms";

// ! Add verificationAttempts increment on failed decryption

const cryptographyInteractor = new CryptographyInteractor();

export const DataVaultPage = () => {
  const { user, isBlocked, isAuthenticated } = useContext(AuthContext);
  const {
    masterPassword,
    setMasterPassword,
    setIsDataVaultUnlocked,
    inactivity,
    setInactivity,
  } = useContext(DataVaultContext);
  const navigate = useNavigate();

  const [isTestUser, setIsTestUser] = useState(false);
  const [isDataVaultLoading, setIsDataVaultLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const testUser = import.meta.env.VITE_TEST_EMAIL;
    if (user && user.email === testUser) {
      setIsTestUser(true);
    }
  }, [user]);

  if (isBlocked || !isAuthenticated) {
    return;
  }

  const processMasterPasswordVerification = async (e) => {
    e.preventDefault();
    setIsDataVaultLoading(true);

    const { encryptedSecret, secretEncryptionIv, secretEncryptionSalt } = user;
    const decryptionResult = await cryptographyInteractor.decryptData({
      encryptedData: encryptedSecret,
      iv: secretEncryptionIv,
      salt: secretEncryptionSalt,
      masterPassword: masterPassword,
    });
    if (!decryptionResult.success) {
      setIsDataVaultLoading(false);
      setMessage(decryptionResult.message);
      setMessageType("error");
      return;
    }

    setIsDataVaultLoading(false);
    setMessage(decryptionResult.message);
    setMessageType("success");
    setInactivity(false);
    setIsDataVaultUnlocked(true);
    navigate("/data-vault/dashboard");
  };

  return (
    <DataVaultTemplate>
      <section className="data-vault-template__section">
        <DataVaultForm
          masterPassword={masterPassword}
          setMasterPassword={setMasterPassword}
          processMasterPasswordVerification={processMasterPasswordVerification}
          isDataVaultLoading={isDataVaultLoading}
          inactivity={inactivity}
          isTestUser={isTestUser}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
    </DataVaultTemplate>
  );
};
