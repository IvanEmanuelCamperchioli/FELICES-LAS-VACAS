const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    price:{type: Number, required: true},
    description:{type: String, required:true},
    comments:{type: Array},
    brand:{type: String, required:true},
    views:{type: Number},
    postedBy:{type: mongoose.Schema.ObjectId, ref: "user"},
},{timestamps:true})

const Product = mongoose.model('product', productSchema);
module.exports = Product;
