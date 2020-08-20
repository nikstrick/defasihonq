import {
  ADD_TO_CART,
  CART_LOADING,
  DELETE_CART_ITEM,
  DELETE_CART,
} from './types';
import axios from 'axios';

export const addToCart = (_id, user_id, quantity) => (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ _id, quantity });
  // console.log(body);
  dispatch(setCartLoading());
  axios.put('/api/users/cart', body, config).then((res) => {
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  });
  alert('Added to Cart!!');
};
export const deleteCartItem = (_id) => (dispatch) => {
  const body = _id;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      body,
    },
  };
  // console.log(body);
  dispatch(setCartLoading());
  // console.log(_id);
  axios.delete('/api/users/cart', config).then((res) =>
    dispatch({
      type: DELETE_CART_ITEM,
      payload: res.data,
    })
  );
};
// export const getCartItems = (user_id) => (dispatch) => {
//   dispatch(setCartLoading());
//   axios.get('/api/users/cart').then((res) => {
//     dispatch({
//       type: GET_CART_ITEMS,
//       payload: res.data,
//     });
//   });
// };
export const setCartLoading = () => {
  return {
    type: CART_LOADING,
  };
};

export const deleteCart = () => async (dispatch) => {
  //console.log('/api/users/deletecart');
  const res = await axios.put('/api/users/deletecart');

  dispatch({
    type: DELETE_CART,
  });
};
