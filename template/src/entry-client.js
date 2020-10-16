import React from "react";
import ReactDOM from "react-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { loadableReady } from "@loadable/component";
import App from "./App";

let initialRendering = true;

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

loadableReady().then(() => {
  ReactDOM.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <App />
    </StyleContext.Provider>,
    document.getElementById("root"),
    () => {
      if (initialRendering) {
        const node = document.getElementById("css");
        node.parentNode.removeChild(node);
        initialRendering = false;
      }
    }
  );
});

// 热更新
if (module.hot) {
  module.hot.accept("./App.jsx", () => {
    const NewApp = require("./App").default;
    ReactDOM.hydrate(
      <StyleContext.Provider value={{ insertCss }}>
        <NewApp />
      </StyleContext.Provider>,
      document.getElementById("root"),
      () => {
        if (initialRendering) {
          const node = document.getElementById("css");
          node.parentNode.removeChild(node);
          initialRendering = false;
        }
      }
    );
  });
}
