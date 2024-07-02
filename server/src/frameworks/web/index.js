const express = require("express");
const cors = require("cors");
const { sessionConfig } = require("../configs/sessionConfig");
const {
  errorHandler,
} = require("../../interface-adapters/middlewares/errorHandler");
const { userRouter } = require("./routes/userRouter");
const { accountRouter } = require("./routes/accountRouter");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use("/user", userRouter);
app.use("/accounts", accountRouter);
app.use("*", (req, res) => res.sendStatus(404));

app.use(errorHandler);

exports.start = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
