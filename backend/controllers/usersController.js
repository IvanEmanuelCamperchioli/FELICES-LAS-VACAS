const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usersController = {
    //Controlador para crear una cuenta
    createAccount: async (req, res) => {
        //Obtengo los datos del usuario
        const { username, password, mail, name, surname, logInGoogle} = req.body
        let error = false
            //Hasheo la contraseña
            const passwordHash = bcryptjs.hashSync(password.trim(), 10)
            //Creo el nuevo usuario
            const newUser = new User({ 
                name: name.trim().charAt(0).toUpperCase() + name.slice(1), 
                surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1), 
                mail: mail.trim(), 
                username: username.trim(), 
                password: passwordHash, 
                logInGoogle})

            try{
                //Lo guardo en la BD
                const res = await newUser.save()
                
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
                //Genero el token 
            jwt.sign({ ...newUser }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ 
                        success: true, 
                        response:{
                            token, 
                            name: newUser.name,
                            username: newUser.username, 
                            role: newUser.role
                        } 
                    })
                }
            })
            }
        }
        
    },

    //Controlador para loguear a un usuario
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
            } 
            else {
                jwt.sign({ ...userExist }, process.env.SECRETORKEY, {}, (error, token) => {
                    
                    if (error) {
                        res.json({ success: false, error: "Ha ocurrido un error" })
                    } else {
                        res.json({success: true, 
                            response:{
                            token,
                            name: userExist.name,
                            username: userExist.username,
                            role: userExist.role
                            }
                        })
                    }
                })
            }

        }
    },
    //Controlador para verificar el token del usuario y perdurar su sesion 
    tokenVerificator: (req, res) => {
        
        const name = req.user.name
        const username = req.user.username
        const token = req.user.token
        const role = req.user.role
        
        res.json({
            success: true, 
            response: {name, username, token, role}
        })
    
    },
    //Controlador para obtener si el usuario ya fue creado con su cuenta de google
    getUsersExist: async (req,res) =>{
        
        const username = req.body.username
        const userExist = await User.findOne({username})
        if (userExist){
            res.json({
                success:true,
                response: userExist
            })
        }else{
            res.json({
                success:false
            })
        }
    },
    //Controlador para obtener la dirección del usuario
    getUserAddress: async (req,res) =>{
        
        const idUser = req.user._id
        
        const userExist = await User.findOne({_id:idUser})
        if (userExist) {
            res.json({
                success:true,
                response: userExist
            })
        }else{
            res.json({
                success:false
            })
        }
    },
    //Controlador para actualizar la direccion del usuario
    updateAddress: async (req, res) =>{
        const idUser = req.user._id
       console.log(req.user)
        const {address, city, province} = req.body
        const error = false 
        const userExist = await User.findOne({_id:idUser})
        console.log(userExist)
        if (userExist){
            var userUpdate = await User.updateOne({_id:idUser}, {address, city, province})
          
        } else {
            error = true
        }
        res.json({
            success: error ? false : true,
            response: error ? "User not updated" : "User updated"
        })

    },
    //Controlador para obtener los datos del usuario
    getUserInformation: async (req, res) => {
     
        const user = await User.findOne({...req.params})
        const {name, surname, province, city, address, DNI, username,} = user
        res.json({
            success: user ? true : false,
            userInfo:{
                name, surname, province, city, address, DNI, username
            }
        })
    },
    //Controlador para modificar el usuario
    editUser: async(req, res)=>{
      
        const user = await User.findOneAndUpdate({username: req.body.username},{$set:{...req.body}}, {new: true})
        .then(user=>{
          
            res.json({success:true, user: user})})
        .catch(err=>{
           
            res.json({success:false}, err)})
    }
}


module.exports = usersController