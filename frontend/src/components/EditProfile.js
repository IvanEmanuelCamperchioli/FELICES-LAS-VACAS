import React, { useEffect,useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Header from './Header'


const Profile = (props) => {
    const[load, setLoad]= useState(true)
    const[userData, setUserData]=useState({})
    const[provinces, setProvinces]=useState([])

    useEffect(()=>{
       data()
    },[props.username])

    const data = async () => {
        const response = await axios.get(`http://127.0.0.1:4000/api/userInfo/${props.username}`)
        setUserData(response.data.userInfo)
        const provinceData = await axios.get("https://countriesfeliceslasvacasapi.herokuapp.com/api/prov")
        setProvinces(provinceData.data)
    }

    const showProfile =()=>{
        console.log(userData)
        return(
        <>
            <div>
            <h3 style={{color:"green"}}>Mi perfil: </h3>
                <div style={{marginLeft:"5%"}}>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Nombre:</h6> {userData.name}.</p>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Apellido: </h6> {userData.surname}.</p>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>DNI:</h6> {!userData.DNI ? "Actualice los datos": userData.DNI}.</p>
                </div>
            <h4 style={{color:"green"}}>Datos para el envio:</h4>
                <div style={{marginLeft:"5%"}}>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>País: </h6> Argentina.</p>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Provincia: </h6> {!userData.province ? "Actualice los datos" : userData.province}.</p>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Ciudad: </h6> {!userData.city ? "Actualice los datos": userData.city}.</p>
                <p><h6 style={{fontWeight:"bolder", display:"inline-block"}}>Dirección: </h6> {!userData.address ? "Actualice los datos": userData.address}.</p>
                </div>
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
        console.log(userData);
        await toEdit(userData)
        setLoad(!load)
    }
    return (
        <div>
            <Header/>
            <div className="jpgfood"></div>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
             <div style={{marginLeft:"15%"}}>
             <button style={{marginLeft:"80%", border:"none", textDecoration:"underline", backgroundColor:"white", color:"gray"}} onClick={()=> setLoad(!load)}>{load? "editar": "cancelar"}</button>
                {load? showProfile(): editProfile(inputHandler,submit, userData, provinces)}
                </div>
            </div>
        </div>
    );
};
const editProfile = (inputHandler, submit, userData, provinces) =>{
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
        <select name='province' onChange={inputHandler}>
            {provinces.map((province, index)=>
                <option key={index} value={province} >{province}</option>
            )}
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