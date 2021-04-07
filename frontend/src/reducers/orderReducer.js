import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET } from './../constants/orderConstants';

export const orderCreateReducer = (state = { order: {} }, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {...state, loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, order: action.payload, success: true}
        case ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        case ORDER_CREATE_RESET:
            return {loading: false, error: action.payload}
        default:
            return state
    }
};
