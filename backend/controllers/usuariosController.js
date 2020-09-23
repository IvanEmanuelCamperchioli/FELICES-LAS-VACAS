const Usuario = require("../models/Usuario")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usuariosController = {

    crearCuenta: async (req, res) => {
        const { usuario, password, email, nombre, apellido, logInGoogle} = req.body
        let error = false
        const passwordHasheada = bcryptjs.hashSync(password.trim(), 10)
        
            const nuevoUsuario = new Usuario({ 
                nombre: nombre.trim().charAt(0).toUpperCase() + nombre.slice(1), 
                apellido: apellido.trim().charAt(0).toUpperCase() + apellido.slice(1), 
                email: email.trim(), 
                usuario: usuario.trim(), 
                password: passwordHasheada, 
                logInGoogle})

            try{
                const res = await nuevoUsuario.save()
                console.log(res)
            }
            catch(err){
                error = err
            }
            finally{
            if (error){
                res.json({
                    success: false,
                    response: error
                })
            }else{
            jwt.sign({ ...nuevoUsuario }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, response:{token, nombre: nuevoUsuario.nombre, apellido: nuevoUsuario.apellido, rol: nuevoUsuario.rol} })
                }
            })
            }
        }
        
    },


    loguearUsuario: async (req, res) => {
        const { usuario, password } = req.body
        console.log(req.body)
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
            } 
            else {
                jwt.sign({ ...usuarioExistente }, process.env.SECRETORKEY, {}, (error, token) => {
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({success: true, 
                            response:{
                            token,
                            nombre: usuarioExistente.nombre,
                            apellido: usuarioExistente.apellido,
                            rol: usuarioExistente.rol
                            }
                        })
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
    
    getUsersExist: async (req,res) =>{
        
        const usuario = req.body.usuario
        const usuarioExiste = await Usuario.findOne({usuario})
        if (usuarioExiste){
            res.json({
                success:true
            })
        }else{
            res.json({
                success:false
            })
        }
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