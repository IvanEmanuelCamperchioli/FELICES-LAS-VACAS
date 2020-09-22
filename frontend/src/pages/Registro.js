import React, { useState } from 'react'
import { connect } from "react-redux"
import usuariosActions from '../redux/actions/usuariosActions'

const Registro = (props) => {
    
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        apellido: '',
        usuario: '',
        password: '',
        validacionPassword: "",
        email: '',
        DNI: '',
        provincia: '',
        logInGoogle: false,

    })

    const readInput = e => {
        const value = e.target.value
        //const value = e.target.name === "urlpic" ? e.target.files[0] : e.target.value
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.nombre]: value
        })
    }

    const sendInfo = async e => {
        e.preventDefault()
        if (nuevoUsuario.usuario === '' || nuevoUsuario.password === '' || nuevoUsuario.nombre === '' || nuevoUsuario.apellido === '' || nuevoUsuario.email === '') {
            alert('Por favor, verifique que todos los campos estén llenos.')
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error!',
            //     text: 'All camps are required, please take a look again',
            // })
        } else {

            // const fd = new FormData()
            // fd.append("name", newUser.name)
            // fd.append("lastname", newUser.lastname)
            // fd.append("username", newUser.username)
            // fd.append("password", newUser.password)
            // fd.append("email", newUser.email)
            // fd.append("urlpic", newUser.urlpic)
            // fd.append("logWithGoogle", newUser.logWithGoogle)
            // fd.append("firstTime", newUser.firstTime)
            // fd.append("favConsole", newUser.favConsole)

            await props.crearCuenta(nuevoUsuario)
        }
    }
 
     const responseGoogle = (response) => {
        setNuevoUsuario({
            ...nuevoUsuario,
            usuario:response.profileObj.email,
            password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
            nombre:response.profileObj.givenName,
            apellido:response.profileObj.familyName.trim(),
            email: response.profileObj.email,
            validacionPassword:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
        })
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