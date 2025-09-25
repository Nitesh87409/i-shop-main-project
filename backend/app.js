require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const CategoryRouter = require('./routers/category.router');
const ProductRouter = require('./routers/product.router');
const colorRouter = require('./routers/color.router');
const UserRouter = require('./routers/user.router');
const CartRouter = require('./routers/cart.router');
const AdminRouter = require('./routers/admin.router');
const OrderRouter = require('./routers/order.router');
const TransactionRouter = require("./routers/transaction.router");

const app = express();
const port = process.env.PORT ||5000;

// hosting public folder in localhost
app.use(express.static("public"))
// Middleware
app.use(express.json());
// origin : '*' this option allows requests from any origin
app.use(cors({
    origin: '*',
}));

// MongoDB connection
// localhost => 127.0.0.1
const mongoUri = process.env.NODE_ENV === "production"
  ? process.env.MONGODB_URI
  : "mongodb://127.0.0.1:27017/wsjp61";

mongoose.connect(mongoUri,{
    dbName: "wsjp61",
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err.message));

// Routes
app.use("/category", CategoryRouter);
app.use("/product", ProductRouter);
app.use("/color" , colorRouter)
app.use("/user", UserRouter)
app.use("/cart",CartRouter)
app.use("/admin", AdminRouter)
app.use("/order",OrderRouter)
app.use("/transaction",TransactionRouter)

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});