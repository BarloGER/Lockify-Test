exports.filterSensitiveData = (object, additionalSensitiveKeys = []) => {
  const filtered = {};
  const defaultSensitiveKeys = [
    "password",
    "verificationCode",
    "verificationAttempts",
    "lastVerificationAttempt",
    "createdAt",
    "updatedAt",
  ];
  const allSensitiveKeys = [
    ...defaultSensitiveKeys,
    ...additionalSensitiveKeys,
  ];

  Object.keys(object).forEach((key) => {
    if (
      allSensitiveKeys.some((sensitiveKey) =>
        key.toLowerCase().includes(sensitiveKey)
      )
    ) {
      filtered[key] = "***";
    } else {
      filtered[key] = object[key];
    }
  });
  return filtered;
};
