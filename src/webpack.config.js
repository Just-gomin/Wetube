const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");

const MODE = process.env.PRODUCTION === "true" ? "production" : "development";
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static");

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: [
          {
            // js 파일을 가져와 구식의 문법으로 변환
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        // ExtractCSS는 CSS에서 텍스트만을 추출한다.
        use: ExtractCSS.extract([
          {
            // CSS를 가져온다.
            loader: "css-loader",
          },
          {
            // postcss-loader는 특정 플러그인들을 css에 대해 실행시켜준다.
            loader: "postcss-loader",
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
              },
            },
          },
          {
            // sass-loader : Sass를 CSS로 바꿔준다.
            loader: "sass-loader",
          },
        ]),
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new ExtractCSS("styles.css")],
};

module.exports = config;
