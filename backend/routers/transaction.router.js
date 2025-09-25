const express = require("express")
const TransactionController = require("../controllers/tansaction.controller")

const TransactionRouter = express.Router()

// Read Transaction
TransactionRouter.get("/",TransactionController.read)


module.exports = TransactionRouter