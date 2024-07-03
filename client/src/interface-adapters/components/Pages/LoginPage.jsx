import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext.jsx";
import { UserInteractor } from "../../../usecases/user/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthTemplate } from "../templates";
import { LoginForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);

    const loginResponse = await userInteractor.loginUser({ email, password });
    if (loginResponse.validationError) {
      setIsLoginLoading(false);
      setMessage(`validationError.${loginResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (
      !loginResponse.success &&
      loginResponse.message === "Failed to fetch"
    ) {
      setIsLoginLoading(false);
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (!loginResponse.success) {
      setIsLoginLoading(false);
      setMessage(loginResponse.message);
      setMessageType("error");
      return;
    }

    setUser(loginResponse.user.dataValues);
    setIsAuthenticated(true);
    setIsLoginLoading(false);
    setMessage(loginResponse.message);
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
        isLoginLoading={isLoginLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
