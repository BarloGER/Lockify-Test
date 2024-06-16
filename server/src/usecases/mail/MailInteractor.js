const { MailInputPort } = require("./MailInputPort");
const { MailOutputPort } = require("./MailOutputPort");
const { ErrorResponse } = require("../../utils");

exports.MailInteractor = class MailInteractor {
  constructor(mailRepository) {
    this.mailRepository = mailRepository;
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

    const mail = await this.mailRepository.sendMail(mailEntity);
    console.log(mail);

    const mailOutputData = {
      success: true,
      message: {
        EN: "E-mail successfully sent.",
        DE: "E-Mail erfolgreich versendet.",
      },
    };

    return this.mailOutputPort.output(mailOutputData);
  }
  // catch(error) {
  //   throw new ErrorResponse({
  //     errorCode: "MAIL_SERVICE_001",
  //   });
  // }
};
