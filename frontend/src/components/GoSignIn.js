import React from 'react'
import {NavLink} from 'react-router-dom'


export default function GoSignIn() {
return (
    <>
    <div>
        <h3>Para continuar con su compra inicie sesión o creése una cuenta</h3>
        <NavLink to="/sign-in">Iniciar sesion</NavLink>
        <NavLink to="/sign-in" >Crear cuenta</NavLink>
    </div>
    </>
)
}