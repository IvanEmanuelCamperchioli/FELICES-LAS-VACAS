const express = require("express")
const itemsController = require("../controllers/itemsController")
const usersController = require("../controllers/usersController")
const router = express.Router()



router.route('/usuario')
.post(usersController.crearCuenta)

router.route('/usuarioGoogle')
.post(usersController.crearCuentaConGoogle)

router.route('/login')
.post(usersController.loguearUsuario)

router.route('/modificarUsuario')
.put(usersController.modificarUsuario)

router.route('/tokenVerificator')
.get(passport.authenticate('jwt', { session: false }), usersController.tokenVerificator)

router.route("/items")
.get(itemsController.getProducts)
.post(itemsController.newProduct)

router.route("/items/:id")
.get(itemsController.getProductById)
.delete(itemsController.deleteProductById)

module.exports = router;
