import usuariosReducer from '../reducers/usuariosReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usuarioReducer: usuariosReducer,
})

export default rootReducer