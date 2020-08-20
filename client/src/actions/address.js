import { UPDATE_ADDRESS , DELETE_ADDRESS,AUTH_ERROR } from './types'

export const updateAddress = (address) => async dispatch =>{
    try {
        dispatch({
          type: UPDATE_ADDRESS,
          payload: address
        });
      } 
      catch (err) {
          console.log(err);
        dispatch({
          type: AUTH_ERROR
        });
      }
}

export const deleteAddress = () => async dispatch =>{
    try{
        dispatch({
            type: DELETE_ADDRESS
          });
    }
    catch (err) {
        console.log(err);
      dispatch({
        type: AUTH_ERROR
      });
    }
}