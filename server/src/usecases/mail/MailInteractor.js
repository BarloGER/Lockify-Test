const { MailInputPort } = require("./MailInputPort");
const { MailOutputPort } = require("./MailOutputPort");
const { ErrorResponse } = require("../../utils");

exports.MailInteractor = class MailInteractor {
  constructor() {
    this.mailInputPort = new MailInputPort();
    this.mailOutputPort = new MailOutputPort();
  }

  async sendVerificationMail({ email, verificationCode }) {
    const subject = "Registrierungsbestätigung";
    const message = `<p>Hier dein Verifizierungscode: ${verificationCode}</p>`;
    return this.sendMail({ email, subject, message });
  }

  async sendNewPassword({ email, newPassword }) {
    const subject = "Passwort zurücksetzen";
    const message = `<p>Hier dein neues Passwort: ${newPassword}</p><p>Du solltest es sobald möglich ändern</p>`;
    return this.sendMail({ email, subject, message });
  }

  async sendMail({ email, subject, message }) {
    const mailEntity = this.mailInputPort.createMail({
      email,
      subject,
      message,
    });

    const url = `${process.env.MAILSERVER_URL}/mail/send-mail`;
    const body = {
      email: mailEntity.email,
      subject: mailEntity.subject,
      html: mailEntity.message,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Failed to send mail");
      return this.mailOutputPort.prepareSuccessOutput({
        response: await response.json(),
      });
    } catch (error) {
      throw new ErrorResponse({
        errorCode: "MAIL_SERVICE_001",
      });
    }
  }
};
