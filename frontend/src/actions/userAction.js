import axios from 'axios'
import { USER_REGISTER_REQUEST, USER_REGISTER_FAIL, USER_REGISTER_SUCCESS } from './../constants/userConstant';

export const userRegisterAction = (user) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST})
    try{
        const {data} = await axios.post('/api/user/register', user)
        console.log(data)
        dispatch({type: USER_REGISTER_SUCCESS, payload: data})
    }catch(e) {

        const errorMsg = JSON.parse(e.response.data.message)
        const error = Array.isArray(errorMsg.message) ? errorMsg.message[0] : errorMsg
        dispatch({type: USER_REGISTER_FAIL, payload: error})

    }
}