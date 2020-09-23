const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usersController = {

    crearCuenta: async (req, res) => {
        const { username, password, email, name, lastname, logInGoogle} = req.body
        const hashedPassword = bcryptjs.hashSync(password.trim(), 10)
        const userExists = await User.findOne({ username: username })

        if (userExists) {
            res.json({ success: false, message: "Disculpe, ése usuario ya está en uso." })
        } else {
        
            const newUser = new User({ name, lastname, email, username, password: hashedPassword, logWithGoogle, urlpic: photoUrl, firstTime, favConsole })

            const user = await newUser.save()

            jwt.sign({ ...newUser }, process.env.SECRETORKEY, {}, (error, token) => {

                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, token, name: newUser.name, lastname: newUser.lastname })
                }
            }
            )
        }
    },

    createAccountGoogle: async (req, res) => {
        const { usuario, password, email, urlFoto, nombre, apellido, logInGoogle, primeraVez } = req.body

        const passwordHasheada = bcryptjs.hashSync(password.trim(), 10)
        const usuarioExistente = await Usuario.findOne({ usuario: usuario })
        if (usuarioExistente) {
            res.json({ success: false, message: "Lo siento, el usuario ya está en uso." })
        } else {
            const nuevoUsuario = new User({ nombre, apellido, email, urlFoto, usuario, password: passwordHasheada, logInGoogle, primeraVez })

            const usuario = await nuevoUsuario.save()
            jwt.sign({ ...nuevoUsuario }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, token, urlFoto: nuevoUsuario.urlFoto, nombre: nuevoUsuario.nombre })
                }
            }
            )
        }
    },

    userLogin: async (req, res) => {
        const { username, password } = req.body

        const userExist = await User.findOne({ username })

        if (!userExist) {
            res.json({
                success: false, message: "Usuario y/o contraseña incorrectos"
            })
        } else {
            const passwordMatches = bcryptjs.compareSync(password, userExist.password)

            if (!passwordMatches) {
                res.json({
                    success: false, message: "Usuario y/o contraseña incorrectos"
                })
            } else if (userExist.logWithGoogle && !req.body.logInMethod) {
                res.json({
                    success: false, message: "Su cuenta fué creada por otro medio."
                })
            }
            else {
                jwt.sign({ ...userExist }, process.env.SECRETORKEY, {}, (error, token) => {
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({ 
                            success: true, 
                            token,
                            urlPic: userExist.urlPic,
                            username: userExist.username,
                            name: userExist.name,
                            lastName: userExist.lastName,
                            email: userExist.email })
                    }
                })
            }

        }
    },

    userLogOut: () => {
        return (dispatch, getState) => {
            dispatch({
                type: "LOGOUT_USER"
            })
        }
    },

    tokenVerificator: (req, res) => {
        const { name, urlpic, username, firstTime, lastname, favConsole } = req.user
        res.json({
            success: true,
            name,
            urlpic,
            username,
            firstTime,
            lastname,
            favConsole
        })
    },

    modificarUsuario: async (req, res) => {
        const { usuario, nombre, apellido, urlFoto } = req.body
        
        if (req.files) {
            var archivo = req.files.urlFoto
            // var extension = archivo.nombre.split('.')[1]
            // var nombreArchivo = req.body.usuario + '.' + extension
            var nombreArchivo = archivo.nombre
            var serverURL = `uploads/${nombreArchivo}`
            archivo.mv(serverURL)
            var fotoUrl = `http://localhost:4000/uploads/${nombreArchivo}`
        } else {
            var fotoUrl = urlFoto
        }

        const modificarUsuario = await Usuario.findOneAndUpdate({ usuario: usuario }, { nombre, urlFoto: fotoUrl, apellido }, { returnNewDocument: true })
        res.json({
            success: true,
            nombre,
            apellido,
            fotoUrl
        })

    }

}


module.exports = usersController