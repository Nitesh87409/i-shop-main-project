const express = require("express");
const CategoryController = require("../controllers/category.controllers");
const CategoryRouter = express.Router();


CategoryRouter.get("/get-trashed", CategoryController.readTrashed)
CategoryRouter.get("/:id?", CategoryController.read)
CategoryRouter.get("/category-exists/:name", CategoryController.categoryExists)
CategoryRouter.post("/create", CategoryController.create)
CategoryRouter.put("/update/:id", CategoryController.update)
CategoryRouter.patch("/change-status/:id/:new_status", CategoryController.ToggleStatus)
CategoryRouter.delete("/delete/:id", CategoryController.delete)
CategoryRouter.delete("/move-to-trash/:id", CategoryController.MovetoTrash)
CategoryRouter.patch("/restore/:id", CategoryController.restore)


module.exports = CategoryRouter;
