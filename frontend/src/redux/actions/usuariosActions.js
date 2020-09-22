import axios from "axios";
const usuariosActions = {
  crearCuenta: (fd) => {
    return async (dispatch, getState) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/user",
        fd /*, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }*/
      )

      if (response.data.success !== true) {
        alert("Lo siento no se pudo crear usuario correctamente")
        // Swal.fire({
        //     title: 'Im sorry :(',
        //     imageUrl: `${SadSquare}`,
        //     imageWidth: 180,
        //     imageHeight: 180,
        //     imageAlt: 'Sad square :(',
        //     text: response.data.message,
        // })
      } else {
        if (response.data.token) {
          // Swal.fire({
          //     title: 'Welcome!',
          //     imageUrl: `${HappySquare}`,
          //     imageWidth: 180,
          //     imageHeight: 180,
          //     imageAlt: 'Happy square :D',
          //     animation: false,
          //     text: 'I am very happy to meet you!',
          //     timer: 2000,
          //     showConfirmButton: false
          // })
          setTimeout(() => {
            dispatch({
              type: "SET_USER",
              payload: {
                usuario: response.payload.usuario,
                urlFoto: response.payload.urlFoto,
                nombre: response.payload.nombre,
                apellido: response.payload.apellido,
                token: response.payload.token,
              },
            });
          }, 2000);
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
        "http://127.0.0.1:4000/api/login",
        nuevoUsuario
      );

      if (!response.data.success) {
        // Swal.fire({
        //     title: 'Im sorry :(',
        //     imageUrl: `${SadSquare}`,
        //     imageWidth: 180,
        //     imageHeight: 180,
        //     imageAlt: 'Sad square :(',
        //     text: response.data.message,
        // })
      } else {
        if (response.data.token) {
          // Swal.fire({
          //     title: 'Welcome!',
          //     imageUrl: `${HappySquare}`,
          //     imageWidth: 180,
          //     imageHeight: 180,
          //     imageAlt: 'Custom image',
          //     animation: false,
          //     text: 'I miss you a lot!',
          //     timer: 2000,
          //     showConfirmButton: false
          // })
          setTimeout(() => {
            dispatch({
              type: "SET_USER",
              payload: {
                nombre: response.data.nombre,
                urlFoto: response.data.urlFoto,
                token: response.data.token,
                usuario: response.data.usuario,
                primeraVez: response.data.primeraVez,
                apellido: response.data.apellido,
                email: response.data.email,
              },
            });
          }, 2000);
        }
      }
    };
  },
};

export default usuariosActions;
