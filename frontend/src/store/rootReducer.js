import homeReducer from './reducers/homeReducer.js'
import authReducer from './reducers/authReducer.js'
import cardReducer from './reducers/cardReducer.js'

const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer
}
export default rootReducers