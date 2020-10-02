import React, { useEffect,useState } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import Header from './Header'


const Profile = () => {
    const[load, setLoad]= useState(false)
    const[userData, setUserData]=useState({})
    useEffect(()=>{
        data()
        
    },[])
    const data= async(token)=>{
        const response = await axios.get("http://127.0.0.1:4000/api/getUser/",
        {headers: {
            Authorization: `Bearer ${token}`
        }})
        console.log(response)
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
        setLoad({status: true})
    }
    return (
        <div>
            <Header/>
            <div style={{display:"flex", flexDirection:"column"}}>
                {editProfile(inputHandler)}
           
            </div>
        </div>
    );
};
const editProfile = (inputHandler) =>{
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
        </>
    )
}
const ShowProfile =()=>{
    return(
    <>
    <h5>{}</h5>
    <h5></h5>
    <h5></h5>
    </>)
}
const mapStateToProps = (state) =>{
    return{
        token: state.usersRed.token
    }
}
const mapDispatchToProps = {
    

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)