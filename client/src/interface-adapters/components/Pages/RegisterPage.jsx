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

  const [newUserFormData, setNewUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    masterPassword: "",
    confirmMasterPassword: "",
    isNewsletterAllowed: false,
  });
  const [isRegistrationLoading, setIsRegistrationLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUserFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const processRegistration = async (e) => {
    e.preventDefault();
    setIsRegistrationLoading(true);

    const unvalidatedUserInput = newUserFormData;
    const validateUserInput =
      await userInteractor.validateUserInputForRegisterUser(
        unvalidatedUserInput
      );
    if (!validateUserInput.success) {
      setIsRegistrationLoading(false);
      setMessage(`validationError.${validateUserInput.message}`);
      setMessageType("error");
      return;
    }
    const validUserEntity = validateUserInput.validUserEntity;

    const encryptedSecret = await cryptographyInteractor.encryptData({
      text: import.meta.env.VITE_SECRET_STRING,
      masterPassword: validUserEntity.masterPassword,
    });
    if (!encryptedSecret.success) {
      setIsRegistrationLoading(false);
      setMessage(`validationError.${encryptedSecret.message}`);
      setMessageType("error");
      return;
    }

    const encryptedUserData = {
      username: validUserEntity.username,
      email: validUserEntity.email,
      password: validUserEntity.password,
      encryptedSecret: encryptedSecret.encryptedData,
      secretEncryptionIv: encryptedSecret.iv,
      secretEncryptionSalt: encryptedSecret.salt,
      isNewsletterAllowed: validUserEntity.isNewsletterAllowed,
    };

    const registrationResponse = await userInteractor.registerUser(
      encryptedUserData
    );
    if (
      !registrationResponse.success &&
      registrationResponse.message === "Failed to fetch"
    ) {
      setIsRegistrationLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!registrationResponse.success) {
      setIsRegistrationLoading(false);
      setMessage(registrationResponse.message);
      setMessageType("error");
      return;
    }

    setUser(registrationResponse.user);
    setIsRegistrationLoading(false);
    setMessage(registrationResponse.message);
    setMessageType("success");
    setIsAuthenticated(true);
    navigate("/confirm-email");
  };

  return (
    <AuthTemplate>
      <RegisterForm
        newUserFormData={newUserFormData}
        handleChange={handleChange}
        processRegistration={processRegistration}
        isRegistrationLoading={isRegistrationLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
