const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, 
        validate:{
            validator: async user => await User.find({user}).countDocuments()===0,
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
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    DNI: {type: Number, default: null},
    provincia: {type: String, default: null},
    direccion: {type: String, default: null},
    rol: {type: String, default: "comprador"},
    loginGoogle: {type: Boolean, default: false}
    
})


const User = mongoose.model("User", UserSchema)

module.exports = User