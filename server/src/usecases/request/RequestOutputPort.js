exports.RequestOutputPort = class RequestOutputPort {
  constructor() {
    this.success = false;
    this.request = {};
  }

  formatValidRequest(validatedRequest) {
    return {
      success: true,
      validRequestEntity: {
        header: validatedRequest.header,
        params: validatedRequest.params,
        query: validatedRequest.query,
      },
    };
  }
};
