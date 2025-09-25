const express = require('express');

const ColorController = require('../controllers/color.controller');


const colorRouter = express.Router();

colorRouter.get(
    "/get-trashed", ColorController.readTrashed
)
colorRouter.get(
    "/:id?", ColorController.read
)

colorRouter.get(
    "/color-exists/:name", ColorController.colorExist
)

colorRouter.post(
    "/create", ColorController.create
)

colorRouter.patch(
    "/change-status/:id/:status", ColorController.toggleStatus
)

colorRouter.put(
    "/update/:id", ColorController.update
)
colorRouter.delete(
    "/move-to-trash/:id", ColorController.moveTrash
)
colorRouter.patch(
    "/restore/:id", ColorController.Restore
)
colorRouter.delete(
    "/delete/:id", ColorController.delete
)


module.exports = colorRouter;