import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import {orders} from './orders';
import {address} from './address';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

export default combineReducers({
  alert,
  auth,
  orders,
  address,
  product: productReducer,
  cart: cartReducer,
});
