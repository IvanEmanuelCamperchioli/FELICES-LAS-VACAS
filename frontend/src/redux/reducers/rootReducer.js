import usuariosReducer from '../reducers/usuariosReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usuariosRed: usuariosReducer,
})

export default rootReducer