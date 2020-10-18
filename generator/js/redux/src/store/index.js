import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import homeReducer from "./homeStore";

//合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer,
});

export default (defaultState = {}) => {
  return createStore(
    reducer,
    defaultState,
    _$process.env.NODE_ENV === "development"
      ? applyMiddleware(thunkMiddleware, createLogger())
      : applyMiddleware(thunkMiddleware)
  );
};
