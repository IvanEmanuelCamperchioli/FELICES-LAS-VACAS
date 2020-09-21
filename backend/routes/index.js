const express = require("express")
const itemsController = require("../controllers/itemsController")
const router = express.Router()

router.route("/items")
.get(itemsController.getProducts)
.post(itemsController.newProduct)

router.route("/items/:id")
.get(itemsController.getProductById)
.delete(itemsController.deleteProductById)

module.exports = router;
