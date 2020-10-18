import path from "path";
import webpack from "webpack";
import { merge } from "webpack-merge";
import nodeExternals from "webpack-node-externals";
import baseConfig from "./webpack.config.base.babel";

const babelConfig = require("../.babelrc");
const SSRServerPlugin = require("./plugin/webpack/server-plugin");

// const isProd = process.env.NODE_ENV === "production";

export default merge(baseConfig, {
  target: "node",

  entry: {
    app: path.resolve(__dirname, "../src/entry-server.tsx"),
  },

  output: {
    filename: "entry-server.js",
    path: path.resolve(__dirname, "../dist"),
    libraryTarget: "commonjs2",
  },

  externals: [
    nodeExternals({
      allowlist: [/\.css$/], // 忽略css，让webpack处理
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "../src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: babelConfig.presets,
            plugins: ["dynamic-import-node", ...babelConfig.plugins],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: babelConfig.presets,
            plugins: ["dynamic-import-node", ...babelConfig.plugins],
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.REACT_ENV": JSON.stringify("server"), // 指定React环境为服务端
    }),

    new SSRServerPlugin({
      filename: "server-bundle.json",
    }),
  ],
});
