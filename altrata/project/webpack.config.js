const webpack = require("webpack");
const path = require("path");

const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function (_env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;

  const devServer = {
    static: {
      directory: path.join(__dirname, "/public"),
    },
    compress: true,
    port: 4000,
    hot: true,
    open: true,
    liveReload: true,
    watchFiles: ["src/**/*.{js,jsx,ts,tsx}", "public/**/*"],
  };

  const config = {
    entry: "./src/index.tsx",
    devtool: isDevelopment && "cheap-module-source-map",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
      clean: true,
    },
    target: "web",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              babelrc: true,
            },
          },
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, "src"),
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
      },
    },

    devServer,
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public/"),
            to: path.resolve(__dirname, "build/"),
          },
        ],
      }),
    ],
  };
  return config;
};
