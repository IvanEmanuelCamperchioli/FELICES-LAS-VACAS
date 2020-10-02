import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import usersActions from '../redux/actions/usersActions'
import {connect} from 'react-redux'


const GoUpAddress = (props) => {

const [newData, setNewData] = useState({
    city:"",
    province:"",
    address:""
})

const [error, setError] = useState("")

const getForm = e =>{
    e.preventDefault()
    const property = e.target.name
    const value = e.target.value
    setNewData({
        ...newData,
        [property]: value
    })
    console.log(newData)
}


const submit =  async e => {

    e.preventDefault()
    if (newData.city ==="" || newData.city ==="" || newData.city ==="" ){
        setError("Todos los campos son requeridos")
    }else{
        setError("")
        const response =  await props.sendAddress(props.token, newData)
        console.log(response)
        setNewData({
            ...newData,
            city:"",
            province:"",
            address:""
        })
    }
}

return (
    <>
    <div>
        <h3>Para continuar actualice su direccion</h3>
        <div>
            <h3>Por favor ingrese sus datos</h3>
            <span className = {error === "" ? "" : "logError"}>{error}</span>
                    
                    <input 
                    className="input" 
                    name="address" 
                    type="text" 
                    placeholder="Ingresa tu dirección de envio" 
                    onChange={getForm}>
                    </input>
                    
                    <input 
                    className="input" 
                    type="text" 
                    name="city" 
                    placeholder="Ingresá tu ciudad" 
                    onChange={getForm}>
                    </input>

                    <input 
                    className="input" 
                    type="text" 
                    name="province" 
                    placeholder="Ingresá tu provincia" 
                    onChange={getForm}>
                    </input>

                    <button onClick={submit}>Enviar datos</button>
        </div>
    </div>
    </>
)
}

const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token
    }
}

const mapDispatchToProps ={
    sendAddress: usersActions.sendAddress
}
export default connect (mapStateToProps, mapDispatchToProps)(GoUpAddress)