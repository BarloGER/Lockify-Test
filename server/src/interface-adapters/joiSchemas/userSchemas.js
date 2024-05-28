const Joi = require("joi");
const {
  usernameMessages,
  emailMessages,
  passwordMessages,
  unknownObjectMessage,
  verificationMessages,
} = require("../../utils");

exports.registerUserSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.valid({}),
    body: Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required()
        .messages(usernameMessages[language]),
      email: Joi.string()
        .email()
        .max(254)
        .required()
        .messages(emailMessages[language]),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages(passwordMessages[language]),
    }),
  }).messages(unknownObjectMessage[language]);
};

exports.loginUserSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.valid({}),
    body: Joi.object({
      email: Joi.string()
        .email()
        .max(254)
        .required()
        .messages(emailMessages[language]),
      password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages(passwordMessages[language]),
    }),
  }).messages(unknownObjectMessage[language]);
};

exports.updateUserSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.valid({}),
    body: Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .messages(usernameMessages[language]),
      email: Joi.string().email().max(254).messages(emailMessages[language]),
      password: Joi.string()
        .min(8)
        .max(20)
        .messages(passwordMessages[language]),
    }),
  }).messages(unknownObjectMessage[language]);
};

exports.deleteUserSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.object().keys({}).unknown(false),
    body: Joi.object().keys({}).unknown(false),
  }).messages(unknownObjectMessage[language]);
};

exports.confirmEmailSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.valid({}),
    body: Joi.object({
      verificationCode: Joi.string()
        .alphanum()
        .length(8)
        .messages(verificationMessages[language]),
    }),
  }).messages(unknownObjectMessage[language]);
};

exports.sendMailSchema = (language = "EN") => {
  return Joi.object({
    params: Joi.valid({}),
    body: Joi.object({
      email: Joi.string().email().max(254).messages(emailMessages[language]),
    }),
  }).messages(unknownObjectMessage[language]);
};
