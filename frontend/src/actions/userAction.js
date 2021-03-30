import axios from 'axios'
import { USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT } from './../constants/userConstant';

export const userRegisterAction = (user) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST})
    try{
        const {data} = await axios.post('/api/user/register', user)
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(e) {
        const errorMsg = JSON.parse(e.response.data.message)
        const error = Array.isArray(errorMsg.message) ? errorMsg.message[0] : errorMsg
        dispatch({type: USER_REGISTER_FAIL, payload: error})

    }
}


export const userLoginAction = (user) => async (dispatch) => {
    dispatch({type: USER_LOGIN_REQUEST})
    try{
        const {data} = await axios.post('/api/user/login', user)
        dispatch({type: USER_LOGIN_SUCCESS, payload: data})
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(e) {
        dispatch({type: USER_LOGIN_FAIL, payload: e.response.data})

    }
}

export const userLogoutAction = (user) => async (dispatch) => {
    dispatch({type: USER_LOGOUT})
    localStorage.removeItem('userInfo')
    
}