import homeReducer from './reducers/homeReducer.js'
import authReducer from './reducers/authReducer.js'
const rootReducers = {
    home: homeReducer,
    auth: authReducer,
}
export default rootReducers