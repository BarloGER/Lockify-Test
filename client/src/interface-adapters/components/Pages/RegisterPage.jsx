import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/user/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthTemplate } from "../templates";
import { RegisterForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    const registrationResponse = await userInteractor.registerUser({
      username,
      email,
      password,
      isNewsletterAllowed,
    });
    if (registrationResponse.validationError) {
      setIsRegistrationLoading(false);
      setMessage(`validationError.${registrationResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
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

    setUser(registrationResponse.user.dataValues);
    setIsAuthenticated(true);
    setIsRegistrationLoading(false);
    setMessage(registrationResponse.message);
    setMessageType("success");

    navigate("/confirm-email");
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
