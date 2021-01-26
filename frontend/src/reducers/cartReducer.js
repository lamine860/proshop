import * as actionTypes from '../constants/cartConstant'

export const cartReducer = (state = {cartItems: []}, action) => {
    switch(action.type){
        case actionTypes.ADD_TO_CART:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                return {
                    ...state, cartItems: state.cartItems.map(x => x.product === item.product ? item : x)
                }
            }
            return {...state, cartItems: [...state.cartItems, item]}
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(x => x.product !== action.payload.product)
            }
        case actionTypes.CLEAR_CART:
            return {
                ...state, cartItems: []
            }
        default:
            return state
    }
}
