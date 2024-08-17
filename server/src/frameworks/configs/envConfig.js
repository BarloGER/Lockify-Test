exports.validateEnvs = () => {
  const requiredEnvs = [
    "NODE_ENV",
    "SESSION_SECRET",
    "CLIENT_URLS",
    "MAILSERVER_URL",
    "MONGO_URI",
    "DATABASE_URL",
  ];

  requiredEnvs.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  });
  console.log("ENV validation successful");
};
