import React, { useState }  from 'react'
import {Link} from 'react-router-dom'

const LogIn = (props) => {

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    })


    const readInput = e => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        })
    }

    const sendInfo = e => {
        e.preventDefault()

        if (newUser.username === '' || newUser.password === '') {
            alert('eror: un dato requerido vacío')
            
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Error!',
            //     text: 'All camps are required, please take a look again',
            // })
        }
        else {
            const userToLogIn = { username: newUser.username, password: newUser.password }

            props.userLogIn(userToLogIn)
        }
    }

    // const responseGoogle = (response) => {
    //     props.userLogIn({
    //         username: response.profileObj.email,
    //         password: response.profileObj.googleId,
    //         logInMethod: 'google'
    //     })
    // }

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
                    <label>Username</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='text' name='username' placeholder='Type your username'
                        onChange={readInput} />
                    <label>Password</label>
                    <input style={{
                        borderRadius: '3vw'
                    }} type='password' name='password' placeholder='Type your password'
                        onChange={readInput} />
                    {/* <GoogleLogin
                        clientId="575358746516-8ot9u4rh9irr4uf17ogf1bcqjt2aqneu.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /> */}
                    <p>No tienes cuenta? Presiona<Link to='/registro'>Aqui!</Link></p>

                </div>
            </div>
        </>
    );
};

export default LogIn