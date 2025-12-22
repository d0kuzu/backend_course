const userRoutes = require("express").Router();
const controller = require("./user.controller");

userRoutes.get("/", controller.getUser);

module.exports = userRoutes;
