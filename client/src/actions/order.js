import { ALL_ORDERS,COMPLETED_ORDERS,NOT_COMPLETED_ORDERS,AUTH_ERROR } from './types';
import axios from 'axios';


export const allOrders = (user) => async dispatch =>{
    try {
       if(!user.admin){
        const res = await axios.get('/api/order/');
        //console.log(user);
        //console.log(res);
        //console.log("all orders");
        dispatch({
          type: ALL_ORDERS,
          payload: res.data
        });
      }
      else
      {
        const res = await axios.get('/api/order/admin');
        //console.log(res);
        //console.log("all orders");
        dispatch({
          type: ALL_ORDERS,
          payload: res.data
        });
      }
      } catch (err) {
          console.log(err);
        dispatch({
          type: AUTH_ERROR
        });
      }
}

export const completedOrders = () => async dispatch =>{
    try {
        const res = await axios.get('/api/order/admin/completed');
        dispatch({
          type: COMPLETED_ORDERS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        });
      }
}

export const notcompletedOrders = () => async dispatch =>{
    try {
        const res = await axios.get('/api/order/admin/notcompleted');
        dispatch({
          type: NOT_COMPLETED_ORDERS,
          payload: res.data
        });
      } catch (err) {
        dispatch({
          type: AUTH_ERROR
        });
      }
}
