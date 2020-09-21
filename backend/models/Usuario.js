const mongoose = require("mongoose")


const UsuarioSchema = new mongoose.Schema({
    usuario: String,
    password: String,
    email: String,
    nombre: String,
    apellido: String,
    urlFoto: String,
    idComentario: { type: mongoose.Types.ObjectId, ref: "Comment" }, 
    logInGoogle: Boolean,
    primeraVez: Boolean,
})


const Usuario = mongoose.model("Usuario", UsuarioSchema)

module.exports = Usuario