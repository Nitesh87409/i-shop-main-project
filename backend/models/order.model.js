const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    original_price: { type: Number, required: true },
    discount_price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total_price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [productSchema],
    original_total: { type: Number, required: true },
    final_total: { type: Number, required: true },
    address: {
        name: String,
        flat: String,
        landmark: String,
        street: String,
        area: String,
        district: String,
        state: String,
        pincode: String,
        contact: String,
    },
    payment_method: { type: Number, required: true },
    payment_status: { type: Number, enum: [0, 1, 2, 3, 4], default: 0 },
    // 0: Pending ,1:Success , 2: Failed ,3: Refund Init, 4: Refunded
    order_status: { type: Number, enum: [0, 1, 2, 3, 4, 5, 6, 7] },
    //0: Waiting for Payment 1: Order Placed, 2: Order Packed, 3: Order Dispatch, 4: Order Shipped, 5:Out for Delivery , 6:Delivered , 7:Order Canceled
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel