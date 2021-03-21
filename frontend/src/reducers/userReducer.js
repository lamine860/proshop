import  * as actionTypes from '../constants/userConstant'

export const  userRegisterReducer = (state = {user: {}}, action) => {
    switch(action.type){
        case actionTypes.USER_REGISTER_REQUEST:
            return {...state, loading: true}
        case actionTypes.USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case actionTypes.USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
        default:
        return state
    }

}