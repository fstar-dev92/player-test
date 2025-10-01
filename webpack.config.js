const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Showfer Player Tester",
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_PLAYER_LICENSE_KEY': JSON.stringify(
        process.env.REACT_APP_PLAYER_LICENSE_KEY
      ),
    }),
  ],
  devServer: {
    static: [
      { directory: path.join(__dirname, "dist") },
      { directory: path.join(__dirname, "public"), publicPath: "/" },
    ],
    port: 3000,
    hot: true,
    open: false,
    host: "localhost",
    server: { type: "https" },
    allowedHosts: "all",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react$: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
      "react-dom/client": require.resolve("react-dom/client"),
      "react/jsx-runtime": require.resolve("react/jsx-runtime"),
      "react/jsx-dev-runtime": require.resolve("react/jsx-dev-runtime"),
    },
    modules: [path.resolve(__dirname, "node_modules"), "node_modules"],
  },
};
