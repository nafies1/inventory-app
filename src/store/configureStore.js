import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(persistedState) {
  const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  store.dispatch(verifyAuth());
  return store;
}