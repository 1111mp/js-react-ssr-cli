import React from "react";
import { StaticRouter } from "react-router-dom";
import { Provider } from "mobx-react";
import { renderRoutes } from "react-router-config";
import router from "./router";
import createStore from "./store";
import useStyles from "isomorphic-style-loader/useStyles";
import styles from "./app.css";

const createApp = (context: any, url: string, store: any) => {
  const App = () => {
    useStyles(styles);
    return (
      <Provider store={store}>
        <StaticRouter context={context} location={url}>
          <div className="button">{renderRoutes(router)}</div>
        </StaticRouter>
      </Provider>
    );
  };

  return <App />;
};

export default {
  createApp,
  createStore,
  router,
};
