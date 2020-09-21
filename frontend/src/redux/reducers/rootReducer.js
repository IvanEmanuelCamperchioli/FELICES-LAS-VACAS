import userReducer  from './userReducer'

const {combineReducers} = require('redux')

const rootReducer = combineReducers({
    userRed: userReducer,
    /* productRed: productRed */
})


export default rootReducer