export const validateEnvs = () => {
  const requiredEnvs = [
    "VITE_API_KEY",
    "VITE_MAILSERVER_URL",
    "VITE_MAIL_ADDRESS",
    "VITE_SECRET_STRING",
  ];

  requiredEnvs.forEach((key) => {
    if (!import.meta.env[key]) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  });
};
