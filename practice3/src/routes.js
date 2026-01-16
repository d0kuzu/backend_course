const express = require("express");
const taskRoutes = require("./modules/task/task.routes");

const router = express.Router();

router.use("/task", taskRoutes);

module.exports = router;
