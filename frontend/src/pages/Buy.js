import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import GoSignIn from '../components/GoSignIn'
import FinishShopping from '../components/FinishShopping'
import usersActions from '../redux/actions/usersActions'

//Pagina para confirmar una compra y ver el resumen de la misma

const Buy = (props) => {

    const [flag, setFlag] = useState('noLog')

    useEffect(() => {
        //Cuando el componente se monta, veo si el usurio, esta logueado o no
        //Y si tiene unan direccion asociada a su usuario
        data()
    }, [])


    useEffect(()=>{
        setFlag("ok")
    },[props.token])

    
    const data = async() => {
        if(props.token === "" ){
            setFlag('noLog')
        }else{
        var userLogued = await props.getUser(props.token)
        setFlag(userLogued.address === null ? "noAddress" : "ok")
        }
    }

    return (
        <>
            {flag !== "noAddress" && <Header/>}
            {flag === "noLog" 
                ? <GoSignIn/>
                
                : <FinishShopping history={props.history} />
            }
            <Footer />
        </>
    )
}


const mapDispatchToProps = {
    getUser: usersActions.getUserAddress
}

const mapStateToProps = (state) => {
  
    return {
      token: state.usersRed.token
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Buy)