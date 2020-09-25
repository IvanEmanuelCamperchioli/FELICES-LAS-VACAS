import usersReducer from '../reducers/usersReducer'
import adminReducer from '../reducers/adminReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usersRed: usersReducer,
    adminRed: adminReducer,
})

export default rootReducer