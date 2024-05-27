const { ErrorResponse } = require("../../utils");

exports.validateCookie = (req, res, next) => {
  console.log(req.session);
  const session = req.session;
  if (!session) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_002" });
  }

  const userId = req.session.userId;
  if (!userId) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_003" });
  }

  const isExpired = req.session.expires < Date.now();
  if (isExpired) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_004" });
  }

  req.userId = userId;
  next();
};
