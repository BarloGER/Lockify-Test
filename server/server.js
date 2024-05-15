const server = require("./src/frameworks/web/index");
const { validateEnvs } = require("./src/frameworks/configs/envConfig");

validateEnvs();

const PORT = process.env.PORT || 8080;
server.start(PORT);
