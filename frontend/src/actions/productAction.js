import axios from 'axios'
import * as actionTypes from '../constants/productConstant'

const endPoint = '/api/products'
export const productListAction = () => async (dispatch) => {
    dispatch({type: actionTypes.PRODUCT_LIST_REQUEST})
    try {
        const  {data} =  await axios.get(endPoint)
        dispatch({type: actionTypes.PRODUCT_LIST_SUCCESS, payload: data})
    }catch(error) {
        dispatch({type: actionTypes.PRODUCT_LIST_FAIL, payload: error.response.data ? error.response.data.message : error.message})
    }
    
}

export const productDetailAction = (productId) => async (dispatch) => {
    dispatch({type: actionTypes.PRODUCT_DETAIL_REQUEST})
    try {
        const  response =  await axios.get(`${endPoint}/${productId}`)
        dispatch({type: actionTypes.PRODUCT_DETAIL_SUCCESS, payload: response.data})
    }catch(error) {
        dispatch({type: actionTypes.PRODUCT_DETAIL_FAIL, payload: error.response && 
            error.response.data.message ? 
            error.response.data.message : 
            error.message})
    }
    
}