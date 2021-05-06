import axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL
} from "./../constants/userConstant";
const apiEndPoint = "/api/users";

export const userRegisterAction = user => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${apiEndPoint}/register`, user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    const errorMsg = JSON.parse(e.response.data.message);
    const error = Array.isArray(errorMsg.message)
      ? errorMsg.message[0]
      : errorMsg;
    dispatch({ type: USER_REGISTER_FAIL, payload: error });
  }
};

export const userLoginAction = user => async dispatch => {
  dispatch({ type: USER_LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${apiEndPoint}/login`, user);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({ type: USER_LOGIN_FAIL, payload: e.response.data });
  }
};

export const userUpdateProfileAction = user => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
  const {userLogin: {userInfo}} = getState()
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`
      }
    };
    const { data } = await axios.put(`${apiEndPoint}/profile`, user, config);
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (e) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: JSON.parse(e.response.data.message).message[0] });
  }
};

export const userLogoutAction = user => async dispatch => {
  dispatch({ type: USER_LOGOUT });
  localStorage.removeItem("userInfo");
};


export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutAction())
    }
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: message,
    })
  }
}