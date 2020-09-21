const Product = require('../models/Product');

const itemsController = {
    newProduct: async (req, res) => {
        const newProduct = new Product({...req.body})
        newProduct
        .save()
        .then(resp => res.json({ success: true, resp }))
        .catch(error => res.json({ success: false, error }))
    },
    getProducts: async (req, res) => {
		const products = await Product.find({ ...req.params })
		res.json({ success: true, products })
    },
    deleteProductById: (req, res) => {
        const id = req.body._id
        Product.findByIdAndDelete({_id: id})
        .then(() => res.json({success: true, res: "El producto ha sido eliminado con éxito."}))
        .catch(err=>res.json({success:false, error: err}))	
    },
    getProductById: async (req,res) => {
        const product= await Product.findOne({...req.params})
        res.json({
            success: true,
            product
        })
    },
}
module.exports= itemsController
