const express = require('express');
const UserController = require("../controllers/user.controller")

const UserRouter = express.Router();

// get user data
UserRouter.get('/',UserController.read)

// User registration
UserRouter.post('/register', UserController.register);

// User login
UserRouter.post('/login', UserController.login);

// User updatePassword
UserRouter.post('/update_password/:user_id', UserController.updatepassword);

// User Add Address 
UserRouter.post('/address/:user_id',UserController.AddAddress);

// remove address 
UserRouter.delete("/remove_address/:user_id/:index", UserController.RemoveAddress);

//set default address  

UserRouter.patch("/defaultAddress/:user_id/:address_id", UserController.toggledefault);
// UserRouter.patch("/defaultAddress/:user_id/:index/:value" , UserController.toggledefault)

// Update User Data
UserRouter.put("/updateuser/:user_id" ,UserController.UpdateUser)

module.exports = UserRouter;