const express = require("express")
const passport = require("../config/passport")
const itemsController = require("../controllers/itemsController")
const usersController = require("../controllers/usersController")
const router = express.Router()



router.route('/users')//Ruta para crear una cuenta
.post(usersController.createAccount)

router.route('/user')//Ruta para loguear un usuario
.post(usersController.userLogin)

router.route('/userInfo/:username').get(usersController.getUserInformation)
router.route('/editUser').put(usersController.editUser)

router.route('/getUser')//Obtengo si el usuario ya se registro con su cuenta de google
.post(usersController.getUsersExist)

router.route('/getUserAddress')//Obtengo la direccion de un usuario logeado
.get(passport.authenticate('jwt', { session: false }), usersController.getUserAddress)

router.route('/tokenVerificator')//Ruta para perdurar la sesión
.get(passport.authenticate('jwt', { session: false }), usersController.tokenVerificator)

router.route('/sendAddress')//Ruta para actualizar la direccion 
.put(passport.authenticate('jwt', { session: false }), usersController.updateAddress)

router.route("/items")
.get(itemsController.getProducts)//Ruta para obtener todos los productos
.post(itemsController.newProduct)//Ruta para cargar un producto 

router.route("/items/stocks/:id")//Ruta para modificar el stock de manera unitaria
.put(itemsController.modifyStockProduct)

router.route("/items/total/:id")//Ruta para modificar el stock en una cantidad determinada
.put(itemsController.modifyPropertyTotalProduct)

router.route("/items/:id")
.get(itemsController.getProductById)//Ruta para obtener un producto mediante su id
.delete(itemsController.deleteProductById)//Ruta para borrar un producto

router.route("/shopConfirm") //Ruta compra confirmada
.post(passport.authenticate('jwt', { session: false }), itemsController.confirmBuy)


module.exports = router;
