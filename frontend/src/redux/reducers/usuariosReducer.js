const initialState = {
    usuario: "",
    password: "",
    email: "",
    nombre: "",
    apellido: "",
    urlFoto: "",
    idComentario: "", 
    logInGoogle: false,
    primeraVez: false,
}

const usuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                usuario: action.payload.usuario,
                urlFoto: action.payload.urlFoto,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                token: action.payload.token,
            }
        case 'UPDATE_USER':
            return {
                ...state,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                urlFoto: action.payload.urlFoto,
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