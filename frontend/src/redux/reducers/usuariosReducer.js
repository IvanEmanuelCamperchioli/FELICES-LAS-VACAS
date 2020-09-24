const initialState = {
    token: "",
    nombre: "",
    apellido: "",
    rol:""
}

const usuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                nombre: action.payload.nombre,
                apellido: action.payload.apellido,
                token: action.payload.token,
                rol: action.payload.rol
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
            return state
    }
}


export default usuariosReducer