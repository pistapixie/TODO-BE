const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require('cors')
require('dotenv').config()
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD
console.log("mongouri",MONGODB_URI_PROD)

app.use(bodyParser.json());
app.use(cors())
app.use("/api", indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(5050, () => {
  console.log("server on 5050");
});
