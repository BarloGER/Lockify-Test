import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/UserInteractor.js";
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
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (event) => {
    event.preventDefault();

    const register = await userInteractor.register({
      username,
      email,
      password,
      isNewsletterAllowed,
    });
    console.log(register);
    if (!register.success && register.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!register.success) {
      setMessage(register.message);
      setMessageType("error");
      return;
    }

    setUser(register.user.dataValues);
    setIsAuthenticated(true);
    setMessage(register.message);
    setMessageType("success");
    navigate("/");
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
        handleRegister={handleRegister}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
