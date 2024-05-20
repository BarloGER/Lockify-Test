// Filters sensitive Data for logging
exports.filterSensitiveData = (object) => {
  const filtered = {};
  Object.keys(object).forEach((key) => {
    // Check whether the key name contains potentially sensitive data, e.g. password
    if (key.toLowerCase().includes("pass")) {
      filtered[key] = "***";
    } else {
      filtered[key] = object[key];
    }
  });
  return filtered;
};
