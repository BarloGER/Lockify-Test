const { filterSensitiveData } = require("./filterSensitiveData.js");

class ErrorResponse extends Error {
  constructor({ errorCode, body, params, input, validationMessages }) {
    super(errorCode);
    this.errorCode = errorCode;
    this.validationMessages = validationMessages;

    this.devInfo = {
      body: body ? filterSensitiveData(body) : undefined,
      params: params ? filterSensitiveData(params) : undefined,
      input: input ? filterSensitiveData(input) : undefined,
    };
  }
}

module.exports = ErrorResponse;
