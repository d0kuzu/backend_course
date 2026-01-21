const express = require("express");
const blogRoutes = require("./modules/blog/blog.routes");

const router = express.Router();

router.use("/blog", blogRoutes);

module.exports = router;
