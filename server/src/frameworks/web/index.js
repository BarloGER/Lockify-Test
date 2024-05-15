const express = require("express");
const cors = require("cors");
const { sessionConfig } = require("../configs/sessionConfig");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use("*", (req, res) => res.sendStatus(404));

exports.start = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
