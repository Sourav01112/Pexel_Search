import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as imageReducer } from "./imageReducer/reducer";
import thunk from "redux-thunk";
import loaderReducer from "./loaderSlice";

const middleWare = [thunk];

const rootReducer = combineReducers({
  imageReducer,
  loaderReducer,
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(...middleWare)
);
