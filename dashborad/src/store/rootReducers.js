import authReducer from './Reducers/authReducer'
import categoryReducer from './Reducers/categoryReducer'
import OrderReducer from './Reducers/orderReducer'
import productReducer from './Reducers/productReducer'
import sellerReducer from './Reducers/sellerReducer'
import dashboardIndexReducer from './Reducers/dashboardIndexReducer';
import paymentReducer from './Reducers/paymentReducer'

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    seller: sellerReducer,
    order: OrderReducer,
    dashboardIndex: dashboardIndexReducer,
    payment: paymentReducer
}
export default rootReducer