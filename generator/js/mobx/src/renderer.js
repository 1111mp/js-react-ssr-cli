import React from "react";
import { renderToString as toString } from "react-dom/server";
import { matchRoutes } from "react-router-config";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { Helmet } from "react-helmet";
import StyleContext from "isomorphic-style-loader/StyleContext";

class ServerRenderer {
  constructor(bundle, template, stats) {
    this.template = template;
    this.stats = stats;
    this.serverEntry = this._createEntry(bundle);
  }

  renderToString(request, staticContext) {
    return new Promise((resolve, reject) => {
      const serverEntry = this.serverEntry;

      const createApp = serverEntry.createApp;
      const store = serverEntry.stores;
      const router = serverEntry.router;

      const render = () => {
        // 存放组件内部路由相关属性，包括状态码，地址信息，重定向的url
        let context = {};
        const css = new Set();
        const insertCss = (...styles) =>
          styles.forEach((style) => css.add(style._getCss()));

        if (staticContext && staticContext.constructor === Object) {
          Object.assign(context, staticContext);
        }

        let component = createApp(context, request.url, store);
        let extractor = new ChunkExtractor({
          stats: this.stats,
          entrypoints: ["app"], // 入口entry
        });

        let root = toString(
          <StyleContext.Provider value={{ insertCss }}>
            {React.createElement(
              ChunkExtractorManager,
              { extractor },
              component
            )}
          </StyleContext.Provider>
        );

        if (context.url) {
          // 当发生重定向时，静态路由会设置url
          resolve({
            error: { url: context.url },
          });
          return;
        }

        if (context.statusCode) {
          // 有statusCode字段表示路由匹配失败
          resolve({
            error: { code: context.statusCode },
          });
        } else {
          // store.getState() 获取预加载的state，供客户端初始化
          resolve({
            error: undefined,
            html: this._generateHTML(root, extractor, store, css),
          });
        }
      };

      let promises;
      // 匹配路由
      let matchs = matchRoutes(router, request.path);
      promises = matchs.map(({ route, match }) => {
        const asyncData = route.asyncData;
        // match.params获取匹配的路由参数
        return asyncData
          ? asyncData(store, Object.assign(match.params, request.query))
          : Promise.resolve(null);
      });

      // resolve所有asyncData
      Promise.all(promises)
        .then(() => {
          // 异步数据请求完成后进行render
          render();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  _createEntry(bundle) {
    const file = bundle.files[bundle.entry];

    // 读取内容并编译模块
    const vm = require("vm");
    const sandbox = {
      console,
      module,
      require,
    };
    vm.runInNewContext(file, sandbox);

    return sandbox.module.exports.default;
  }

  _generateHTML(root, extractor, initalState, css) {
    // 必须在组件renderToString后获取
    let head = Helmet.renderStatic();

    // 替换注释节点为渲染后的html字符串
    return (
      this.template
        // .replace(/<title>.*<\/title>/, `${head.title.toString()}`)
        .replace(
          "<!--react-ssr-head-->",
          `${head.meta.toString()}\n${head.link.toString()}${extractor.getLinkTags()}\n${extractor.getStyleTags()}
          <script type="text/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initalState)}
          </script>
          `
        )
        .replace(
          "<!--react-ssr-css-->",
          `<style id="css">${[...css].join("")}</style>`
        )
        .replace(
          "<!--react-ssr-outlet-->",
          `<div id="root">${root}</div>\n${extractor.getScriptTags()}`
        )
    );
  }
}

export default ServerRenderer;
