import usuariosReducer from '../reducers/usuariosReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usuariosReducer: usuariosReducer,
})

export default rootReducer