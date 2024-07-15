const { filterSensitiveData } = require("./filterSensitiveData.js");

exports.ErrorResponse = class ErrorResponse extends Error {
  constructor({ errorCode, body, params, input }) {
    super(errorCode);
    this.errorCode = errorCode;

    this.devInfo = {
      body: body ? filterSensitiveData(body) : undefined,
      params: params ? filterSensitiveData(params) : undefined,
      input: input ? filterSensitiveData(input) : undefined,
    };
  }
};
