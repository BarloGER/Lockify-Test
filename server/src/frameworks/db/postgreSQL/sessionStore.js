const session = require("express-session");
const ConnectPgSimple = require("connect-pg-simple");
const { pgPool } = require("./index");

const pgSessionStore = ConnectPgSimple(session);

exports.sessionStore = new pgSessionStore({
  pool: pgPool,
  tableName: "sessions",
});
