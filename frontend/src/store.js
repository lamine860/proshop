import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk  from 'redux-thunk'

import {productListReducer, productDetailReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'
import { userRegisterReducer, userLoginReducer, userUpdateProfileReducer } from './reducers/userReducer';

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    },
    userLogin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}
const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    userUpdate: userUpdateProfileReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store 