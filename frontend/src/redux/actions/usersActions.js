import axios from "axios";
import Swal from 'sweetalert2'




const usersActions = {

  createAccount: (newUser) => {
    return async (dispatch, getState) => {
      const res = await axios.post("http://127.0.0.1:4000/api/usuarios", newUser);
      const error ={
        email:"",
        usuario:""
      }
      if(!res.data.success && res.data.response !== undefined){
        /* if(res.data.response.errors.email !== undefined){
          error.email = "Ese email ya esta en uso"
        } */
        if(res.data.response.errors.usuario !== undefined){
          error.usuario = "Ese nombre de usuario ya esta en uso"
        }
        return error
        
      }else{
        
        await Swal.fire({  title: 'Welcome!',  text: `It´s nice to have you here, ${res.data.response.nombre}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
        dispatch({
          type: "SET_USER",
          payload: {  
            nombre: res.data.response.nombre,
            token: res.data.response.token,
            apellido: res.data.response.apellido,
            rol: res.data.response.rol
          },
        });
        return {
            success: true,
            user: res.data.response.name
        }
      }

    };
  },

  userLogIn: (user) => {
    console.log("hola")
    return async (dispatch, getState) => {
      const res = await axios.post(
        "http://127.0.0.1:4000/api/usuario", user )
        
      if (res.data.success !== true) {
        return res.data.message
      } else {
        await Swal.fire({  title: 'Bienvenido!',  text: `Que bueno tenerte aqui nuevamente, ${res.data.response.nombre}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
            dispatch({
                type: "SET_USER",
                payload:res.data.response
            })
            return {
              success: true,
              nombre: res.data.response.nombre
          }
      }
    };
  },

  getUser: user =>{
    return async (dispatch, getState) =>{
        const res = await axios.post("http://127.0.0.1:4000/api/getUser", user)
        dispatch({
            type: "GET_USER_EXISTS"
        })
        return res.data.success
    }
},

  userLogOut: () => {
    return (dispatch, getState) => {
        dispatch({
            type: "LOGOUT_USER"
        })
    }
  },

  forcedLogIn: token => {
    return async (dispatch, getState) => {
        const response = await axios.get('http://127.0.0.1:4000/api/tokenVerificator', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: "SET_USER",
            payload: {
                name: response.data.name,
                lastname: response.data.lastname,
                token: token,
                email: response.data.email,
            }
        })

    }
  },
};

export default usersActions;
