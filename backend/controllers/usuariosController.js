const Usuario = require("../models/Usuario")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usuariosController = {

    crearCuenta: async (req, res) => {
        const { usuario, password, email, nombre, apellido, logInGoogle, primeraVez} = req.body
        const passwordHasheada = bcryptjs.hashSync(password.trim(), 10)
        const usuarioExistente = await Usuario.findOne({ usuario: usuario })

        if (usuarioExistente) {
            res.json({ success: false, message: "Disculpe, ése usuario ya está en uso." })
        } else {
            const archivo = req.files.urlFoto
            const nombreArchivo = req.body.usuario
            const serverURL = `uploads/${nombreArchivo}`

            archivo.mv(serverURL)

            const fotoUrl = `http://localhost:4000/uploads/${nombreArchivo}`

            const nuevoUsuario = new Usuario({ nombre, apellido, email, usuario, password: passwordHasheada, logInGoogle, urlFoto: fotoUrl, primeraVez})

            const usuario = await nuevoUsuario.save()

            jwt.sign({ ...nuevoUsuario }, process.env.SECRETORKEY, {}, (error, token) => {

                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, token, urlFoto: nuevoUsuario.urlFoto, nombre: nuevoUsuario.nombre, apellido: nuevoUsuario.apellido, email: nuevoUsuario.email })
                }
            }
            )
        }
    },

    crearCuentaConGoogle: async (req, res) => {

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

    loguearUsuario: async (req, res) => {
        const { usuario, password } = req.body

        const usuarioExistente = await Usuario.findOne({ usuario })

        if (!usuarioExistente) {
            res.json({
                success: false, message: "Usuario y/o contraseña incorrectos"
            })
        } else {
            const passwordCoincidente = bcryptjs.compareSync(password, usuarioExistente.password)

            if (!passwordCoincidente) {
                res.json({
                    success: false, message: "Usuario y/o contraseña incorrectos"
                })
            } else if (usuarioExistente.logInGoogle && !req.body.logInMethod) {
                res.json({
                    success: false, message: "Su cuenta fué creada por otro medio."
                })
            }
            else {
                jwt.sign({ ...usuarioExistente }, process.env.SECRETORKEY, {}, (error, token) => {
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({ 
                            success: true, 
                            token,
                            urlFoto: usuarioExistente.urlFoto,
                            usuario: usuarioExistente.usuario,
                            nombre: usuarioExistente.nombre,
                            apellido: usuarioExistente.apellido,
                            primeraVez: usuarioExistente.primeraVez,
                            email: usuarioExistente.email })
                    }
                })
            }

        }
    },


    verificadorDeToken: (req, res) => {
        const { nombre, urlFoto, usuario, apellido, primeraVez } = req.user
        res.json({
            success: true,
            nombre,
            urlFoto,
            usuario,
            apellido,
            primeraVez,
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


module.exports = usuariosController