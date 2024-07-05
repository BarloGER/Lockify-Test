import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CryptographyInteractor } from "../../../usecases/cryptography/CryptographyInteractor.js";
import { AuthContext } from "../../context/AuthContext.jsx";

import { AuthTemplate } from "../templates";
import { RegisterForm } from "../organisms";

const cryptographyInteractor = new CryptographyInteractor();

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser, userInteractor, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [masterPassword, setMasterPassword] = useState("");
  const [isNewsletterAllowed, setIsNewsletterAllowed] = useState(false);
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsRegistrationLoading(true);

    const encryptedDataObj = await cryptographyInteractor.encryptData({
      text: import.meta.env.VITE_SECRET_STRING,
      masterPassword: masterPassword,
    });

    const registrationResponse = await userInteractor.registerUser({
      username,
      email,
      password,
      encryptedSecret: encryptedDataObj.data.encryptedData,
      secretEncryptionIv: encryptedDataObj.data.iv,
      secretEncryptionSalt: encryptedDataObj.data.salt,
      isNewsletterAllowed,
    });

    if (registrationResponse.validationError) {
      setMessage(`validationError.${registrationResponse.validationError}`);
      setMessageType("error");
    } else if (!registrationResponse.success) {
      setMessage(registrationResponse.message);
      setMessageType("error");
    } else {
      setUser(registrationResponse.user.dataValues);
      setIsAuthenticated(true);
      setMessage(registrationResponse.message);
      setMessageType("success");
      navigate("/confirm-email");
    }

    setIsRegistrationLoading(false);
  };

  return (
    <AuthTemplate>
      <RegisterForm
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        masterPassword={masterPassword}
        setMasterPassword={setMasterPassword}
        isNewsletterAllowed={isNewsletterAllowed}
        setIsNewsletterAllowed={setIsNewsletterAllowed}
        handleRegistration={handleRegistration}
        isRegistrationLoading={isRegistrationLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
