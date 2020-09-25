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
    modifyStockProduct: async (req,res) => {

        const idProduct = req.params.id
        const { cantStock } = req.body

        const productModify = await Product.findOne({ _id: idProduct })

        const newCantStock = productModify.stock + cantStock

        await Product.findOneAndUpdate({ _id: idProduct }, { stock: newCantStock })
        
        res.json({
            success:true,
            productModify
        })
    },
    modifyPriceProduct: async (req, res) => {
        const idProduct = req.params.id
        const { cantPrice } = req.body

        const newPrice = await Product.findOneAndUpdate({ _id: idProduct }, { price: cantPrice })

        res.json({
            success:true,
            newPrice
        })
    }
}
module.exports= itemsController
