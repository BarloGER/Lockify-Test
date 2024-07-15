// ! Add language to mailserver and this function

const URL = import.meta.env.VITE_MAILSERVER_URL;
const MAIL_ADDRESS = import.meta.env.VITE_MAIL_ADDRESS;

export class MailRepository {
  async sendSupportMail(validMailEntity) {
    try {
      const response = await fetch(`${URL}/mail/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: MAIL_ADDRESS,
          subject: validMailEntity.subject,
          html: validMailEntity.html,
        }),
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }
}
