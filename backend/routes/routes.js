const express = require("express")
const passport = require("../config/passport")
const itemsController = require("../controllers/itemsController")
const usersController = require("../controllers/usersController")
const router = express.Router()



router.route('/users')//Ruta para crear una cuenta
.post(usersController.createAccount)

router.route('/user')//Ruta para loguear un usuario
.post(usersController.userLogin)

/*router.route('/editUser')
.get(passport.authenticate('jwt', { session: false }), usersController.editUser)*/

router.route('/getUser')//Obtengo si el usuario ya se registro con su cuenta de google
.post(usersController.getUsersExist)

router.route('/getUserAddress')//Obtengo la direccion de un usuario logeado
.get(passport.authenticate('jwt', { session: false }), usersController.getUserAddress)

router.route('/tokenVerificator')//Ruta para perdurar la sesión
.get(passport.authenticate('jwt', { session: false }), usersController.tokenVerificator)

router.route('/sendAddress')
.put(passport.authenticate('jwt', { session: false }), usersController.updateAddress)

router.route("/items")
.get(itemsController.getProducts)
.post(itemsController.newProduct)

router.route("/items/stocks/:id")
.put(itemsController.modifyStockProduct)

router.route("/items/total/:id")
.put(itemsController.modifyPropertyTotalProduct)

router.route("/items/:id")
.get(itemsController.getProductById)
.delete(itemsController.deleteProductById)

module.exports = router;
