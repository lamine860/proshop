import axios from "axios";
import { CLEAR_CART } from "../constants/cartConstant";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_REQUEST,
} from "./../constants/orderConstants";

const API_ENDPOINT = "/api/orders";

export const orderCreateAction = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  const { userInfo } = getState().userLogin;
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.post(API_ENDPOINT, order, config);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CLEAR_CART });
    localStorage.removeItem("cartItems");
  } catch (e) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: e.response.data });
  }
};

export const orderDetailsAction = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const { userInfo } = getState().userLogin;
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/${orderId}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: JSON.parse(e.response.data.message),
    });
  }
};

export const orderPayAction = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  const { userInfo } = getState().userLogin;
  const config = {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `${API_ENDPOINT}/${orderId}/pay`,
      paymentResult,
      config
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    dispatch({ type: ORDER_DETAILS_RESET });
  } catch (e) {
    console.log(e.response);
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: JSON.parse(e.response.data.message),
    });
  }
};

export const orderListMyAction = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_MY_REQUEST });
  const { userInfo } = getState().userLogin;
  const brearer = userInfo ?  `Bearer ${userInfo.token}` : 'Bearer'
  const config = {
    headers: {
      Authorization: brearer
    },
  };
  try {
    const { data } = await axios.get(`${API_ENDPOINT}/orders/myorders`, config);
    dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (e) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: JSON.parse(e.response.data.message),
    });
  }
};
