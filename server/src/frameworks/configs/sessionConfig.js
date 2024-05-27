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
  },
});

// Test
// exports.sessionConfig = session({
//   store: sessionStore,
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: process.env.NODE_ENV === "production",
//     // Setze maxAge auf 20 Sekunden in Entwicklung, ansonsten auf 30 Tage
//     maxAge:
//       process.env.NODE_ENV === "development"
//         ? 10 * 1000
//         : 30 * 24 * 60 * 60 * 1000,
//   },
// });
