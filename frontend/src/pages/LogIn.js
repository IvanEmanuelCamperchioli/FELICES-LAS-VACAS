import React, { useState }  from 'react'
import {Link} from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import usersActions from '../redux/actions/usersActions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

const LogIn = (props) => {

    const [nuevoUsuario, setNuevoUsuario] = useState({
        usuario: '',
        password: '',
        logInGoogle: false,
    })

    const [errors, setErrors] = useState({
        error:"",
    })

    const readInput = e => {
        setNuevoUsuario({
            ...nuevoUsuario,
            [e.target.name]: e.target.value
        })
    }

    const sendInfo = async e => {
        e.preventDefault()

        if (nuevoUsuario.nombre ==="" || nuevoUsuario.password === "" ){
            setErrors({
                error: "Both fields are required"
            }) 

        }else{
            const userToLogIn = { usuario: nuevoUsuario.usuario, password: nuevoUsuario.password }

            const res = await props.userLogIn(userToLogIn)
            console.log(res)
            if (res.success){

            }
            else{
                setErrors({
                    error: res
                })    
            }
        }
    }

    const responseGoogle = async (response) => {
        console.log(response.profileObj)
        setNuevoUsuario({
            ...nuevoUsuario,
            usuario:response.profileObj.email,
            password:response.profileObj.googleId+response.profileObj.familyName.replace(/ /g, "")+response.profileObj.familyName.trim().charAt(0).toUpperCase() + response.profileObj.familyName.trim().charAt(0).toLowerCase(),
            logInGoogle: true,
        })
        const res = await props.getUser(nuevoUsuario)
        if(res === true){
            const resp =  await props.userLogIn(nuevoUsuario)
            }else{
                Swal.fire({  title: 'You must sign up!',  text: `Please go to create an account, ${response.profileObj.givenName}.`,  icon: 'warning',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
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

                    <h1>Please, choose your account</h1>
                    <span>{errors.error}</span>
                    <label>Usuario</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='usuario' placeholder='Type your username'
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

const mapDispatchToProps = {
    userLogIn: usersActions.userLogIn,
    getUser: usersActions.getUser
}

export default connect(null, mapDispatchToProps)(LogIn)