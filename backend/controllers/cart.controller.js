const UserModel = require('../models/user.model');
const CartModel = require('../models/cart.model');

const CartController = {
    // async readCart(req, res) {
    //     try {
    //         const { user_id } = req.params;
    //         const cart = await CartModel.findOne({user_id:user_id})
    //         if (!cart) {
    //             res.send({ flag: 0, message: "Invalid User" })
    //         } else {
    //             res.send({ flag: 1, cart })
    //         }
    //     } catch (error) {
    //         res.send({ flag: 0, message: "Internal Server Error" })
    //     }
    // },
    async addCart(req, res) {
        try {
            const { user_id, product_id, color_id } = req.body
            // console.log(user_id, product_id, color_id, "Req Body");
            

            const user = await UserModel.findById(user_id)
            if (!user) {
                res.send({ flag: 0, message: "User Not Found" })
            }
            const cart = await CartModel.findOne({ user_id, product_id, color_id })
            // console.log(cart, "cart");
            
            if (cart) {
                cart.quantity += 1;
                await cart.save()
                res.send({ flag: 1, message: "Cart Updated Successfully" })
            } else {
                const newcart = new CartModel({ user_id, product_id, color_id, quantity: 1 })
                // console.log(newcart, "new cart");
                
                await newcart.save()
                res.send({ flag: 1, message: "Cart Added Successfully" })
            }

        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async incCartQuantity(req, res) {
        try {
            const { user_id, product_id, color_id } = req.body;

            const user = await UserModel.findById(user_id);
            if (!user) {
                return res.send({ flag: 0, message: "User Not Found" });
            }

            const cart = await CartModel.findOne({ user_id, product_id, color_id });
            if (cart) {
                cart.quantity += 1;
                await cart.save();
                return res.send({ flag: 1, message: "Cart Quantity Increased Successfully", quantity: cart.quantity });
            } else {
                return res.send({ flag: 0, message: "Cart Item Not Found" });
            }

        } catch (error) {
            return res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async decCartQuantity(req, res) {
        try {
            const { user_id, product_id, color_id } = req.body;

            const user = await UserModel.findById(user_id);
            if (!user) {
                return res.send({ flag: 0, message: "User Not Found" });
            }

            const cart = await CartModel.findOne({ user_id, product_id, color_id });
            if (cart) {
                if (cart.quantity > 1) {
                    cart.quantity -= 1;
                    await cart.save();
                    return res.send({ flag: 1, message: "Cart Quantity Decreased Successfully", quantity: cart.quantity });
                } else {
                    await CartModel.deleteOne({ _id: cart._id });
                    return res.send({ flag: 1, message: "Item Removed from Cart" });
                }
            } else {
                return res.send({ flag: 0, message: "Cart Item Not Found" });
            }

        } catch (error) {
            return res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async removeCartItem(req, res) {
        try {
            const { user_id, product_id, color_id } = req.body;
            const cartItem = await CartModel.findOneAndDelete({ user_id, product_id, color_id });

            if (!cartItem) {
                return res.send({ flag: 0, message: "Item not found in cart" });
            }

            res.send({ flag: 1, message: "Item removed successfully" });
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async removeAllCart(req, res) {
        try {
            const { user_id } = req.body;
            const user = await UserModel.findById(user_id);
            if (!user) {
                return res.send({ flag: 0, message: "User Not Found" });
            }
            await CartModel.deleteMany({ user_id });
            res.send({ flag: 1, message: "Cart emptied successfully" });
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    }
}


module.exports = CartController