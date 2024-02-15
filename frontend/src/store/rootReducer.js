import homeReducer from './reducers/homeReducer.js'
import authReducer from './reducers/authReducer.js'
import cardReducer from './reducers/cardReducer.js'
import orderReducer from './reducers/orderReducer.js'

const rootReducers = {
    home: homeReducer,
    auth: authReducer,
    card: cardReducer,
    order: orderReducer
}
export default rootReducers