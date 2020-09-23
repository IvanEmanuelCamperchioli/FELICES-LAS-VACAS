const express = require("express")
const itemsController = require("../controllers/itemsController")
const usersController = require("../controllers/usersController")
const router = express.Router()



router.route('/usuarios')
.post(usuariosController.crearCuenta)

router.route('/usuario')
.post(usuariosController.loguearUsuario)
/* router.route('/usuarioGoogle')
.post(usuariosController.crearCuentaConGoogle) */

router.route('/getUser')
.post(usuariosController.getUsersExist)

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
