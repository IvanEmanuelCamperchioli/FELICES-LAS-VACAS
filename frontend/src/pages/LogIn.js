import React, { useState }  from 'react'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'

const LogIn = (props) => {

    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: '',
        password: '',
        logInGoogle: false,
    })

    const [errors, setErrors] = useState({
        usuario: '',
        password: '',
        logInGoogle: false,
    })

    const readInput = e => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    const sendInfo = e => {
        e.preventDefault()

        const errorsCopy = errors
        
        errorsCopy.usuario = (nuevoUsuario.usuario.length < 2)
            ? "¡La contraseño o el usuario son incorrectos!" : ""

        errorsCopy.password = (nuevoUsuario.password.length < 2)
            ? "¡La contraseño o el usuario son incorrectos!" : ""

        setErrors({...errorsCopy})

        if (errors.usuario === "" && errors.password === ""){
            const userToLogIn = { username: nuevoUsuario.nombre, password: nuevoUsuario.password }

            props.userLogIn(userToLogIn)
        }
    }

    const responseGoogle = (response) => {
        setNuevoUsuario({
            ...nuevoUsuario,
            usuario:response.profileObj.email,
            password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
            logInGoogle: true,
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

                    <h1>Please, choose your account</h1>

                    <label>Usuario</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='username' placeholder='Type your username'
                        onChange={readInput} />

                    <label>Password</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='password' name='password' placeholder='Type your password'
                        onChange={readInput} />

                    <span className='error'>{errors.password}</span>

                    <button onClick={sendInfo}>Enviar</button>
                    
                    <p>No tienes cuenta? Presiona<Link to='/registro'>Aqui!</Link></p>
                    
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
    );
};

export default LogIn