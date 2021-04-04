import axios from 'axios'
import * as actionTypes from '../constants/cartConstant'

const endPoint = '/api/products'

export const addToCartAction = (id, qty) => async (dispatch, getState) => {
    try {
        const  {data} =  await axios.get(`${endPoint}/${id}`)
        dispatch({type: actionTypes.ADD_TO_CART, payload: {
            product: id,
            price: data.price,
            name: data.name,
            countInStock: data.countInStock,
            image: data.image,
            qty
        }})
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }catch(error) {
        console.log(error)
    }
    
}
export const removeFromCartAction = (id) => async (dispatch, getState) => {
    dispatch({type: actionTypes.REMOVE_FROM_CART, payload: {product: id}})
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const cartSaveShippingAddress = (data) => async (dispatch, getState) => {
    dispatch({type: actionTypes.CART_SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem('shippingAddress', JSON.stringify(data))
    
}
export const cartSavePaymentMethod = (paymentMethodd) => async (dispatch, getState) => {

    dispatch({type: actionTypes.CART_SAVE_PAYMENT_METHOD, payload: paymentMethodd})
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethodd))
    
}
