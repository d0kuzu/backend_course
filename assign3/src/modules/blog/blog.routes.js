const blogRoutes = require("express").Router();
const controller = require("./blog.controller");

blogRoutes.post("/blogs", controller.create);
blogRoutes.get("/blogs", controller.getAll);
blogRoutes.get("/blogs/:id", controller.getOne);
blogRoutes.put("/blogs/:id", controller.update);
blogRoutes.delete("/blogs/:id", controller.delete);

module.exports = blogRoutes;
