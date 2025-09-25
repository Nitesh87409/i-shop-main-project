const AdminModel = require("../models/admin.model");
const bcrypt = require("bcryptjs")
const { generateToken } = require("../helper");

const AdminController = {
    async readTrash(req, res) {
        try {
            const admins = await AdminModel.find({ deletedAt: { $ne: null } }).sort({ deletedAt: -1 });
            res.send({ flag: 1, admins })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async readadmin(req, res) {
        try {
            const { id } = req.params
            if (id) {
                const admin = await AdminModel.findById(id)
                res.send({ flag: 1, admin })
            }
            const admins = await AdminModel.find({ deletedAt: null })
            res.send({ flag: 1, admins })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async ToggleStatus(req, res) {
        try {
            // take id and new_status from link
            const { id, new_status } = req.params;
            await AdminModel.updateOne(
                {
                    _id: id
                },
                {
                    status: new_status
                }
            )
            res.send(
                {
                    flag: 1,
                    message: "Status Changed"
                }
            )
        } catch (error) {
            res.send(
                {
                    message: "Internal Server Error",
                    flag: 0,
                    error: error.message
                }
            )
        }
    },
    async adminregister(req, res) {
        try {
            const { name, email, contact, password, type } = req.body;
            const adminExists = await AdminModel.findOne({ $or: [{ email }, { contact }] });
            if (adminExists) {
                return res.send({ flag: 0, message: "Admin already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newAdmin = new AdminModel({ name, email, contact, type, password: hashedPassword });
            await newAdmin.save();
            res.send({ flag: 1, message: "Admin Created", admin: { ...newAdmin.toJSON(), password: "" } });
        } catch (err) {
            console.log(err.message)
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async adminlogin(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await AdminModel.findOne({ email: email });
            // console.log(admin, "admin");
            
            if (!admin) {
                return res.send({ flag: 0, message: "Admin Not Found" });
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            // console.log(isMatch, "isMatch");
            
            if (!isMatch) return res.send({ flag: 0, message: 'Invalid Password' });
            const token = generateToken(admin.toJSON());
            res.send(
                {
                    flag: 1,
                    message: "Login Success",
                    admin: { ...admin.toJSON(), password: "" },
                    token: token
                }
                
                
            );
            
        } catch (error) {
            res.send({ flag: 0, message: `Internal Server Error ${error.message}` });
        }
    },
    async adminRestore(req, res) {
        try {
            const id = req.params.id
            const admin = await AdminModel.findByIdAndUpdate({ _id: id }, { deletedAt: null, status: true })
            if (!admin) { res.send({ flag: 0, message: "Admin ID Invalid" }) }
            res.send({ flag: 1, message: "Restore Admin" })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async moveTrash(req, res) {
        try {
            const { id } = req.params;
            await AdminModel.updateOne({ _id: id }, { status: false, deletedAt: new Date() })
                .then(() => { res.send({ flag: 1, message: "Move To Trash" }) })
                .catch((error) => { res.send({ flag: 0, message: "Unable To Trash" }) })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    },
    async updatepassword(req, res) {
        try {
            const { newpassword } = req.body;
            const { admin_id } = req.params
            if (admin_id) {
                const admin = await AdminModel.findById({ _id: admin_id })
                if (!admin) {
                    res.send({ flag: 0, message: "Admin Not Founded" })
                }
                const hashedPassword = await bcrypt.hash(newpassword, 12);
                await AdminModel.updateOne({ _id: admin_id }, { password: hashedPassword })
            }
            res.send({ flag: 1, message: "Change Password Sccessfully" })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" });
        }
    },
    async adminUpdate(req, res) {
        try {
            const { admin_id } = req.params
            const { name, email, contact, type } = req.body
            const admin = await AdminModel.findByIdAndUpdate({ _id: admin_id }, { name: name, email: email, contact: contact, type: type }, { new: true })
            if (!admin) { res.send({ flag: 0, message: "Admin Not Found" }) }
            res.send({ flag: 1, message: "Admin Updated", admin: { ...admin.toJSON(), password: "" } })
        } catch (error) {
            res.send({ flag: 0, message: "Internal Server Error" })
        }
    }
};

module.exports = AdminController;