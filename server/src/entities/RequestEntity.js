const CLIENT_URLS = process.env.CLIENT_URLS;

exports.RequestEntity = class RequestEntity {
  constructor(metadataInput) {
    this.metadataInput = metadataInput;

    const allowedParamFields = ["id", "page", "limit"];
    Object.entries(metadataInput).forEach(([key, value]) => {
      if (allowedParamFields.includes(key)) {
        this[key] = value;
      }
    });

    const allowedQueryFields = ["search", "sort", "filter"];
    Object.entries(metadataInput).forEach(([key, value]) => {
      if (allowedQueryFields.includes(key)) {
        this[key] = value;
      }
    });
  }

  validateMetadata() {
    const headerError = this.validateHeaders();
    if (headerError) return headerError;
    const paramError = this.validateParams();
    if (paramError) return paramError;
    const queryError = this.validateQuery();
    if (queryError) return queryError;
  }

  validateHeaders() {
    const headers = this.metadataInput;
    const allowedOrigins = CLIENT_URLS;

    // Validations for the host header
    if (headers.host && !headers.host.match(/^[a-z0-9.:-]+$/i)) {
      return "REQUEST_VALIDATION_001";
    }

    // Check for line breaks in all headers
    Object.entries(headers).forEach(([key, value]) => {
      if (/[\r\n]/.test(value)) {
        return `REQUEST_VALIDATION_002`;
      }
    });

    // Validation of content type
    const contentType = headers["content-type"] || "application/json";
    if (!["application/json", "text/plain"].includes(contentType)) {
      return "REQUEST_VALIDATION_003";
    }

    // Check content length for plausibility
    if (
      headers["content-length"] &&
      (isNaN(headers["content-length"]) || headers["content-length"] < 0)
    ) {
      return "REQUEST_VALIDATION_005";
    }

    // Validate origin header to ensure that the request comes from an authorized source
    if (headers.origin && !allowedOrigins.includes(headers.origin)) {
      return "REQUEST_VALIDATION_006";
    }

    // // Sicherheitsheader prüfen
    // if (!headers["strict-transport-security"]) {
    //   return "REQUEST_VALIDATION_007";
    // }

    return null;
  }

  validateParams() {
    // Implementiere spezifische Validierungen für Parameter und gib bei Fehlern entsprechende Codes zurück
  }

  validateQuery() {
    // Implementiere spezifische Validierungen für Abfrageparameter und gib bei Fehlern entsprechende Codes zurück
  }
};
