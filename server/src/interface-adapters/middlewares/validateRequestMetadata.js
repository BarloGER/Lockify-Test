const {
  RequestInteractor,
} = require("../../usecases/request/RequestInteractor");
const { ErrorResponse } = require("../../utils");

const requestInteractor = new RequestInteractor();

exports.validateRequestMetadata = () => async (req, res, next) => {
  const validateHeaders = await requestInteractor.validateHeaders(req.headers);
  if (validateHeaders) {
    const validationError = validateHeaders.validationError;
    return next(
      new ErrorResponse({
        errorCode: validationError,
      }),
    );
  }

  const validateParams = await requestInteractor.validateParams(req.params);
  if (validateParams) {
    const validationError = validateParams.validationError;
    return next(
      new ErrorResponse({
        errorCode: validationError,
      }),
    );
  }

  const validateQuery = await requestInteractor.validateQuery(req.query);
  if (validateQuery) {
    const validationError = validateQuery.validationError;
    return next(
      new ErrorResponse({
        errorCode: validationError,
      }),
    );
  }

  next();
};
