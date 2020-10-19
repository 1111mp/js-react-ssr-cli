import path from "path";
import webpack from "webpack";
import { merge } from "webpack-merge";
import LoadablePlugin from "@loadable/webpack-plugin";
import baseConfig from "./webpack.config.base.babel";

const isProd = process.env.NODE_ENV === "production";

/**
 * webpack 详解
 * https://github.com/sisterAn/blog/issues/68
 */

export default merge(baseConfig, {
  // target: "web",

  entry: {
    app: isProd
      ? path.resolve(__dirname, "../src/entry-client.js")
      : [
          "webpack-hot-middleware/client?reload=true",
          path.resolve(__dirname, "../src/entry-client.js"),
        ],
  },

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: `static/js/[name].[${isProd ? "chunkhash" : "hash"}].js`,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "../src")],
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: "all", // 默认就是all
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },

  plugins: isProd
    ? [new LoadablePlugin()]
    : [
        new LoadablePlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ],
});
