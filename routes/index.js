const express = require("express");
const router = express.Router();

const taskApi = require("./task.api");
const userApi = require('./user.api')

router.use("/tasks", taskApi);
router.use("/user", userApi);  //user post => create user

module.exports = router;
