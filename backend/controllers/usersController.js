const User = require("../models/User")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usersController = {

    createAccount: async (req, res) => {
        const { username, password, email, name, lastname, logInGoogle} = req.body
        let error = false
        const hashedPassword = bcryptjs.hashSync(password.trim(), 10)
        
            const newUser = new User({ 
                name: name.trim().charAt(0).toUpperCase() + name.slice(1), 
                lastname: lastname.trim().charAt(0).toUpperCase() + lastname.slice(1), 
                email: email.trim(), 
                username: username.trim(), 
                password: hashedPassword, 
                logInGoogle})

            try{
                const res = await newUser.save()
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
            jwt.sign({ ...newUser }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, response:{token, name: newUser.name, apellido: newUser.apellido, rol: newUser.rol} })
                }
            })
            }
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
            } else {
                jwt.sign({ ...userExist }, process.env.SECRETORKEY, {}, (error, token) => {
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({success: true, 
                            response:{
                            token,
                            name: userExist.name,
                            lastname: userExist.lastname,
                            rol: userExist.rol
                            }
                        })
                    }
                })
            }

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

    /* modificarUsuario: async (req, res) => {
        const { usuario, name, apellido, urlFoto } = req.body
        
        if (req.files) {
            var archivo = req.files.urlFoto
            // var extension = archivo.name.split('.')[1]
            // var nameArchivo = req.body.usuario + '.' + extension
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

    } */

    getUser: async (req,res) =>{
        
        const user = req.body.user
        const userExist = await User.findOne({user})
        if (userExist){
            res.json({
                success:true
            })
        }else{
            res.json({
                success:false
            })
        }
    },

}


module.exports = usersController