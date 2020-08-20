import {DELETE_ADDRESS,UPDATE_ADDRESS } from '../actions/types';
const initialState = {};

export const address = (state = initialState, action)=> {
  const { type } = action;
  //console.log(payload);
  //console.log(type);
  switch (type) {
    case UPDATE_ADDRESS:
      return state=action.payload;
    case DELETE_ADDRESS:
      return state={};
    default:
      return state;
  }
}