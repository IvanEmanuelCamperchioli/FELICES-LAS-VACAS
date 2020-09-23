const initialState = {
<<<<<<< HEAD
    token:"",
    nombre: "",
    apellido: ""

=======
    token: "",
    nombre: "",
    apellido: "",
>>>>>>> e6498a9c97e20cfa4bba99200a4326d672a8de9f
}

const usuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            console.log(action.payload)
            return {
                ...state,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                token: action.payload.token,
            }
        case 'UPDATE_USER':
            return {
                ...state,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
            }

        case 'LOGOUT_USER':
            localStorage.clear()
            return {
                ...state,
                ...initialState
            }
        default:
            return state;
    }
}


export default usuariosReducer