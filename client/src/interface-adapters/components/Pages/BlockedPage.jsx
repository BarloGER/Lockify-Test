import { useState, useEffect, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MailInteractor } from "../../../usecases/mail/MailInteractor.js";
import { MailRepository } from "../../repositories/MailRepository.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import { BlockedTemplate } from "../templates";
import { SupportForm } from "../organisms";

export const BlockedPage = () => {
  const mailRepository = useMemo(() => new MailRepository(), []);
  const mailInteractor = useMemo(
    () => new MailInteractor(mailRepository),
    [mailRepository]
  );

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [supportFormData, setSupportFormData] = useState({
    email: "",
    subject: "",
    html: "",
  });
  const [isSupportMailLoading, setIsSupportMailLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    if (user && !user.isBlocked) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupportFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const processSupportRequest = async (e) => {
    e.preventDefault();
    setIsSupportMailLoading(true);

    const unvalidatedMailData = {
      email: supportFormData.email,
      subject: supportFormData.subject,
      html: `<p>${supportFormData.html}</p><p>Email des Benutzers: ${supportFormData.email}</p>`,
    };

    const supportMailResponse = await mailInteractor.sendSupportMail(
      unvalidatedMailData
    );
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
    <BlockedTemplate>
      <section className="blocked-template__section">
        <SupportForm
          supportFormData={supportFormData}
          handleChange={handleChange}
          processSupportRequest={processSupportRequest}
          isSupportMailLoading={isSupportMailLoading}
          message={message}
          setMessage={setMessage}
          messageType={messageType}
        />
      </section>
    </BlockedTemplate>
  );
};
