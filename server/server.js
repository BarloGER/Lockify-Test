const server = require("./src/frameworks/web/index");
const { validateEnvs } = require("./src/frameworks/configs/envConfig");
const { connectToMongoDB } = require("./src/frameworks/db/mongoDB");

const initializeServer = async () => {
  try {
    validateEnvs();
    await connectToMongoDB();
    const PORT = process.env.PORT || 8080;
    server.start(PORT);
  } catch (error) {
    console.error("Failed to initialize server:", error);
    process.exit(1);
  }
};

initializeServer();
