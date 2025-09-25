const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CartSchema = new Schema(
    {
        user_id:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        product_id:{
            type:Schema.Types.ObjectId,
            ref: "product",
            required:true
        },
        color_id:{
            type:Schema.Types.ObjectId,
            ref: "Color",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        }
    },
    {
        timestamps:true
    }
)

const CartModel = mongoose.model("Cart",CartSchema)
module.exports = CartModel