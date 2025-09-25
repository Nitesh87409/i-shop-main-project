const express = require('express');
const CartController = require("../controllers/cart.controller")

const CartRouter = express.Router();

// Read Cart
// CartRouter.get("/:user_id",CartController.readCart)

// Add To Cart
CartRouter.post("/addcart",CartController.addCart)

// Increse Cart Product Quantity
CartRouter.put("/inc",CartController.incCartQuantity)

// decrease Cart Product Quantity
CartRouter.put("/dec",CartController.decCartQuantity)

// remove Cart Item
CartRouter.delete("/remove",CartController.removeCartItem)

// Remove All Cart Item
CartRouter.delete("/removeall",CartController.removeAllCart)


module.exports = CartRouter;