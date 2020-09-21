const Joi = require("@hapi/joi")


const validador = {
    validarDatos: (req, res, next) => {
        const schema = Joi.object({
            nombre: Joi.string().min(4).required().trim().error(() => { return res.json ({ message: 'Lo siento, el nombre debe contener más de 3 caracteres', });}),
            apellido: Joi.string().min(4).required().trim().error(() => { return res.json ({ message: 'Lo siento, el apellido debe contener más de 3 caracteres.', });}),
            usuario: Joi.string().min(4).trim().required().error(() => { return res.json ({ message: 'Lo siento, el usuario debe contener más de 3 caracteres.', });}),
            password: Joi.string().min(6).trim().required().error(() => { return res.json ({ message: 'La clave debe contener más de 5 caracteres.', });}),
            email: Joi.string().email().required().trim().error(() => { return res.json ({ message: 'El email debe contener "@" y ".com, .net ..."', });}),
            urlFoto: Joi.string().error(() => { return res.json ({ message: 'Por favor, ingresa una imagen de perfil', });}),
            logInGoogle: Joi.boolean(),
            primeraVez: Joi.boolean(),
        })

        const validacion = schema.validate(req.body, { abortEarly: false })
        if (validacion.error !== undefined) {
            return res.json({
                success: false,
                error: ('Error'),
                message: validacion.error
            })
        }
        
        next()

    }
}


module.exports = validador