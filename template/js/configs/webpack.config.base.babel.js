import path from "path";
import webpack from "webpack";

const isProd = process.env.NODE_ENV === "production";

export default {
  mode: isProd ? "production" : "development",

  devtool: isProd ? "none" : "source-map",

  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/dist/",
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "react-router-dom": path.resolve(
        __dirname,
        "../node_modules/react-router-dom/"
      ),
      src: path.resolve(__dirname, "../src"),
      pages: path.resolve(__dirname, "../src/pages"),
      components: path.resolve(__dirname, "../src/components"),
      router: path.resolve(__dirname, "../src/router"),
      store: path.resolve(__dirname, "../src/store"),
    },
  },

  module: {
    rules: [
      {
        test: /.css?$/,
        use: [
          "isomorphic-style-loader",
          // https://github.com/kriasoft/isomorphic-style-loader/issues/181
          // "style-loader",
          { loader: "css-loader", options: { esModule: false } },
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: [
          "isomorphic-style-loader",
          { loader: "css-loader", options: { esModule: false } },
          {
            loader: "stylus-loader",
            options: {
              // import: [path.join(__dirname, '../app/styles/mixin.styl')], //你公共样式存放的位置
            },
          },
        ],
      },
      // WOFF Font
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
          },
        },
      },
      // WOFF2 Font
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
          },
        },
      },
      // TTF Font
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/octet-stream",
          },
        },
      },
      // EOT Font
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: "file-loader",
      },
      // SVG Font
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "image/svg+xml",
          },
        },
      },
      // Common Image Formats
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/,
        use: "url-loader",
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      _$process: {
        env: {
          NODE_ENV: `'${process.env.NODE_ENV}'`,
        },
      },
    }),
  ],
};
