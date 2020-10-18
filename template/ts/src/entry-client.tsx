import React from "react";
import ReactDOM from "react-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import { loadableReady } from "@loadable/component";
import App from "./App";

let initialRendering = true;

const insertCss = (...styles: any[]) => {
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
        const node: any = document.getElementById("css");
        node.parentNode.removeChild(node);
        initialRendering = false;
      }
    }
  );
});

// 热更新
if ((module as any).hot) {
  (module as any).hot.accept("./App.tsx", () => {
    const NewApp = require("./App").default;
    ReactDOM.hydrate(
      <StyleContext.Provider value={{ insertCss }}>
        <NewApp />
      </StyleContext.Provider>,
      document.getElementById("root"),
      () => {
        if (initialRendering) {
          const node: any = document.getElementById("css");
          node.parentNode.removeChild(node);
          initialRendering = false;
        }
      }
    );
  });
}
