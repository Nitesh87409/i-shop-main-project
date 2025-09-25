const mongoose = require('mongoose');
const CategoryModel = require('./category.model');
const ColorModal = require('./color.model');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        maxLength: 100,
        required: true,
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CategoryModel
    },
    color: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ColorModal
        }
    ],
    main_image:{
        type:String
    },
    other_images:[{
        type:String,
        default:null
    }],
    original_price: {
        type: Number,
        required: true,
        min: 1
    },
    discounted_price: {
        type: Number,
        default:0
    },
    discount_percentage: {
        type: String,
        default:0
    },
    stock: {
        type: Boolean,
        default: true
    },
    description:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    topselling:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    }
},
{
    timestamps:true
}
)

const ProductModel = mongoose.model('product',ProductSchema);

module.exports = ProductModel;