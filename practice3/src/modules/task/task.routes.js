const taskRoutes = require("express").Router();
const controller = require("./task.controller");

taskRoutes.post("/todo", controller.create);
taskRoutes.get("/todo", controller.getAll);
taskRoutes.put("/todo/:id", controller.update);
taskRoutes.delete("/todo/:id", controller.delete);

module.exports = taskRoutes;
