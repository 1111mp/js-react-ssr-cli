import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./app.css";
import router from "./router";
import createStore from "./store";

const App = () => {
  // 获取服务端初始化的state，创建store
  const initialState = (window as any).__INITIAL_STATE__;
  const store = createStore(initialState);

  useStyles(styles);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="button">{renderRoutes(router)}</div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
