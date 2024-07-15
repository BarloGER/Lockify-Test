const { RequestInputPort } = require("./RequestInputPort");
const { RequestOutputPort } = require("./RequestOutputPort");

exports.RequestInteractor = class RequestInteractor {
  constructor() {
    this.requestInputPort = new RequestInputPort();
    this.requestOutputPort = new RequestOutputPort();
  }

  async validateHeaders(unvalidatedHeader) {
    const validatedHeader =
      this.requestInputPort.validateHeadersMetadata(unvalidatedHeader);
    if (validatedHeader.validationError) {
      const validationError = validatedHeader.validationError;
      return { validationError };
    }
  }

  async validateParams(unvalidatedParam) {
    const validatedParam =
      this.requestInputPort.validateParamsMetadata(unvalidatedParam);
    if (validatedParam.validationError) {
      const validationError = validatedParam.validationError;
      return { validationError };
    }
  }

  async validateQuery(unvalidatedQuery) {
    const validatedQuery =
      this.requestInputPort.validateQueryMetadata(unvalidatedQuery);
    if (validatedQuery.validationError) {
      const validationError = validatedQuery.validationError;
      return { validationError };
    }
  }
};
