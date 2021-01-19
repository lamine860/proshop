import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk  from 'redux-thunk'

import {productListReducer, productDetailReducer} from './reducers/productReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer
})

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)))

export default store 