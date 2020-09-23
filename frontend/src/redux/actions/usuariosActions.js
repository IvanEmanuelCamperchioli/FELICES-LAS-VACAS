import axios from "axios";
import Swal from "sweetalert2"
const usuariosActions = {

  loguearCuenta: (usuario) => {
    console.log("hola")
    return async (dispatch, getState) => {
      const res = await axios.post(
        "http://127.0.0.1:4000/api/usuario", usuario )
        
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
  
  // crearCuentaConGoogle: (nuevoUsuario) => {
  //   return async (dispatch, getState) => {
  //     const response = await axios.post(
  //       "http://127.0.0.1:4000/api/userGoogle",
  //       nuevoUsuario
  //     );
      
  //     if (response.data.success !== true) {
  //       console.log(response.data.message);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error!",
  //         text: response.data.message,
  //       });
  //     } else {
  //       dispatch({
  //         type: "SET_USER",
  //         payload: {
  //           nombre: response.data.nombre,
  //           urlFoto: response.data.urlFoto,
  //           token: response.data.token,
  //           primeraVez: response.data.primeraVez,
  //         },
  //       });
  //     }
  //   };
  // },

  crearUsuario: (nuevoUsuario) => {
    return async (dispatch, getState) => {
      const res = await axios.post("http://127.0.0.1:4000/api/usuarios", nuevoUsuario);
      const error ={
        email:"",
        usuario:""
      }
      console.log(res)
      if(!res.data.success && res.data.response !== undefined){
        if(res.data.response.errors.email !== undefined){
          error.email = "Ese email ya esta en uso"
        }
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

  forcedLogIn: token => {
    return async (dispatch, getState) => {
        const response = await axios.get('http://127.0.0.1:4000/api/verificadorToken', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: "SET_USER",
            payload: {
                nombre: response.data.nombre,
                apellido: response.data.apellido,
                token: token,
                email: response.data.email,
            }
        })

    }
  },getUser: user =>{
    return async (dispatch, getState) =>{
        
        const res = await axios.post("http://127.0.0.1:4000/api/getUser", user)
        
        dispatch({
            type: "GET_USER_EXISTS"
        })
        return res.data.success
    }
},
};

export default usuariosActions;
