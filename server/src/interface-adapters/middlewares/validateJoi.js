const { ErrorResponse } = require("../../utils");

exports.validateJoi = (schemaFunction) => (req, res, next) => {
  const language = req.headers["accept-language"].includes("de") ? "DE" : "EN";
  const schema = schemaFunction(language);
  const dataToValidate = {
    params: req.params,
    body: req.body,
  };

  const { error } = schema.validate(dataToValidate);
  if (error) {
    const validationMessage = error.details[0].message;
    return next(
      new ErrorResponse({
        errorCode: "ROUTE_VALIDATION_001",
        validationMessages: validationMessage,
      })
    );
  } else {
    next();
  }
};
