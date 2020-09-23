import usersReducer from '../reducers/usersReducer'
const { combineReducers } = require('redux')

const rootReducer = combineReducers({
    usersRed: usersReducer,
})

export default rootReducer