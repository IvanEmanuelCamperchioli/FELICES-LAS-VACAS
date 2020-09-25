import axios from "axios";
import Swal from "sweetalert2"
const usersActions = {

  logUser: (user) => {
    return async (dispatch, getState) => {
      const res = await axios.post(
        "http://127.0.0.1:4000/api/user", user )
        console.log(res)
      if (res.data.success !== true) {
        return res.data.message
      } else {
        await Swal.fire({  title: 'Bienvenido!',  text: `Que bueno tenerte aqui nuevamente, ${res.data.response.name}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
            dispatch({
                type: "SET_USER",
                payload:res.data.response
            })
            return {
              success: true,
              name: res.data.response.name
          }
      }
    };
  },
  
  createUser: (newUser) => {
    console.log(newUser)
    return async (dispatch, getState) => {
      const res = await axios.post("http://127.0.0.1:4000/api/users", newUser)
      const error ={
        mail:"",
        username:""
      }
      console.log(res)
      if(!res.data.success && res.data.response !== undefined){
        if(res.data.response.errors.mail !== undefined){
          error.mail = "Ese email ya esta en uso"
        }
        if(res.data.response.errors.username !== undefined){
          error.username = "Ese nombre de usuario ya esta en uso"
        }
        return error
        
      }else{
        
        await Swal.fire({  title: 'Welcome!',  text: `It´s nice to have you here, ${res.data.response.name}.`,  icon: 'success',  showConfirmButton: false, timer: 2000,allowOutsideClick: false})
        dispatch({
          type: "SET_USER",
          payload: {  
            username: res.data.response.username,
            token: res.data.response.token,
            role: res.data.response.role
          },
        });
        return {
            success: true,
            username: res.data.response.name
        }
      }

    };
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
                username: response.data.username,
                token: token,
                mail: response.data.mail,
                role: response.data.role,
            }
        })
        return response.data.username
    }
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
  }
};

export default usersActions;
