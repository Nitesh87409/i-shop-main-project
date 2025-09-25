const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');
const CartModel = require('../models/cart.model');


const UserController = {
    async read(req, res) {
        try {
            const { id } = req.body
            if (id) {
                const user = await UserModel.findById({ _id: id })
                res.send({ flag: 1, user })
            }
            const users = await UserModel.find({ deletedAt: null })
            res.send({ flag: 1, users })
        } catch (error) {
            res.send(
                {
                    flag: 0,
                    message: "Internal Server Error"
                }
            )
        }
    },
    async register(req, res) {
        try {
            const { name, email, phone, password } = req.body;

            const userExists = await UserModel.findOne({ $or: [{ email }, { phone }] });
            if (userExists) {
                return res.send({ flag: 0, message: "User already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new UserModel({ name, email, phone, password: hashedPassword });
            await newUser.save();

            res.send({ flag: 1, message: "User Created", user: { ...newUser.toJSON(), password: "" } });
        } catch (err) {
            console.log(err.message)
            res.send({ flag: 0, message: `Internal Server Errors`  });
        }
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            // console.log("LOGIN", email, password);
            
            // console.log("req.body", req.body);
            
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                return res.send({ flag: 0, message: "User Not Found" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.send({ flag: 0, message: 'Invalid Password' });
            const UserCart = await CartModel.find({ user_id: user._id }).populate({
                path: "product_id",
                select: "_id original_price discounted_price"
            })

            res.send({ flag: 1, message: "Login Success", user: { ...user.toJSON(), password: "", cart: UserCart } });
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" , });
            console.log(error.message);
            
        }
    },
    async updatepassword(req, res) {
        try {
            const { currentpassword, newpassword,} = req.body;
            const { user_id } = req.params
            if (user_id) {
                const user = await UserModel.findById({ _id: user_id })
                const isMatch = await bcrypt.compare(currentpassword, user.password);
                if (!isMatch) {
                    res.send({ flag: 0, message: "Password Not Match" })
                }
                const hashedPassword = await bcrypt.hash(newpassword, 12);
                const newUser = await UserModel.updateOne({ _id: user_id }, { password: hashedPassword })
            }
            res.send(
                {
                    flag: 1,
                    message: "Change Password Sccessfully"
                }
            )
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async AddAddress(req, res) {
        try {
            const user_id = req.params.user_id;
            const { isdefault } = req.body
            const user = await UserModel.findById({ _id: user_id })
            if (!user) return res.send({ flag: 0, message: "User Not Found" })
            user.address.push(req.body)
            const updateduser = await user.save();
            res.send({ flag: 1, message: "User Address Successfully Updated", updatedUser: { ...updateduser.toJSON(), password: "" } })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async RemoveAddress(req, res) {
        try {
            const { user_id, index } = req.params;

            // Find user by ID
            const user = await UserModel.findById(user_id);
            if (!user) return res.send({ flag: 0, message: "User Not Found" });

            // Validate index
            if (index < 0 || index >= user.address.length) {
                return res.send({ flag: 0, message: "Invalid address index" });
            }

            // Remove address by index
            user.address.splice(index, 1);

            // Save updated user
            const updatedUser = await user.save();

            res.send({ flag: 1, message: "Address removed successfully", updatedUser });
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async toggledefault(req, res) {
        try {
            const { user_id, address_id } = req.params; // Extract user ID and address ID from params
    
            // Fetch the user
            const user = await UserModel.findById(user_id);
            if (!user) {
                return res.send({ flag: 0, message: "User not found" });
            }
    
            // Ensure addresses exist
            if (!user.address || user.address.length === 0) {
                return res.send({ flag: 0, message: "No addresses found for the user" });
            }
    
            // Check if the address ID exists in the user's address list
            const addressIndex = user.address.findIndex(addr => addr._id.toString() === address_id);
            if (addressIndex === -1) {
                return res.send({ flag: 0, message: "Invalid address ID" });
            }
    
            // Set all addresses to false before setting the selected one to true
            user.address.forEach((addr) => (addr.isdefault = false));
            user.address[addressIndex].isdefault = true;
    
            // Save changes to the database
            await user.save();
    
            // Send the updated user data back
            const updatedUser = user.toJSON()
            delete updatedUser.password; // Remove password before sending response
            res.send({ flag: 1, message: "Default address updated successfully", user: updatedUser });
        } catch (error) {
            console.error("Error in toggledefault:", error.message);
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },

    // async toggledefault(req, res) {
    //     try {
    //         const { user_id, index, value } = req.params;
    //         const isDefault = value === "true"; // Convert string to boolean

    //         // Fetch the user
    //         const user = await UserModel.findById(user_id);
    //         if (!user) {
    //             return res.send({ flag: 0, message: "User not found" });
    //         }

    //         // Ensure addresses exist
    //         if (!user.address || user.address.length <= index) {
    //             return res.send({ flag: 0, message: "Invalid address index" });
    //         }

    //         // Set all addresses to false before setting the selected one to true
    //         user.address.forEach((addr) => (addr.isdefault = false));
    //         user.address[index].isdefault = isDefault;

    //         // Save changes to the database
    //         await user.save();

    //         // Send the updated user data back
    //         res.send({ flag: 1, message: "Default address updated", user: { ...user.toJSON(), password: "" } });
    //     } catch (error) {
    //         res.send({ flag: 0, message: "Internal Server error" });
    //     }
    // },
    async UpdateUser(req, res) {
        try {
            const { user_id } = req.params;
            // console.log("Update User ID", user_id);
            
            const { name, email, phone } = req.body;
            // Find and update user, return updated user
            const user = await UserModel.findByIdAndUpdate(user_id, { name, email, phone }, { new: true });
            if (!user) { return res.send({ flag: 0, message: "User Not Found" }); }
            // Remove password before sending response
            const updatedUser = user.toObject(); // Convert Mongoose model to plain object
            delete updatedUser.password;
            res.send({ flag: 1, message: "User Data Updated", user: updatedUser });
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    }
}

module.exports = UserController;