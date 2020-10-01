import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';

const EditProfile = () => {
    const[load, setLoad]= useState(false)
    const[userData, setUserData]=useState({})
    useEffect(()=>{},[])
    const inputHandler=(e)=>{
        const value=e.target.value
        const campo= e.target.name
        setUserData({
            ...username,
			[campo]: value
        })
    }
    const submit = async (e) => {
        e.preventDefault();
        setLoad({status: true})
    }

    return (
        <div>
            <div>
            <label>Name</label>
             <input type='text' name='' placeholder='Ingrese su nombre' onChange={inputHandler} />
             <label>Apellido:</label>
             <input type='text' name='' placeholder='Ingrese su apellido' onChange={inputHandler} />
             <label>Provincia:</label>
             <input type='text' name='' placeholder='' onChange={inputHandler} />
             <label>Dirección:</label>
             <input type='text' name='' placeholder='Ingrese su dirección' onChange={inputHandler} />
            
            </div>
        </div>
    );
};
const mapDispatchToProps = {

}

export default connect(null, mapDispatchToProps)(EditProfile)