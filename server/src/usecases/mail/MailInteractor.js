const { MailInputPort } = require("./MailInputPort");
const { MailOutputPort } = require("./MailOutputPort");

exports.MailInteractor = class MailInteractor {
  constructor(mailRepository) {
    this.mailRepository = mailRepository;
    this.mailInputPort = new MailInputPort();
    this.mailOutputPort = new MailOutputPort();
  }

  async sendVerificationMail(mailData) {
    const subject = "Registrierungsbestätigung";
    const html = `<p>Hier dein Verifizierungscode: ${mailData.verificationCode}</p>`;

    const mailPayload = {
      email: mailData.email,
      subject,
      html,
    };

    return this.sendMail(mailPayload);
  }

  async sendNewPasswordMail(mailData) {
    const subject = "Passwort zurücksetzen";
    const html = `<p>Hier dein neues Passwort: ${mailData.newPassword}</p><p>Du solltest es sobald möglich ändern</p>`;

    const mailPayload = {
      email: mailData.email,
      subject,
      html,
    };

    return this.sendMail(mailPayload);
  }

  async sendMail(mailPayload) {
    const mail = this.mailInputPort.validateMailInput(mailPayload);

    await this.mailRepository.sendMail(mail);

    const mailOutputData = {
      success: true,
      message: {
        EN: "E-mail successfully sent.",
        DE: "E-Mail erfolgreich versendet.",
      },
    };

    return this.mailOutputPort.prepareMailOutput(mailOutputData);
  }
};
