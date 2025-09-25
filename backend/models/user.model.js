const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        address: [{
            name: String,
            flat: String,
            landmark: String,
            street: String,
            area: String,
            district: String,
            state: String,
            pincode: String,
            contact: String,
            isdefault: { type: Boolean, default: false }
        }],
        phone: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel