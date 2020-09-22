const mongoose = require("mongoose")


const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    email: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: String,
    DNI: {type: Number, default: null},
    provincia: {type: String, default: null},
    rol: {type: String, default: "comprador"}
    
})


const Usuario = mongoose.model("Usuario", UsuarioSchema)

module.exports = Usuario