const express = require("express")
const itemsController = require("../controllers/itemsController")
const usuariosController = require("../controllers/usuariosController")
const router = express.Router()



router.route('/usuario')
.post(usuariosController.crearCuenta)

router.route('/usuarioGoogle')
.post(usuariosController.crearCuentaConGoogle)

router.route('/login')
.post(usuariosController.loguearUsuario)

router.route('/modificarUsuario')
.put(usuariosController.modificarUsuario)

router.route("/items")
.get(itemsController.getProducts)
.post(itemsController.newProduct)

router.route("/items/:id")
.get(itemsController.getProductById)
.delete(itemsController.deleteProductById)

module.exports = router;
