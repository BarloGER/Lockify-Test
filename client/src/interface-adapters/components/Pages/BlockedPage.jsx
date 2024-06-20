import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MailInteractor } from "../../../usecases/mail/MailInteractor.js";
import { MailRepository } from "../../repositories/MailRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { AuthTemplate } from "../templates";
import { SupportForm } from "../organisms";

const mailRepository = new MailRepository();
const mailInteractor = new MailInteractor(mailRepository);

export const BlockedPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [isSupportMailLoading, setIsSupportMailLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (user && !user.isBlocked) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmitSupportMessage = async (e) => {
    e.preventDefault();
    setIsSupportMailLoading(true);

    const message = `<p>${html}</p><p>Email des Benutzers: ${email}</p>`;

    const supportMailResponse = await mailInteractor.sendSupportMail({
      email,
      subject,
      html: message,
    });
    if (supportMailResponse.validationError) {
      setIsSupportMailLoading(false);
      setMessage(`validationError.${supportMailResponse.validationError}`);
      setMessageType("error");
      return;
    } else if (supportMailResponse.message === "Failed to fetch") {
      setMessage("externalService.serverError");
      setMessageType("error");
      return;
    } else if (supportMailResponse.statusCode === 400) {
      setMessage(supportMailResponse.message);
      setMessageType("error");
      return;
    }

    setIsSupportMailLoading(false);
    setMessage(supportMailResponse.message);
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
        isSupportMailLoading={isSupportMailLoading}
        message={message}
        setMessage={setMessage}
        messageType={messageType}
      />
    </AuthTemplate>
  );
};
