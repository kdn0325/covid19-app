const path = require("path");

const config = {
  name: "React18-webpack-babel-setting", // 설정 이름
  mode: "development", // production, development // 설정 모드

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/",
  },
};

module.exports = config;
