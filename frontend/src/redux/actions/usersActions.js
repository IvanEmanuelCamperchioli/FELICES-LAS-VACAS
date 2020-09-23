import axios from "axios";
const usersActions = {

  createAccount: (newUser) => {
    return async (dispatch, getState) => {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/usuario", newUser )
        console.log(response)
      if (response.data.success !== true) {
        alert("Lo siento no se pudo crear usuario correctamente")
      } else {
        if (response.data.token) {
            dispatch({
              type: "SET_USER",
              payload: {
                name: response.payload.name,
                lastname: response.payload.lastname,
                token: response.payload.token,
              },
            });
        }
      }
    };
  },


  userLogIn: newUser => {
    return async (dispatch, getState) => {
        const response = await axios.post('http://127.0.0.1:4000/api/login', newUser)
        if (!response.data.success) {
            Swal.fire({
                title: 'Im sorry :(',
                imageUrl: `${SadSquare}`,
                imageWidth: 180,
                imageHeight: 180,
                imageAlt: 'Sad square :(',
                text: response.data.message,
            })
        } else {
            if (response.data.token) {
                Swal.fire({
                    title: 'Welcome!',
                    imageUrl: `${HappySquare}`,
                    imageWidth: 180,
                    imageHeight: 180,
                    imageAlt: 'Custom image',
                    animation: false,
                    text: 'I miss you a lot!',
                    timer: 2000,
                    showConfirmButton: false
                })
                setTimeout(() => {
                    dispatch({
                        type: 'SET_USER',
                        payload: {
                            name: response.data.name,
                            lastname: response.data.lastname,
                            token: response.data.token,
                        }
                    })
                }, 2000)
            }
        }
    }
  },

  userLogOut: () => {
    return (dispatch, getState) => {
        dispatch({
            type: "LOGOUT_USER"
        })
    }
  },

  forceLogIn: token => {
    return async (dispatch, getState) => {
        const response = await axios.get('http://127.0.0.1:4000/api/verificadorToken', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        dispatch({
            type: "SET_USER",
            payload: {
                name: response.data.name,
                lastname: response.data.lastname,
                token: tokenLS,
                email: response.data.email,
            }
        })

    }
  },
};

export default usersActions;
