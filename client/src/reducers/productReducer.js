import {
  GET_PRODUCTS,
  PRODUCTS_LOADING,
  GET_PRODUCT,
  ADD_PRODUCT,
  PRODUCT_LOADING,
  PRODUCT_DELETING,
  DELETE_PRODUCT,
} from '../actions/types';
// import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products: [],
  viewProduct: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        loading: false,
      };
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.payload),
        loading: false,
      };
    case GET_PRODUCT:
      return {
        ...state,
        viewProduct: action.payload,
        loading: false,
      };
    case PRODUCTS_LOADING:
    case PRODUCT_LOADING:
    case PRODUCT_DELETING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
