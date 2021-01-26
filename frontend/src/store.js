import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk  from 'redux-thunk'

import {productListReducer, productDetailReducer} from './reducers/productReducer'
import {cartReducer} from './reducers/cartReducer'

const initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    }
}
const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))

export default store 