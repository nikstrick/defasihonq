import { ADD_TO_CART, CART_LOADING, DELETE_CART_ITEM,DELETE_CART } from '../actions/types';

const initialState = {
  cart: [],
  loading: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        cart: [action.payload],
        loading: false,
      };
    case DELETE_CART_ITEM:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };
    case CART_LOADING:
      return {
        ...state,
        loading: true,
      };
      case DELETE_CART:
      return {
        cart:[],
        loading: false,
      };
    default:
      return state;
  }
}
