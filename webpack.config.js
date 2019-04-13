
const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

const rootResolve = (file) => path.resolve(__dirname, file)

const devServer = {
  contentBase: rootResolve("dist"),
  port: 9000  // 請選擇一個你電腦沒用到的 port
}

const rules = [
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/
  }
]

const resolve = {
  extensions: [".tsx", ".ts", ".js"]
}

const plugins = [
  new CopyPlugin([
    {
      from: rootResolve("public/index.html"),
      to: rootResolve("dist/index.html")
    }
  ])
]

module.exports = {
  devServer,
  entry: "./src/main.ts",
  output: {
    filename: "bundle.js",
    path: rootResolve("dist")
  },
  resolve,
  module: { rules },
  plugins
}