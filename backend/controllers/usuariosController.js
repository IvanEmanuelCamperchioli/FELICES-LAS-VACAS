const Usuario = require("../models/Usuario")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usuariosController = {

    logUsuario: async (req, res) => {
        var {user, password } = req.body
        
        const usuarioExiste = await User.findOne({user})

        if (!usuarioExiste){

            res.json({success: false, response: "Nombre y/o contraseña incorrecta"})

        }else{

            const passwordMatches = bcryptjs.compareSync(password, usuarioExiste.password)

            if (!passwordMatches){

                res.json({success: false, response: "Nombre y/o contraseña incorrecta"})

            }else{
                jwt.sign({...userExist}, process.env.SECRETORKEY, {}, (error, token)=>{

                    if(error){
                        res.json({success:false, response: "Algo salió mal"})
                    }else{
                        res.json({success: true, response:{
                            token,
                            nombre: usuarioExiste.nombre,
                            foto: usuarioExiste.foto
                            }
                        })
                    }
                    
                })
            } 
        }
    },
    getUsuarioExist: async (req,res) =>{
        
        const user = req.body.user
        const usuarioExiste = await User.findOne({user})
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
    

}


module.exports = usuariosController