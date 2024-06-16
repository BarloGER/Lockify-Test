import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserInteractor } from "../../../usecases/UserInteractor.js";
import { UserRepository } from "../../repositories/UserRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthTemplate } from "../templates";
import { SupportForm } from "../organisms";

const userRepository = new UserRepository();
const userInteractor = new UserInteractor(userRepository);

export const BlockedPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (user && !user.isBlocked) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmitSupportMessage = async (e) => {
    e.preventDefault();

    const extendedHtml = `<p>${html}</p><p>Email des Benutzers: ${email}</p>`;

    const sendMail = await userInteractor.sendSupportMail({
      email: import.meta.env.VITE_MAIL_ADDRESS,
      subject,
      html: extendedHtml,
    });
    console.log(sendMail);
    if (sendMail.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (sendMail.statusCode === 400) {
      setMessage(sendMail.message);
      setMessageType("error");
      return;
    }

    setMessage(sendMail.message);
    setMessageType("success");
  };

  return (
    <AuthTemplate>
      <SupportForm
        email={email}
        setEmail={setEmail}
        subject={subject}
        setSubject={setSubject}
        html={html}
        setHtml={setHtml}
        handleSubmitSupportMessage={handleSubmitSupportMessage}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
