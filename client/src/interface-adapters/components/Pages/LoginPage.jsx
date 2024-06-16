import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";
import { UserInteractor } from "../../../usecases/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthTemplate } from "../templates";
import { LoginForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.isVerified) {
        navigate("/");
      } else {
        navigate("/confirm-email");
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    const login = await userInteractor.login({ email, password });
    if (!login.success && login.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!login.success) {
      setMessage(login.message);
      setMessageType("error");
      return;
    }

    setUser(login.user.dataValues);
    setIsAuthenticated(true);
    setMessage(login.message);
    setMessageType("success");
    navigate("/");
  };

  return (
    <AuthTemplate>
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
