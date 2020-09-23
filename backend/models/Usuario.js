const mongoose = require("mongoose")


const UsuarioSchema = new mongoose.Schema({
    usuario: {type:String, required:true, 
        validate:{
            validator: async usuario => await Usuario.find({usuario}).countDocuments()===0,
            message: () => "El nombre de usuario ya ha sido utilizado"
        }
    },
    password: {type: String, required: true},
    email:{type:String, required: true,
        validate:{
            validator: async email => await Usuario.find({email}).countDocuments()===0,
            message: () => "That email is already used"
        }
    },
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    DNI: {type: Number, default: null},
    provincia: {type: String, default: null},
    direccion: {type: String, default: null},
    rol: {type: String, default: "comprador"},
    loginGoogle: {type: Boolean, default: false}
    
})


const Usuario = mongoose.model("Usuario", UsuarioSchema)

module.exports = Usuario