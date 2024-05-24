const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use("/api", indexRouter);

const mongoURI = `mongodb://localhost:27017/todo-demo`;

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
