const express = require("express");
const fileUpload = require("express-fileupload")
const ProductController = require("../controllers/product.controller");
const ProductRouter = express.Router();

ProductRouter.get(
    "/trash", ProductController.readTrashed
)
ProductRouter.get("/:id?", ProductController.read)

// ProductRouter.get(
//     "/category/:slug?",ProductController.productCategory
// )

ProductRouter.post("/create",
    fileUpload(
        {
            createParentPath:true
        }
    )
    ,ProductController.create)


    ProductRouter.post(
        "/upload-other-images/:id",
        fileUpload(
            {
                createParentPath:true
            }
        ),ProductController.uploadOtherImages
    )
    ProductRouter.delete(
        "/delete-other-images/:id/:index",
        ProductController.deleteOtherImages
    )

    ProductRouter.put(
        "/update/:id",
        fileUpload(
            {
                createParentPath: true
            }
        ),
        ProductController.update
    )

    ProductRouter.patch(
        "/change-status/:id/:new_status", ProductController.toggleStatus
    );

    ProductRouter.delete("/move-to-trash/:id", ProductController.MovetoTrash)
    ProductRouter.delete("/delete/:id", ProductController.delete)
    ProductRouter.patch(
        "/restore/:id", ProductController.Restore
    )


    module.exports = ProductRouter;