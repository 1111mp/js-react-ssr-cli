import express from "express";
import webpack from "webpack";
import path from "path";
import MFS from "memory-fs";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import clientConfig from "../configs/webpack.config.client.babel";
import serverConfig from "../configs/webpack.config.server.babel";

export default function setupDevServer(app: express.Application, callback: Function) {
  let bundle: any;
  let loadableStats: any;
  let resolve: VoidFunction;
  const readyPromise = new Promise((r) => {
    resolve = r;
  });
  const update = () => {
    if (bundle && loadableStats) {
      callback(bundle, loadableStats);
      resolve(); // resolve Promise让服务端进行render
    }
  };

  const readFile = (fs: any, fileName: string) => {
    return fs.readFileSync(
      path.join((clientConfig as any).output.path, fileName),
      "utf-8"
    );
  };

  const clientCompiler = webpack(clientConfig);

  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: (clientConfig as any).output.publicPath,
    logLevel: "warn",
  });

  app.use(devMiddleware);

  clientCompiler.hooks.done.tap("done", (stats) => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }
    // 从webpack-dev-middleware中间件存储的内存中读取打包后的inddex.html文件模板
    loadableStats = JSON.parse(
      readFile(devMiddleware.fileSystem, "loadable-stats.json")
    );
    update();
  });

  app.use(
    webpackHotMiddleware(clientCompiler, { log: false, heartbeat: 10000 })
  );

  // 监视服务端打包入口文件，有更改就更新
  const serverCompiler = webpack(serverConfig);
  // 使用内存文件系统
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    if (stats.hasErrors()) {
      console.error(info.errors);
      return;
    }

    bundle = JSON.parse(readFile(mfs, "server-bundle.json"));
    update();
  });

  return readyPromise;
}
