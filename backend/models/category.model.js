const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
        // Men's Shoes => mens-shoes

    },
    status: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
})

const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;