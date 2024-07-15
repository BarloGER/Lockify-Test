const { RequestEntity } = require("../../entities/RequestEntity");

exports.RequestInputPort = class RequestInputPort {
  validateHeadersMetadata(unvalidatedHeader) {
    const validHeaderEntity = new RequestEntity(unvalidatedHeader);

    const validationError = validHeaderEntity.validateHeaders();
    if (validationError) {
      return { validationError };
    }

    return validHeaderEntity;
  }
  validateParamsMetadata(unvalidatedParam) {
    const validParamEntity = new RequestEntity(unvalidatedParam);

    const validationError = validParamEntity.validateParams();
    if (validationError) {
      return { validationError };
    }

    return validParamEntity;
  }
  validateQueryMetadata(unvalidatedQuery) {
    const validQueryEntity = new RequestEntity(unvalidatedQuery);

    const validationError = validQueryEntity.validateQuery();
    if (validationError) {
      return { validationError };
    }

    return validQueryEntity;
  }
};
