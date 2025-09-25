const express = require('express');
const adminController = require('../controllers/admin.controller');
const adminAuth = require('../middleware/adminAuth');
const AdminController = require('../controllers/admin.controller');

const AdminRouter = express.Router();

// admin trash
AdminRouter.get("/getTrashed", adminController.readTrash)

// admin data 
AdminRouter.get('/:id?',adminController.readadmin)

// Register admin
AdminRouter.post('/register', adminController.adminregister);

// Login admin
AdminRouter.post('/login', adminController.adminlogin);

// Restore Admin
AdminRouter.patch('/restore/:id',adminController.adminRestore)

// Move To Trash
AdminRouter.delete("/trash/:id",adminController.moveTrash)

// Admin profile
AdminRouter.put('/update_profile/:admin_id', adminController.adminUpdate);

// Admin Update Password
AdminRouter.patch('/change-status/:id/:new_status', AdminController.ToggleStatus);

AdminRouter.patch('/update_password/:admin_id', AdminController.updatepassword);

module.exports = AdminRouter;