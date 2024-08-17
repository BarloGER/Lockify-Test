const express = require("express");
const cors = require("cors");
const { sessionConfig } = require("../configs/sessionConfig");
const {
  errorHandler,
} = require("../../interface-adapters/middlewares/errorHandler");

const { userRouter } = require("./routes/userRouter");
const { accountRouter } = require("./routes/accountRouter");
const { noteRouter } = require("./routes/noteRouter");
const { contactRouter } = require("./routes/contactRouter");
const { bankRouter } = require("./routes/bankRouter");

const app = express();

const whitelist = process.env.CLIENT_URLS
  ? process.env.CLIENT_URLS.split(",")
  : [];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", 1);
app.use(sessionConfig);

app.use("/user", userRouter);
app.use("/accounts", accountRouter);
app.use("/notes", noteRouter);
app.use("/contacts", contactRouter);
app.use("/banks", bankRouter);
app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

exports.start = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
