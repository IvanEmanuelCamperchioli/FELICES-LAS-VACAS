import usuariosReducer from '../reducers/usuariosReducer'
import adminReducer from '../reducers/adminReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usuariosRed: usuariosReducer,
    adminRed: adminReducer,
})

export default rootReducer