const jwt = require('jsonwebtoken')
const crypto = require('crypto')
require('dotenv').config()
const getNewFileName = (filename) =>{
    return (Math.random()*1000) + (new Date().getTime()) + filename
}


const VerifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_KEY)
}

const generateToken = (admin) => {
    return jwt.sign(admin, process.env.TOKEN_KEY , {expiresIn:"1d"})
}

const verifyPaymentSignature = (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
    const secret = process.env.KEY_SECRET; // Store in env file
    const generated_signature = crypto
        .createHmac("sha256", secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");
    return generated_signature === razorpay_signature;
}


module.exports = {getNewFileName, generateToken, VerifyToken, verifyPaymentSignature}
