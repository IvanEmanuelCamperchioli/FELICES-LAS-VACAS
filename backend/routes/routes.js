const express = require("express")
const passport = require("../config/passport")
const itemsController = require("../controllers/itemsController")
const usersController = require("../controllers/usersController")
const router = express.Router()



router.route('/usuarios')
.post(usersController.createAccount)

router.route('/usuario')
.post(usersController.userLogin)


router.route('/getUser')
.post(usersController.getUser)
 
router.route('/login')
.post(usersController.userLogin)

/* router.route('/modificarUsuario')
.put(usersController.modificarUsuario) */

router.route('/tokenVerificator')
.get(passport.authenticate('jwt', { session: false }), usersController.tokenVerificator)

router.route("/items")
.get(itemsController.getProducts)
.post(itemsController.newProduct)

router.route("/items/:id")
.get(itemsController.getProductById)
.delete(itemsController.deleteProductById)

module.exports = router;
