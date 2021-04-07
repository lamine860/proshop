import axios from "axios";
import { CLEAR_CART } from "../constants/cartConstant";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
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
    dispatch({type: CLEAR_CART})
    localStorage.removeItem('cartItems')
  } catch (e) {
    dispatch({ ORDER_CREATE_FAIL, payload: e.response.data });
  }
};
