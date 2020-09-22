import React, { useState } from 'react'
import { connect } from "react-redux"
import usuariosActions from '../redux/actions/usuariosActions'

const Registro = (props) => {
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        password: '',
        passwordValidation: "",
        email: '',        
    })

    const [errors, setErrors] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        password: '',
        passwordValidation: "",
        email: '',
    })

    const readInput = e => {
        const value = e.target.value
        
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.nombre]: value
        })
    }
    const validEmailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    const validPassword = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}/)

    const sendInfo = async e => {
        e.preventDefault()

        const errorsCopy = errors

        errorsCopy.usuario = (nuevoUsuario.usuario.length < 2)
            ? "¡El usuario debe tener al menos 2 caracteres!" : ""

        errorsCopy.password = (nuevoUsuario.password.length < 2)
            ? "¡El password debe tener al menos 2 caracteres!" : ""

        errorsCopy.apellido = (nuevoUsuario.property.length < 2)
            ? "¡El apellido debe tener al menos 2 caracteres!" : ""

        errorsCopy.passwordValidation = (nuevoUsuario.password !== nuevoUsuario.password)
            ? "Las contraseñas no concuerdan" : ""

        errorsCopy.password = validPassword.test(nuevoUsuario.password)
            ? "" : "La contraseña debe tener al menos 6 caracteres y debe incluir una letra mayúscula, una letra minúscula y un dígito numérico"

        errorsCopy.email = validEmailRegex.test(nuevoUsuario.email)
            ? "" : "Introduzca un correo electrónico válido"

        setErrors(errorsCopy)
        console.log(errors)

        if (errors.usuario === "" && errors.passwordValidation === "" && errors.password === "" && errors.nombre=== "" && errors.apellido=== "" && errors.email=== "") {
            const response = await props.crearCuenta(nuevoUsuario)
            
            if (!response.success) {
                if (response.usuario !== ""){
                    setErrors({
                        ..,errors,
                        user: response.usuario
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
                    <label>Name</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='name' placeholder='Type your name'
                        onChange={readInput} />
                    <label>Lastname</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='lastname' placeholder='Type your lastname'
                        onChange={readInput} />
                    <label >Username</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='username' placeholder='Choose your username (Min 5 characters)'
                        onChange={readInput} />
                    <label>Password</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='password' name='password' placeholder='Choose your password (Min 5 characters)'
                        onChange={readInput} />
                    <label>Email</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='email' placeholder='Type an email correct'
                        onChange={readInput} />
                    {/* <label htmlFor="urlpic">Select your profile pic</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='file' name='urlpic' id="urlpic"
                        onChange={readInput} /> */}
                    <button onClick={sendInfo}>Enviar</button>

                </div>
            </div>
        </>
    )
}

const mapDispatchToProps = {
    crearCuenta: usuariosActions.crearCuenta,
    // createAccountGoogle: usersActions.createAccountGoogle,
}

export default connect(null, mapDispatchToProps)(Registro)