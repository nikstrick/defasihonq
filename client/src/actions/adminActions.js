import {
  ADD_PRODUCT,
  PRODUCT_LOADING,
  DELETE_PRODUCT,
  PRODUCT_DELETING,
} from './types';
import axios from 'axios';

export const addProduct = (formData) => (dispatch) => {
  // const {
  //   category,
  //   image,
  //   productName,
  //   productBrand,
  //   productType,
  //   productId,
  //   quantity,
  //   description,
  //   mrp,
  //   price,
  // } = formData;
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  // const body = JSON.stringify({
  //   category,
  //   image,
  //   productName,
  //   productBrand,
  //   productType,
  //   productId,
  //   quantity,
  //   description,
  //   mrp,
  //   price,
  // });
  console.log(formData);
  dispatch(productLoading());
  axios.post('/api/product', formData, config).then((res) => {
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data,
    });
    alert('Items added succesfully!!');
  });
};
export const deleteProduct = (_id) => (dispatch) => {
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
  dispatch(deletingProduct());
  // console.log(_id);
  axios.delete('/api/product', config).then((res) =>
    dispatch({
      type: DELETE_PRODUCT,
      payload: res.data,
    })
  );
};
export const deletingProduct = () => {
  return {
    type: PRODUCT_DELETING,
  };
};
export const productLoading = () => {
  return {
    type: PRODUCT_LOADING,
  };
};
