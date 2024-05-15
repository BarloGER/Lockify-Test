const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("*", (req, res) => res.sendStatus(404));

exports.start = (PORT) => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
