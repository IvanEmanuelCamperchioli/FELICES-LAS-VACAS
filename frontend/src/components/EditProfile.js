import React, { useEffect,useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Header from './Header'


const Profile = (props) => {
    const[load, setLoad]= useState(true)
    const[userData, setUserData]=useState({})
    
    useEffect(()=>{
        const data= async()=>{
        const response = await axios.get(`http://127.0.0.1:4000/api/userInfo/${props?.username}`)
        setUserData(response.data.userInfo)}
        data()
        
    },[props.username])

    const showProfile =()=>{
        return(<>
        <p>Nombre:{userData.name}</p>
        <p>Apellido:{userData.surname}</p>
        <p>City:{!userData.city ? "todavía no cargo nada": userData.city}</p>
        <p>DNI:{!userData.DNI ? "todavía no cargó nada": userData.DNI}</p>
        
        </>)
    }
    
    const inputHandler=(e)=>{
        const value=e.target.value
        const campo= e.target.name
        setUserData({
            ...userData,
			[campo]: value
        })
    }
    const submit = async (e) => {
        e.preventDefault();
        console.log(userData)
    }
    return (
        <div>
            <Header/>
            <div style={{display:"flex", flexDirection:"column"}}>
    <button onClick={()=> setLoad(!load)}>{load? "editar": "cancelar"}</button>
                {load? showProfile(): editProfile(inputHandler,submit)}
           
            </div>
        </div>
    );
};
const editProfile = (inputHandler, submit) =>{
    return(
        <>
        <label>Name</label>
        <input type='text' name='' placeholder='Ingrese su nombre' onChange={inputHandler} />
        <label>Apellido:</label>
        <input type='text' name='' placeholder='Ingrese su apellido' onChange={inputHandler} />
        <label>Provincia:</label>
        <select name="provicia">
            <option value="datosmapear">Value 1</option>
</select>
        <input type='text' name='' placeholder='' onChange={inputHandler} />
        <label>Dirección:</label>
        <input type='text' name='' placeholder='Ingrese su dirección' onChange={inputHandler} />
        <button onClick={submit}>send</button>
        </>
    )
}

/*const data= async(token)=>{
    const response = await axios.post("http://127.0.0.1:4000/api/getUser/",
    {headers: {
        Authorization: `Bearer ${token}`
    }})
}*/
const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token,
        username: state.usersRed.username
    }
}
const mapDispatchToProps = {
    

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)