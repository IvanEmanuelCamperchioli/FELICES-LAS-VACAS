const User = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")



const usersController = {

    createAccount: async (req, res) => {
        const { user, password, mail, name, surname, logInGoogle} = req.body
        let error = false
        const passwordHash = bcryptjs.hashSync(password.trim(), 10)
        
            const newUser = new User({ 
                name: name.trim().charAt(0).toUpperCase() + name.slice(1), 
                surname: surname.trim().charAt(0).toUpperCase() + surname.slice(1), 
                mail: mail.trim(), 
                user: user.trim(), 
                password: passwordHash, 
                logInGoogle})

            try{
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
            jwt.sign({ ...newUser }, process.env.SECRETORKEY, {}, (error, token) => {
                if (error) {
                    res.json({ success: false, error })
                } else {
                    res.json({ success: true, response:{token, name: newUser.name, surname: newUser.surname, role: newUser.role} })
                }
            })
            }
        }
        
    },


    userLogin: async (req, res) => {
        const { user, password } = req.body
        console.log(req.body)
        const userExist = await User.findOne({ user })

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
                            surname: userExist.surname,
                            role: userExist.role
                            }
                        })
                    }
                })
            }

        }
    },


    tokenVerificator: (req, res) => {
        
        const name = req.user.name
        const surname = req.user.surname
        const role = req.user.role
        res.json({
            success: true, 
            response: {name, surname, role}
        })
    
    },
    
    getUsersExist: async (req,res) =>{
        
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
    }

}


module.exports = usersController