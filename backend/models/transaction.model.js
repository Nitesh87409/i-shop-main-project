const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        order_id: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: [0, 1, 2, 3, 4], // 0: Pending, 1:Success, 2:Failed , 3: Refund Init, 4: Refunded
            default: 'pending'
        },
        paymentMethod: {
            type: String,
            enum: [0, 1], // 0: Cash On Delivery(COD) , 1: RazorPay
            required: true
        },
        razorpay_order_id: { type: String },
        razorpay_payment_id: { type: String },
        razorpay_signature: { type: String }
    },
    {
        timestamps: true
    }
);

const TransactionModel = mongoose.model('Transaction', TransactionSchema);
module.exports = TransactionModel;