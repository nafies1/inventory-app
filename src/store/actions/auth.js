import { myFirebase, inventoryDb } from "../../config/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const ERROR_MESSAGE = "ERROR_MESSAGE";
export const SET_INVENTORIES = "SET_INVENTORIES";
export const SET_LOADING = "SET_LOADING";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_CATEGORIES = "SET_CATEGORIES";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS,
  };
};

const setErrorMsg = (msg) => {
  return {
    type: ERROR_MESSAGE,
    msg,
  };
};

const setInventories = (inventories) => {
  return {
    type: SET_INVENTORIES,
    inventories,
  };
};

const setLoading = loading => {
  return {
    type: SET_LOADING,
    loading
  };
};

const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  };
}

const setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories
  };
}

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      localStorage.uid = user.uid;
      dispatch(receiveLogin(user));
    })
    .catch((error) => {
      //Do something with the error if you want!
      console.log("Error while login:");
      console.log(error);
      let msg = "";
      if (error.code === "auth/wrong-password")
        msg = "Your password is wrong. Please try again.";
      else if (error.code === "auth/user-not-found")
        msg = "Email has not been registered.";
      else msg = "There is something wrong. Please contact administrator.";
      dispatch(setErrorMsg(msg));
      setTimeout(() => {
        dispatch(setErrorMsg(""));
      }, 8000);
      dispatch(loginError());
    });
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
      localStorage.clear();
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  myFirebase
    .auth()
    .onAuthStateChanged((user) => {
      console.log("verifyAuth:", user);
      if (user !== null) {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};

export const fetchInventories = () => (dispatch) => {
  dispatch(setLoading(true))
  inventoryDb
    .get()
    .then((doc) => {
      const inventory = doc.data();
      dispatch(setInventories(doc.data()));
      const items = [];
      const categors = [];
      for (const key in inventory) {
        items.push(...inventory[key])
        categors.push(key)
      }
      dispatch(setProducts(items));
      dispatch(setCategories(categors));

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
};
