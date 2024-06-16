const { ErrorResponse } = require("../../utils");

exports.validateSession = (req, res, next) => {
  const cookie = req.headers.cookie;
  if (!cookie) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_002" });
  }

  const isExpired = req.session.expires < Date.now();
  if (isExpired) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_004" });
  }

  const userId = req.session.userId;
  if (!userId) {
    throw new ErrorResponse({ errorCode: "USER_AUTHENTICATION_003" });
  }

  req.userId = userId;
  next();
};
