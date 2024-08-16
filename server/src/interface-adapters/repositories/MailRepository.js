const URL = process.env.MAILSERVER_URL;

exports.MailRepository = class MailRepository {
  async sendMail(mailEntity) {
    console.log(mailEntity);
    try {
      const response = await fetch(`${URL}/mail/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mailEntity.email,
          subject: mailEntity.subject,
          html: mailEntity.html,
        }),
      });

      return response.json();
    } catch (error) {
      return error;
    }
  }
};
