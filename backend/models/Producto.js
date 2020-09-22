const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String},
    stock:{type: String},
    category:{type:String},
    views:{type: Number},
    rating:{type: Number, default: 5}
},{timestamps:true})

const Product = mongoose.model('product', productSchema);
module.exports = Product;
