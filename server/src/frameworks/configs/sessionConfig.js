const session = require("express-session");
const { sessionStore } = require("../db/postgreSQL/sessionStore");

exports.sessionConfig = session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: true,
  },
});
