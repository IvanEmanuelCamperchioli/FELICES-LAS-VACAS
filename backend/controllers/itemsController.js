const Product = require('../models/itemModel');
const nodeMailer = require('nodemailer')


var transport = nodeMailer.createTransport({
    port:465, 
    host:"smtp.gmail.com",
    auth: {
        pass: "123456789Emi",
        user: "emiruffini5@gmail.com"
    },
    tls: { rejectUnauthorized: false }
})

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
        
        try{
        const product= await Product.findOne({_id:id})
        
        res.json({
            success: true,
            response: {product}
        })
        }catch(error){
            res.json({
                success: false,
                error
            })
        }
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
    modifyPropertyTotalProduct: async (req, res) => {
        const idProduct = req.params.id
        const { cantModify, aProperty } = req.body

        const newModify = await Product.findOneAndUpdate({ _id: idProduct }, { [aProperty]: cantModify })

        res.json({
            success:true,
            newModify
        })
    },
    confirmBuy: async (req, res) =>{
        const products= req.body
        const email = req.user.mail
        console.log(req.body)
        console.log(req.user)

        
           
        try{
            const asyncRes = await Promise.all(products.map(async (product) => {
                const productSaved = await Product.findOne({_id : product.product._id})
                console.log(productSaved)
                const newStock = productSaved.stock - product.quantity
                const act = await Product.updateOne({_id:productSaved._id}, {stock:newStock}) 
                console.log(act)
            }));
            
            var mailOptions = {
                from: "Felices Las Vacas <notresponse@notreply.com>",
                sender: "Felices Las Vacas <notresponse@notreply.com>",
                to: `${email}`,
                subject: "Compra confirmada",
                html:  `<div>
                <h1>Muchas gracias por tu compra</h1>
                <h2>En el transcurso de 5 dias hábiles los productos llegaran a tu dirección<h2>
                <h2>Por cualquier consulta comunicarse a feliceslasvacas@gmail.com<h2>               
                </div>`,
            }
            transport.sendMail(mailOptions, (error, info) => {
                res.send("email enviado")
            })
            res.json({
                success:true,
                response: "compra confirmada"
            })
        }catch(error){
            res.json({
                success:false,
               response: error
            })
        }
    }
}
module.exports= itemsController