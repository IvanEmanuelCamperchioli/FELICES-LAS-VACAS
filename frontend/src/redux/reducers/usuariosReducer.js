const initialState = {
    name: '',
    urlpic: '',
    token: '',
    username: '',
    lastname: '',
}

const usuariosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                name: action.payload.name,
                urlpic: action.payload.urlpic,
                token: action.payload.token,
                username: action.payload.username,
                lastname: action.payload.lastname,
            }
        case 'UPDATE_USER':
            return {

                ...state,
                name: action.payload.name,
                urlpic: action.payload.urlpic,
                lastname: action.payload.lastname,
            }

        // case 'LOGOUT_USER':
        //     localStorage.clear()
        //     return {
        //         ...state,
        //         ...initialState
        //     }
        default:
            return state;
    }
}


export default usuariosReducer