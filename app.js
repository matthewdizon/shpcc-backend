require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const getUsers = require("./routes/users");
const getMemberApplications = require("./routes/members");
const getLoanApplications = require("./routes/loans");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.shpcreditcoop.com",
    "https://develop.shpcreditcoop.com",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (_req, res) => res.status(200).send("OK"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", getUsers);
app.use("/api/memberApplications", getMemberApplications);
app.use("/api/loans", getLoanApplications);

module.exports = app;
