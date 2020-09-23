import React, { useState } from 'react'
import { connect } from "react-redux"
import usuariosActions from '../redux/actions/usuariosActions'
import GoogleLogin from 'react-google-login'
import Swal from   'sweetalert2'

const Registro = (props) => {

    const validacionMinLength = ['nombre', 'apellido', 'usuario']
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        password: '',
        verificacionPassword: "",
        email: '',
        DNI: '',
        provincia: '',
        logInGoogle: false,    
    })

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        password: '',
        verificacionPassword: "",
        email: '',
        DNI: '',
        provincia: '',
        logInGoogle: false,

    })

    const readInput = e => {  
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    const validPassword = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/)

    const sendInfo = async e => {
        e.preventDefault()
        const errorsCopy = errors
        
        validacionMinLength.map(property => {
            errorsCopy[property] = ((nuevoUsuario[property].length < 2)
            ? `¡El ${property} debe tener al menos 2 caracteres!`
            : ""
        )})
        
        errorsCopy.password = validPassword.test(nuevoUsuario.password)
        ? "" : "La contraseña debe tener al menos 6 caracteres y debe incluir una letra mayúscula, una letra minúscula y un dígito numérico"
        
        errorsCopy.verificacionPassword = (nuevoUsuario.password !== nuevoUsuario.verificacionPassword)
            ? "Las contraseñas no coinciden" : ""

        errorsCopy.email = validEmailRegex.test(nuevoUsuario.email)
            ? "" : "Introduzca un correo electrónico válido"

        setErrors({...errorsCopy})

        if (errors.usuario === "" && errors.verificacionPassword === "" && errors.password === "" && errors.nombre=== "" && errors.apellido=== "" && errors.email=== "") {
            
            const response = await props.crearCuenta(nuevoUsuario)
            console.log(nuevoUsuario)
            if (!response.success) {
                if (response.usuario !== ""){
                    setErrors({
                        ...errors,
                        usuario: response.usuario
                    })
                }
                if (response.email !== ""){
                    setErrors({
                        ...errors,
                        email:response.email
                    })
                }
            }
            
        }
    }
 
    const responseGoogle = async (response) => {
        await setNuevoUsuario({
            ...nuevoUsuario,
            usuario:response.profileObj.email,
            password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
            nombre:response.profileObj.givenName,
            apellido:response.profileObj.familyName.trim(),
            email: response.profileObj.email,
            verificacionPassword:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
            logInGoogle: true,
        })
        const res = await props.crearCuenta(nuevoUsuario)
       
        if (res.success === true){
            
            
        }else{
            if (res.user !== ""){
                Swal.fire({  title: 'Please sign into your account!',  text: `You are already register with this Google account`,  icon: 'warning',  showConfirmButton: false, timer: 3000,allowOutsideClick: false})
            }
            
        }
    }

    return (
        <>
            <div >
                <div style={{
                    backgroundImage:'url(https://cdn.vox-cdn.com/thumbor/huKShwndQtYTHqv9DutaVj_WLcw=/cdn.vox-cdn.com/uploads/chorus_asset/file/4231919/apple-imac-0130.0.0.jpg)',
                    backgroundRepeat:'no-reapeat',
                    backgroundSize:'cover',
                    backgroundPositionY:'90%',
                    padding: '20vh 0vh'
                    }}>

                </div>

                <div style={{ display: 'flex', flexDirection: 'column'}}>

                    <h1 className="text-center responsiveText">Create new account</h1>

                    <label>Nombre</label>
                    <span className='error'>{errors.nombre}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='nombre' placeholder='Escriba su nombre'
                        onChange={readInput} />

                    <label>Apellido</label>
                    <span className='error'>{errors.apellido}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='apellido' placeholder='Escriba su apellido'
                        onChange={readInput} />

                    <label >Usuario</label>
                    <span className='error'>{errors.usuario}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='usuario' placeholder='Elija su usuario (Mínimo 5 caracteres)'
                        onChange={readInput} />

                    <label>Contraseña</label>
                    <span className='error'>{errors.password}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='password' name='password' placeholder='Elija su contraseña (Mínimo 5 caracteres)'
                        onChange={readInput} />

                    <label>Reingrese la contraseña</label>
                    <span className='error'>{errors.verificacionPassword}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='password' name='verificacionPassword' placeholder='Confirme contraseña'
                        onChange={readInput} />

                    <label>Email</label>
                    <span className='error'>{errors.email}</span>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='email' placeholder='Escriba un email correcto'
                        onChange={readInput} />
                    
                    <button onClick={sendInfo}>Enviar</button>
                    
                    <GoogleLogin
                        className="googleBtn"
                        clientId="410495293057-2vf4ipg2vojn0pdvjg2p4pc8269vcbbq.apps.googleusercontent.com"
                        buttonText="Create account with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    crearCuenta: usuariosActions.crearUsuario,
    // createAccountGoogle: usersActions.createAccountGoogle,
}

export default connect(null, mapDispatchToProps)(Registro)