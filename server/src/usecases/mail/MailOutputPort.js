exports.MailOutputPort = class MailOutputPort {
  prepareSuccessOutput({ response }) {
    return {
      success: true,
      data: response,
      message: "Email successfully sent",
    };
  }
};
