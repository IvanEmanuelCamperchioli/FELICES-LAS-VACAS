const initialState = {
    token: "",
    nombre: "",
    apellido: "",
    rol:""
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            console.log(action.payload)
            return {
                ...state,
                name: action.payload.name,
                lastname: action.payload.lastname,
                token: action.payload.token,
                rol: action.payload.rol
            }
        case 'UPDATE_USER':
            return {
                ...state,
                name: action.payload.name,
                lastname: action.payload.lastname,
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


export default usersReducer