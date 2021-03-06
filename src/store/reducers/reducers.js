import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  ERROR_MESSAGE,
  SET_INVENTORIES,
  SET_LOADING,
  SET_PRODUCTS,
  SET_CATEGORIES
} from "../actions/actionType";

export default (
  state = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    errorMsg: '',
    user: {},
    inventory: {},
    products: [],
    categories: [],
    loading: false
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {}
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false
      };
    case ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: action.msg
      };
    case SET_INVENTORIES:
      return {
        ...state,
        inventory: action.inventories
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.products
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    default:
      return state;
  }
};