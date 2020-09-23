import axios from "axios";
import Swal from "sweetalert2"
const usuariosActions = {

  crearCuenta: (nuevoUsuario) => {
    return async (dispatch, getState) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/usuario", nuevoUsuario )
        console.log(response)
      if (response.data.success !== true) {
        alert("Lo siento no se pudo crear usuario correctamente")
      } else {
        if (response.data.token) {
            dispatch({
              type: "SET_USER",
              payload: {
                nombre: response.payload.nombre,
                apellido: response.payload.apellido,
                token: response.payload.token,
              },
            });
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

  loguearUsuario: (nuevoUsuario) => {
    return async (dispatch, getState) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/login", nuevoUsuario);
      if (!response.data.success) {
      } else {
        if (response.data.token) {
          setTimeout(() => {
            dispatch({
              type: "SET_USER",
              payload: {
                nombre: response.data.nombre,
                token: response.data.token,
                apellido: response.data.apellido,
              },
            });
          }, 2000);
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
                token: tokenLS,
                email: response.data.email,
            }
        })

    }
  },
};

export default usuariosActions;
