exports.filterSensitiveData = (object, additionalSensitiveKeys = []) => {
  const filtered = {};
  const defaultSensitiveKeys = ["password", "verificationCode"];
  const allSensitiveKeys = [
    ...defaultSensitiveKeys,
    ...additionalSensitiveKeys,
  ];

  Object.keys(object).forEach((key) => {
    if (allSensitiveKeys.some((sensitiveKey) => key === sensitiveKey)) {
      filtered[key] = "***";
    } else {
      filtered[key] = object[key];
    }
  });
  return filtered;
};
