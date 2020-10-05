import React, { useEffect,useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Header from './Header'


const Profile = (props) => {
    const[load, setLoad]= useState(true)
    const[userData, setUserData]=useState({})
    const[prov, setProv]=useState([])
    useEffect(()=>{
        const data= async()=>{
        const response = await axios.get(`http://127.0.0.1:4000/api/userInfo/${props.username}`)
        setUserData(response.data.userInfo)}
        prov = await axios.get("http://localhost:5000/api/prov")
        data()
    },[props.username])

    

    const showProfile =()=>{
        return(
        <>
       <div>
       <h3>Mi perfil: </h3>
        <p>Nombre: {userData.name}.</p>
        <p>Apellido: {userData.surname}.</p>
        <p>DNI: {!userData.DNI ? " todavía no cargó nada": userData.DNI}.</p>
        <h4>Datos para el envio:</h4>
        <p>Ciudad: {!userData.city ? " todavía no cargo nada": userData.city}.</p>
        <p>Provincia: {!userData.address ? " Actualice los datos" : userData.address}.</p>
        <p>País: Argentina.</p>
       </div>
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
    
    const toEdit= async(userData)=>{
        const response = await axios.put("http://127.0.0.1:4000/api/editUser",userData,{
            headers: {
                Authorization: `Bearer ${props.token}`
          }})
        if(response.success){
            return 
        }
    }
    const submit = async (e) => {
        e.preventDefault();
        await toEdit(userData)
        setLoad(!load)

    }
    return (
        <div>
            <Header/>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
             <div style={{marginLeft:"10%"}}>
             <button style={{marginLeft:"80%", border:"none", textDecoration:"underline", backgroundColor:"white", color:"gray"}} onClick={()=> setLoad(!load)}>{load? "editar": "cancelar"}</button>
                {load? showProfile(): editProfile(inputHandler,submit, userData, prov)}
                </div>
            </div>
        </div>
    );
};
const editProfile = (inputHandler, submit, userData, prov) =>{
    return(
        <>
        <div style={{display:"flex", flexDirection:"column", marginRight:"10%" }}>
        <label>Nombre: </label>
        <input type='text' name='name' value={userData.name ? userData.name : "" }  onChange={inputHandler} />
        <label>Apellido:</label>
        <input type='text' name='surname' value={userData.surname ? userData.surname :"" } onChange={inputHandler} />
        <label>DNI: </label>
        <input type='text' name='DNI' value={userData.DNI ? userData.DNI :"" } onChange={inputHandler} />
        <label>Provincia:</label>
        <select name='provicia'>
            {prov.map(prov=>{
                <option value={prov}>{prov}</option>
            })}
            </select>
        <label>Ciudad:</label>
        <input type='text' name='city' value={userData.city ? userData.city :"" } onChange={inputHandler} />
        <label>Dirección:</label>
        <input type='text' name='address' value={userData.address ? userData.address :"" } onChange={inputHandler} />
        <div style={{margin:"2% 4% 0% 0%", }}><button style={{borderRadius:"25px",backgroundColor:"green", color:"white",padding:"1% 1.4%", border:"none" }} onClick={(submit)}>send</button></div>
        </div>
        </>
    )
}


const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token,
        username: state.usersRed.username
    }
}

export default connect(mapStateToProps, null)(Profile)