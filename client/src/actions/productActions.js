import { GET_PRODUCTS, PRODUCTS_LOADING, GET_PRODUCT } from './types';
import axios from 'axios';

export const getProducts = () => (dispatch) => {
  dispatch(setProductLoading());
  axios.get('/api/product').then((res) =>
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    })
  );
};
export const getProduct = (id) => (dispatch) => {
  dispatch(setProductLoading());
  axios.get(`/api/product/${id}`).then((res) =>
    dispatch({
      type: GET_PRODUCT,
      payload: res.data,
    })
  );
};

export const setProductLoading = () => {
  return {
    type: PRODUCTS_LOADING,
  };
};
