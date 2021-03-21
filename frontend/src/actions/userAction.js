import axios from 'axios'
import * as actionTypes  from './../constants/userConstant';

const apiUrl = '/api/user'
export const  userRegisterAction = (data) => async dispatch => {
    dispatch({type: actionTypes.USER_REGISTER_REQUEST})
    try{
        const response = await  axios.post(`${apiUrl}/register`, data)
        dispatch({type: actionTypes.USER_REGISTER_SUCCESS, payload: response})
    }catch(error) {
        dispatch({type: actionTypes.USER_REGISTER_FAIL,payload: true})

    }
}