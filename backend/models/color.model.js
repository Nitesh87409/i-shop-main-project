const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ColorSchema = new Schema(
    {
        name:{
            type: String,
            maxLength:20,
            required: true,
            unique: true
        },
        code:{
            type: String,
            maxLength:10,
            required: true,
            unique: true
        },
        status:{
            type:Boolean,
            default:true
        },
        deletedAt:{
            type:Date,
            default:null
        }
    },
    {
        timestamps: true
    }
)

const ColorModal = mongoose.model('color', ColorSchema)



module.exports = ColorModal;