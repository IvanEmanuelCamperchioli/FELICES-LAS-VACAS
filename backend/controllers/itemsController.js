const Product = require('../models/itemModel');

const itemsController = {
    newProduct: async (req, res) => {
        const newProduct = new Product({...req.body})
        newProduct
        .save()
        .then(resp => res.json({ success: true, response: newProduct }))
        .catch(error => res.json({ success: false, error }))
    },
    getProducts: async (req, res) => {
        const products = await Product.find()
		res.json({ success: true, products })
    },
    deleteProductById: (req, res) => {
        var id = req.params.id
        Product.findByIdAndDelete({_id: id})
        .then(() => res.json({success: true, res: "El producto ha sido eliminado con éxito."}))
        .catch(err=>res.json({success:false, error: err}))	
    },
    getProductById: async (req,res) => {
        var id = req.params.id
        const product= await Product.findOne({_id:id})
        res.json({
            success: true,
            product
        })
    },
}
module.exports= itemsController
