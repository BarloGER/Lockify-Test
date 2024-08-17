const session = require("express-session");
const { sessionStore } = require("../db/postgreSQL/sessionStore");

exports.sessionConfig = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
  },
});
