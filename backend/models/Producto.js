const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    photo:{type: String, required: true},
    photo1:{type:String, required: true},
    description:{type: String},
    stock:{type: String},
    category:{type:String},
    views:{type: Number},
    rating:{type: Number, default: 5},
    photo1:{type: String},
    photo2:{type: String}
},{timestamps:true})

const Product = mongoose.model('product', productSchema);
module.exports = Product;
