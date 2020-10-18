import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import homeReducer from "./homeStore";

/** https://ts.xcatliu.com/basics/declaration-files.html declare var 声明全局变量 */
declare var _$process: any;

//合并项目组件中store的reducer
const reducer = combineReducers({
  home: homeReducer,
});

export default (defaultState: any = {}) => {
  return createStore(
    reducer,
    defaultState,
    _$process.env.NODE_ENV === "development"
      ? applyMiddleware(thunkMiddleware, createLogger())
      : applyMiddleware(thunkMiddleware)
  );
};
