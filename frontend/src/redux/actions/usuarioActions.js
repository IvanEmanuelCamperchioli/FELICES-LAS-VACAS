import axios from 'axios'

const usuarioActions = {
    createAccount: fd => {
        
        return async (dispatch, getState) => {
            const response = await axios.post('http://127.0.0.1:4000/api/user', fd /*, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }*/)
            
            if (response.data.success !== true) {
                alert('Lo siento no se pudo crear usuario correctamente')
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
                            type: 'SET_USER',
                            payload: {
                                name: response.data.name,
                                urlpic: response.data.urlpic,
                                token: response.data.token,
                                lastName: response.data.lastName,
                                email: response.data.email,
                            }
                        })
                    }, 2000)

                }

            }


        }
    },

    // createAccountGoogle: newUser => {
    //     return async (dispatch, getState) => {
    //         const response = await axios.post('http://127.0.0.1:4000/api/userGoogle', newUser)/* ->PEDIR RUTA AL BACKEND<- */
    //         console.log('hola')
    //         if (response.data.success !== true) {
    //             console.log(response.data.message)
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'Error!',
    //                 text: response.data.message,
    //             })
    //         } else {
    //             dispatch({
    //                 type: 'SET_USER',
    //                 payload: {
    //                     name: response.data.name,
    //                     urlpic: response.data.urlpic,
    //                     token: response.data.token,
    //                     firstTime: response.data.firstTime
    //                 }
    //             })
    //         }
    //     }
    // },

    userLogIn: newUser => {
        return async (dispatch, getState) => {
            const response = await axios.post('http://127.0.0.1:4000/api/login', newUser)
            
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
                            type: 'SET_USER',
                            payload: {
                                name: response.data.name,
                                urlpic: response.data.urlpic,
                                token: response.data.token,
                                username: response.data.username,
                                firstTime: response.data.firstTime,
                                lastName: response.data.lastName,
                                email: response.data.email,
                                
                            }
                        })
                    }, 2000)

                }
            }

        }
    },
}

export default usuarioActions