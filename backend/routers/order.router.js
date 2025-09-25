const express = require("express")
const OrderController = require("../controllers/order.controller")
const OrderRouter = express.Router()


// Read All Orders
OrderRouter.get("/", OrderController.readAllOrders)

// Read Order Details
OrderRouter.get("/:user_id/:order_id?" , OrderController.readOrder)

// Create Order
OrderRouter.post("/createOrder",OrderController.createOrder)

// payment success Order
OrderRouter.post("/paymentSuccess",OrderController.paymentSuccess)

// Update Order Details
OrderRouter.put("/updateOrder/:id",OrderController.updateOrder)

// Move To Trash Order
OrderRouter.delete("/:id",OrderController.TrashOrder)


module.exports = OrderRouter