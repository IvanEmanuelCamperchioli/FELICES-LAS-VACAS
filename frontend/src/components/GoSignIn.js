import React from 'react'
import {NavLink} from 'react-router-dom'


export default function GoSignIn() {
return (
    <>
    <div style={{display:"flex", flexDirection:"column", justifyContent:"space-around", alignContent:"center", alignItems:"center"}}>
        <h3>Para continuar con su compra inicie sesión o creése una cuenta</h3>
        <NavLink to="/sign-in" style={{border:"solid 2px black", padding:"1%", alignContent:"center", textAlign:"center"}}>Iniciar sesion</NavLink>
        <NavLink to="/sign-in"  style={{border:"solid 2px black", padding:"1%", alignContent:"center", textAlign:"center"}}>Crear cuenta</NavLink>
    </div>
    </>
)
}