import React from 'react'
import {NavLink} from 'react-router-dom'


export default function FinishShopping() {
return (
    <>
    <div>
        <h3>Para continuar ingrese su tarjeta</h3>
        <NavLink to="/sign-in">Iniciar sesion</NavLink>
        <NavLink to="/sign-in" >Crear cuenta</NavLink>
    </div>
    </>
)
}