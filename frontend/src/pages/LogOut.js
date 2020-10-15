import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import usersActions from '../redux/actions/usersActions'


//Componente para cerrar la sesion del usuario

const LogOut =  (props) =>{
   
    useEffect(()=> {
        
        props.unlogUser()
        
        props.history.push('/')
    }, [])
    return(
        null
    )
}

const mapDispatchToProps={
    unlogUser : usersActions.unlogUser
}

export default connect(null, mapDispatchToProps)(LogOut)