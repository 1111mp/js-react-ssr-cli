import React from "react";
import { Provider } from 'mobx-react';
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./app.css";
import router from "./router";
import createStore from "./store";

const App = () => {
  const store = createStore();

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
