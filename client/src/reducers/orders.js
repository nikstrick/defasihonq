import {  ALL_ORDERS,COMPLETED_ORDERS,NOT_COMPLETED_ORDERS, USER_LOADED } from '../actions/types';
const initialState = [];

export const orders = (state = initialState, action)=> {
  const { type, payload } = action;
  console.log(payload);
  console.log(type);
  switch (type) {
    case ALL_ORDERS:
      return payload;
    default:
      return state;
  }
}